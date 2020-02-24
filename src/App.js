import React from "react";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./App.css";

function App(props) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">NumisApp </Link>
            <Link to="/asdf">Second</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
