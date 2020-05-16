import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Form,
  ProgressBar,
  Image,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { MdDescription } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import { IconContext } from "react-icons";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import NewProductCategories from "../components/NewProductCategories";
import NewProductCountries from "../components/NewProductCountries";
import ImageDropzone from "../components/ImageDropzone";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./NewProduct.css";

export default function NewProduct(props) {
  const file = useRef(null);
  const [Category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState("");

  let urlLocation = useLocation();
  useEffect(() => {
    setCurrentView(urlLocation.hash.substr(1));
  }, [urlLocation, currentView]);

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
      <h2>Add a New Product</h2>

      <div className="steps-bar">
        <ProgressBar className="ProgressBar" animated now={27} />
        <a href="#images">
          <div className="steps-bar-item">
            <IconContext.Provider value={{ color: "darkgray", size: "2em" }}>
              <BsImages />
            </IconContext.Provider>
            <p>Images</p>
          </div>
        </a>
        <a href="#inventory">
          <div className="steps-bar-item">
            <IconContext.Provider value={{ color: "darkgray", size: "2em" }}>
              <MdDescription />
            </IconContext.Provider>
            <p>Inventory</p>
          </div>
        </a>
        <a href="#shop">
          <div className="steps-bar-item">
            <Image
              style={{ width: "40px" }}
              src="/images/shoptrader-logo-small.png"
            ></Image>
            <p>Shop</p>
          </div>
        </a>
        <a href="#ma-shops">
          <div className="steps-bar-item">
            <Image
              style={{ width: "40px" }}
              src="/images/ma-shops-logo-small.png"
            ></Image>
            <p>MA</p>
          </div>
        </a>
        <a href="#ebay">
          <div className="steps-bar-item">
            <Image
              style={{ width: "40px" }}
              src="/images/ebay-logo-small.png"
            ></Image>
            <p>ebay</p>
          </div>
        </a>
      </div>

      <section
        id="images-tab"
        className={currentView === "images" ? "" : "hidden"}
      >
        <h3>Images</h3>
        <p>Please add at least one image (12 max.)</p>
        <ImageDropzone />
      </section>

      <section
        id="inventory-tab"
        className={currentView === "inventory" ? "" : "hidden"}
      >
        <h3>Product Details</h3>

        <Form onSubmit={handleSubmit}>
          <NewProductCategories />

          <NewProductCountries />

          <Row>
            <Col md={4}>
              <Form.Group controlId="ruler">
                <Form.Label>Ruler</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="theme">
                <Form.Label>Theme</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Denomination</Form.Label>
              <InputGroup className="mb-6">
                <Form.Control placeholder="Nominal" />
                <Form.Control placeholder="Currency" />
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mint">
                <Form.Label>Mint</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="quality">
                <Form.Label>Quality</Form.Label>
                <Form.Control as="select" multiple>
                  <option>F</option>
                  <option>VF</option>
                  <option>XF</option>
                  <option>AU</option>
                  <option>UNC</option>
                  <option>Proof</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="grade">
                <Form.Label>Grade</Form.Label>
                <Form.Control as="select">
                  <option>-</option>
                  <option>PCGS</option>
                  <option>NGC</option>
                  <option>ICG</option>
                  <option>ANACS</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="metal">
                <Form.Label>Metal</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="weight">
                <Form.Label>Net weight</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="customLabel">
                <Form.Label>Custom Label</Form.Label>
                <Form.Control placeholder="A label to find your product easier later" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Custom File</Form.Label>
              <Form.File
                id="custom-file"
                label="E.g. invoice, picture..."
                custom
              />
            </Col>
          </Row>

          <LoaderButton
            className="LoaderButton"
            block
            onClick={saveAndNext}
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save & Next
          </LoaderButton>
        </Form>
      </section>

      <section
        id="shoptrader-conf-tab"
        className={currentView === "shop" ? "" : "hidden"}
      >
        <Form>
          <Form.Check
            type="switch"
            id="shoptrader-switch"
            label="Active on Shoptrader"
            active
          />
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Quality
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Country
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Details
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Images
            </Form.Label>
            <Col sm={6}>
              <ImageDropzone></ImageDropzone>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoaderButton type="submit">Save & Next</LoaderButton>
            </Col>
          </Form.Group>
        </Form>
      </section>

      <section
        id="ma-shops-conf-tab"
        className={currentView === "ma-shops" ? "" : "hidden"}
      >
        <Form>
          <Form.Check type="switch" id="ma-switch" label="Active on MA-Shops" />
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Quality
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Country
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Details
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Images
            </Form.Label>
            <Col sm={6}>
              <ImageDropzone></ImageDropzone>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoaderButton type="submit">Save & Next</LoaderButton>
            </Col>
          </Form.Group>
        </Form>
      </section>

      <section
        id="ebay-conf-tab"
        className={currentView === "ebay" ? "" : "hidden"}
      >
        <Form>
          <Form.Check type="switch" id="ebay-switch" label="Active on ebay" />
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Quality
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Country
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Details
            </Form.Label>
            <Col sm={6}>
              <Form.Control />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Images
            </Form.Label>
            <Col sm={6}>
              <ImageDropzone></ImageDropzone>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoaderButton type="submit">Save & Next</LoaderButton>
            </Col>
          </Form.Group>
        </Form>
      </section>
    </div>
  );
}

function saveAndNext() {
  console.log("save and next clicked");
}
