import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";
import Lander from "./Lander";

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
    return <Lander />;
  }

  function renderProducts() {
    return (
      <div className="products">
        <h2>Your Products</h2>
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
