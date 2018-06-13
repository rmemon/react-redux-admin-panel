import React, { Component } from 'react';

class DefaultFooter extends Component {
  render() {
    
    const { children, ...attributes } = this.props;
    
    return (
      <React.Fragment>
        <span><a href="#">Rahil</a> &copy; 2018 React Admin .</span>
        <span className="ml-auto">Powered by <a href="">for React</a></span>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;
