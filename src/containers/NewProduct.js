import React, { useRef, useState } from "react";
import { Form, ProgressBar } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import NewProductCategories from "../components/NewProductCategories";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./NewProduct.css";

export default function NewProduct(props) {
  const file = useRef(null);
  const [Category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return Category.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
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
      const Attachment = file.current ? await s3Upload(file.current) : null;

      await createProduct({ Category, Attachment });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createProduct(product) {
    return API.post("products", "/products", {
      body: product,
    });
  }

  return (
    <div className="NewProduct">
      <ProgressBar className="ProgressBar" animated now={45} />

      <h2>Add a New Product</h2>

      <NewProductCategories />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Category">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Image</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Add
        </LoaderButton>
      </Form>
    </div>
  );
}
