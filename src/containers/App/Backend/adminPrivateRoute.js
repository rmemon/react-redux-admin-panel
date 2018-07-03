import React from "react";
import {Redirect, Route} from "react-router-dom";
import agent from 'agent';

export const AdminPrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        agent.getToken()
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
)