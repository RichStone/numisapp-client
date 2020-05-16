import React from "react";
import { Image, Jumbotron, Button } from "react-bootstrap";
import PricingTableComponent from "../components/PricingTable";
import LandingPageFeature from "../components/LandingPageFeature";
import "./Lander.css";

export default function Lander(props) {
  const inlineBoldStyle = {
    fontWeight: "bold",
    fontSize: 22,
  };

  const maShopsFeatureDesc = `
    MA-Shops is world's biggest platform for numismatic articles, but
    the integration is not always optimal. We are here to fix this!
  `;

  const excelFeatureDesc = `
    Are you tired of doing the same work for every platform? 
    With numify you add your coins once and they are sent to e-commerce platforms automatically.
    Now you can focus on your core business instead of managing Excel tables...
  `;

  const customShopFeatureDesc = `
    We integrate with your own custom shop solution, just let us know your e-commerce platform.
    Don't have your own shop yet?
    We help you get started with the perfect solution for your needs!
  `;

  const ebayFeatureDesc = `
    We work on further integrations with eBay and catawiki. 
    Please, let us know about your preferences!
  `;

  return (
    <div className="lander">
      <Jumbotron>
        <h1>Hello, Numismat!</h1>
        <p>
          We want you to{" "}
          <span style={inlineBoldStyle}>sell more coins easier!</span> List your
          coins in the numify app and they will be uploaded automatically to
          eBay, ma-shops, catawiki, and your own shop system. You have full
          control about your new inventory in one place.
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

      <LandingPageFeature
        imgName="ma-shops-logo.png"
        description={maShopsFeatureDesc}
      ></LandingPageFeature>

      <LandingPageFeature
        imgName="excel-logo.png"
        description={excelFeatureDesc}
      ></LandingPageFeature>

      <LandingPageFeature
        imgName="bigcommerce-logo.png"
        description={customShopFeatureDesc}
      ></LandingPageFeature>

      <LandingPageFeature
        imgName="ebay-logo.png"
        description={ebayFeatureDesc}
      ></LandingPageFeature>

      <PricingTableComponent {...props} />

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
