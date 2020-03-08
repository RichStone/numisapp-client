import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const products = await loadProducts();
        setProducts(products);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadProducts() {
    return API.get("products", "/products");
  }

  function renderProductsList(products) {
    return [{}].concat(products).map((product, i) =>
      i !== 0 ? (
        <LinkContainer
          key={product.ProductId}
          to={`/products/${product.ProductId}`}
        >
          <ListGroupItem header={product.Category}>
            {"Created: " + new Date(product.CreatedAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/products/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new product
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Numify</h1>
        <p>Numismat's number 1. digital friend.</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
        <div>
          <Image src="/images/netlify-smilo.png" id="logo" rounded />
        </div>
      </div>
    );
  }

  function renderProducts() {
    return (
      <div className="products">
        <PageHeader>Your Products</PageHeader>
        <ListGroup>{!isLoading && renderProductsList(products)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderProducts() : renderLander()}
    </div>
  );
}
