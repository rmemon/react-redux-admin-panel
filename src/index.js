import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/app';
// import { store } from './store';
import Register from './containers/auth/Register';
import Login from './containers/auth/Login';
import Signout from './containers/auth/Signout';
import Home from './containers/home/Home';
import UserList from './containers/user/UserList'
import reducers from './reducers';

const store = createStore(
	reducers,
	{
	  auth: { authenticated: localStorage.getItem('token') }
	},
	applyMiddleware(reduxThunk)
  );

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Home} />
				<Route path="/user" exact component={UserList} />				
				<Route path="/home" exact component={Home} />
				<Route path="/register" component={Register} />								
				<Route path="/login" component={Login} />
				<Route path="/signout" component={Signout} />
			</App>
    	</BrowserRouter>
	</Provider>
	, document.getElementById('root'));