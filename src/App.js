import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { Auth } from "aws-amplify";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    props.history.push("/");
  }

  return (
    !isAuthenticating && (
      <div className="App">
        <Navbar bg="light" expand="md">
          <Navbar.Brand id="navbar-brand" href="/">
            Numify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/inventory">Inventory</Nav.Link>
                  <Nav.Link href="/products/new#images">New</Nav.Link>
                  <Nav.Link href="/settings">Settings</Nav.Link>
                  <Nav.Link href="/info">Info</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
        </div>
      </div>
    )
  );
}

export default withRouter(App);
