import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PrivateRoute } from "../privateRoute";
import Register from "./Admin/Auth/Register";
import Login from "./Admin/Auth/Login";
import AdminLayout from './Admin'
import ClientLayout from './Client'

import agent from '../../agent';

import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
// Styles
import '../../index.css';
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../../scss/style.css';
import "react-table/react-table.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    
    const token = window.localStorage.getItem('jwt');    
    if (token) {
      agent.setToken(token);
    }    
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.history.push(nextProps.redirectTo)
      this.props.onRedirect();
    }
  }
  
  render() {
    return (
      <Switch>        
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />        
        <Route path="/client" component={ClientLayout} />        
        <PrivateRoute path="/" name="Home" component={AdminLayout} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    );
  }
}


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));