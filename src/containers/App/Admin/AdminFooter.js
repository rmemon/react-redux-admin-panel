import React, { Component } from 'react';

class AdminFooter extends Component {
  render() {

    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a>Rahil</a> &copy; 2018 React Admin .</span>
        <span className="ml-auto">Powered by <a href="">for React</a></span>
      </React.Fragment>
    );
  }
}

export default AdminFooter;
