import React from 'react';
import { Alert } from 'reactstrap';

class ListErrors extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }
  


  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const errors = this.props.errors;        
    if (errors) {
      return (
        // isOpen={this.state.visible} toggle={this.onDismiss}
        <Alert color="danger">
          { errors.message }
        </Alert>
      );      
    } else {
      return null;
    }
  }
}

export default ListErrors;
