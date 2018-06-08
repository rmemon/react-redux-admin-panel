import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { Link } from 'react-router-dom';

class Home extends Component {    
    render() {
        return (        
        <div>
            <Link to="/signout">Sign Out</Link>
            <h1> Home </h1>
        </div>
        )
    }    
}
export default requireAuth(Home);