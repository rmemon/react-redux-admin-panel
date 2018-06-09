import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { PrivateRoute } from '../containers/privateRoute';
import Home from '../containers/home/Home';
import Register from '../containers/auth/Register';
import Login from '../containers/auth/Login';
import Signout from '../containers/auth/Signout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>			
          <div>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/signout" component={Signout} />
          </div>
    	</BrowserRouter>
    )
  }  
};
