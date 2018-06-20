import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../../../agent';
import { USER_PAGE_LOADED, USER_PAGE_UNLOADED } from '../../../../constants/actionTypes'
import {
  InputGroupText, InputGroupAddon, InputGroup
} from 'reactstrap';
import {
  Badge,
  Button,

  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,  
  Form,
  FormGroup,
  FormText,  
  Input,      
  Label,
  Row,
} from 'reactstrap';


import { reduxForm, Field}  from 'redux-form'; 


class Create extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };

  }  
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="animated fadeIn">      
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                 <i className="fa fa fa-user-plus"></i>  Create User 
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="8">
                  <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))} className="form-horizontal">
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="firstName">First Name*</Label>
                      <Col md="9">
                        <InputGroup>
                          <Field  className="form-control" component="input" type="text" id="firstName" name="firstName" placeholder="Enter First Name..." />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="secondName">Last Name*</Label>
                      <Col md="9">
                        <InputGroup>
                          <Field  className="form-control" component="input" type="text" id="secondName" name="secondName" placeholder="Enter Last Name..." />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="email">Email*</Label>
                      <Col md="9">
                        <InputGroup>
                          <Field  className="form-control" component="input" type="email" id="email" name="email" placeholder="Enter Email..." />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="password">Password*</Label>
                      <Col md="9">
                        <InputGroup>
                          <Field  className="form-control" component="input" type="password" id="password" name="password" placeholder="Enter Password..." />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-lock"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="password">Confirm Password*</Label>
                      <Col md="9">
                        <InputGroup>
                          <Field  className="form-control" component="input" type="password" id="password_confirmation" name="password_confirmation" placeholder="Enter Confirm Password..." />
                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-lock"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="status">User Active</Label>
                      <Col md="9">
                          <Field  type="checkbox" id="status" name="status" component="input" className="centered-checkbox" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="confirmed">User Confirmed</Label>
                      <Col md="9">
                          <Field  type="checkbox" id="confirmed" name="confirmed" component="input" className="centered-checkbox" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-3 col-form-label" htmlFor="confirmation_email">Send Confirmation</Label>
                      <Col md="9">
                          <Field  type="checkbox" id="confirmation_email" name="confirmation_email" component="input" className="centered-checkbox"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Associated Roles</Label>
                      </Col>
                      <Col md="9">
                        <FormGroup check inline className="col-md-3">
                          <Field  component="input" type="radio" id="inline-radio1" name="inline-radios" value="Administrator" className="form-check-input"/>
                          <Label className="form-check-label" check htmlFor="inline-radio1"> Administrator</Label>
                        </FormGroup>
                        <FormGroup check inline className="col-md-3">
                          <Field  component="input" type="radio" id="inline-radio2" name="inline-radios" value="Executive" className="form-check-input"/>
                          <Label className="form-check-label" check htmlFor="inline-radio2"> Executive</Label>
                        </FormGroup>
                        <FormGroup check inline className="col-md-3">
                          <Field  component="input" type="radio" id="inline-radio3" name="inline-radios" value="User" className="form-check-input"/>
                          <Label className="form-check-label" check htmlFor="inline-radio3"> User</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  </form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                
                {/* <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
              </CardFooter>
            </Card>            
          </Col>          
        </Row>                
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.user,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    console.log(values);
    return false;
  },
  onLoad: payload =>
    dispatch({ type: USER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: USER_PAGE_UNLOADED })
});

export default reduxForm({
  form: "CreateUserForm"
})(connect(mapStateToProps, mapDispatchToProps)(Create));