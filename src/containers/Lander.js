import React from "react";
import { Link } from "react-router-dom";
import { Image, Jumbotron, Button } from "react-bootstrap";
import PricingTableComponent from "../components/PricingTable";
import "./Lander.css";

export default function Lander(props) {
  const inlineBoldStyle = {
    fontWeight: "bold",
    fontSize: 22,
  };

  return (
    <div className="lander">
      <Jumbotron>
        <h1>Hello, Numismat!</h1>
        <p>
          We want you to{" "}
          <span style={inlineBoldStyle}>sell more coins easier</span>! List your
          coins in the numify app and they will be uploaded automatically to
          eBay, ma-shops, catawiki, and your own shop system. You have full
          control.
        </p>
        <p>
          <Link
            to="https://calendly.com/richstone/intro"
            className="btn btn-info btn-lg"
          >
            Schedule Demo
          </Link>
        </p>
      </Jumbotron>
      ;
      <div>
        <PricingTableComponent />
      </div>
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