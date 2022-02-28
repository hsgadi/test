import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import { client } from "./Utils/Apollo/apolloClient";
import { history } from "./Utils/Router/browserHistory";
import "./index.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history} location={history.location} >
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
