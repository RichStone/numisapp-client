import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, ProgressBar, Image } from "react-bootstrap";
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
        <a href="#description">
          <div className="steps-bar-item">
            <IconContext.Provider value={{ color: "darkgray", size: "2em" }}>
              <MdDescription />
            </IconContext.Provider>
            <p>Desc</p>
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
        id="description-tab"
        className={currentView === "description" ? "" : "hidden"}
      >
        <h3>Product Details</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Category">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <NewProductCategories />

          <NewProductCountries />

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
      </section>

      <section
        id="shoptrader-conf-tab"
        className={currentView === "shop" ? "" : "hidden"}
      ></section>
      <section
        id="ma-shops-conf-tab"
        className={currentView === "ma-shops" ? "" : "hidden"}
      ></section>
      <section
        id="ebay-conf-tab"
        className={currentView === "ebay" ? "" : "hidden"}
      ></section>
    </div>
  );
}
