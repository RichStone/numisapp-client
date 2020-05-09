import React from "react";
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
          <span style={inlineBoldStyle}>sell more coins easier!</span> List your
          coins in the numify app and they will be uploaded automatically to
          eBay, ma-shops, catawiki, and your own shop system. You have full
          control.
        </p>
        <p>
          <a
            href="https://calendly.com/richstone/intro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="btn btn-success btn-lg">Schedule Demo</Button>
          </a>
        </p>
      </Jumbotron>
      ;
      <div>
        <PricingTableComponent />
      </div>
      <h1>Numify</h1>
      <p>Numismat's number 1. digital friend.</p>
      <div>
        <a
          href="https://calendly.com/richstone/intro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="btn btn-success btn-lg">Schedule Demo</Button>
        </a>
      </div>
      <div>
        <Image src="/images/netlify-smilo.png" id="logo" rounded />
      </div>
    </div>
  );
}
