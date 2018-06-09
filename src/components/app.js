import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { PrivateRoute } from "../containers/privateRoute";
import Home from "../containers/home/Home";
import Register from "../containers/auth/Register";
import Login from "../containers/auth/Login";

// Styles
import '../index.css';
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.css';

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
