import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../../pages/Auth/Login/Login.jsx";
import Register from "../../pages/Auth/Register/Register.jsx";
import { Dashboard } from "../../pages/Dashboard";

export const Routers = () => {
  return (
    <>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" render={(props) => <Login {...props} />} />
    </Switch>
  
  </>
  );
};
