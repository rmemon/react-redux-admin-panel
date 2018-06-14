import React from "react";
import { Route, Redirect } from "react-router-dom";
import agent from '../agent';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		agent.getToken()
		// localStorage.getItem('jwt')
			? <Component {...props} />
			: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
	)} />
)