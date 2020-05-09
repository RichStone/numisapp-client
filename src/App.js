import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
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

    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Nav activeKey="/home" className="nav">
          <Nav.Item className="brand">
            <Nav.Link href="/">Numify</Nav.Link>
          </Nav.Item>

          {isAuthenticated ? (
            <>
              <Nav.Item>
                <Nav.Link href="/settings">Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/info">Info</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={handleLogout}>
                <Nav.Link>Logout</Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    )
  );
}

export default withRouter(App);
