import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/SignUp";
import Products from "./containers/Products";
import NewProduct from "./containers/NewProduct";
import Settings from "./containers/Settings";
import Info from "./containers/Info";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/settings"
        exact
        component={Settings}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/info"
        exact
        component={Info}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/products/new"
        exact
        component={NewProduct}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/products/:id"
        exact
        component={Products}
        appProps={appProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
