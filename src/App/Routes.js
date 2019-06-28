import React from "react";
import { Route, Switch } from "react-router";
import { Helmet } from "react-helmet";
import Home from "../Templates/Home";

export default () => (
  <div>
    <Helmet>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.4/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-default.css"
      />
      
    </Helmet>

    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
);
