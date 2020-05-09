import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

export default function Lander(props) {
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
