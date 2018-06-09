import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { PrivateRoute } from "../containers/privateRoute";
import Home from "../containers/home/Home";
import Register from "../containers/auth/Register";
import Login from "../containers/auth/Login";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/home" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
