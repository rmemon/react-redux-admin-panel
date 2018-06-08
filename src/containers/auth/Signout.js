import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action';

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
    this.props.history.push('/login');
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}

export default connect(null, actions)(Signout);
