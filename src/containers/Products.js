import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Form, Row, Col } from "react-bootstrap";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Products.css";

export default function Products(props) {
  const file = useRef(null);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadProduct() {
      return API.get("products", `/products/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const product = await loadProduct();
        const { Category, Attachment } = product;

        if (Attachment) {
          product.attachmentURL = await Storage.vault.get(Attachment);
        }

        setCategory(Category);
        setProduct(product);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return category.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveProduct(product) {
    return API.put("products", `/products/${props.match.params.id}`, {
      body: product,
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveProduct({
        Category: category,
        Attachment: attachment || product.Attachment,
      });

      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deleteProduct() {
    return API.del("products", `/products/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteProduct();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Products">
      {product && (
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Product Category
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={category} />
            </Col>
          </Form.Group>

          <LoaderButton variant="primary" type="submit">
            Save
          </LoaderButton>
        </Form>

        /* {product && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Category">
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          {product.Attachment && (
            <Form.Group>
              <Form.Label>Attachment</Form.Label>
              <Form.Control.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={product.attachmentURL}
                >
                  {formatFilename(product.Attachment)}
                </a>
              </Form.Control.Static>
            </Form.Group>
          )}
          <Form.Group controlId="file">
            {!product.Attachment && <Form.Label>Attachment</Form.Label>}
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton block onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </LoaderButton>
        </Form>
      )} */
      )}
    </div>
  );
}
