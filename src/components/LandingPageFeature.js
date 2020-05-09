import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import "./LandingPageFeature.css";

export default function LandingPageFeature(props) {
  return (
    <div className="LandingPageFeature">
      <Row>
        <Col md={4}>
          <Image src={`/images/${props.imgName}`} rounded />
        </Col>
        <Col md={8}>
          <p>{props.description}</p>
        </Col>
      </Row>
    </div>
  );
}
