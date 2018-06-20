import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../../../agent';
import { USER_PAGE_LOADED, USER_PAGE_UNLOADED } from '../../../../constants/actionTypes'

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
    return (
      <div className="animated fadeIn">      
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong> <i className="fa fa-user"></i> Create User </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="text" id="text-input" name="text-input" placeholder="Enter First Name..." />
                      {/* <FormText color="muted">This is a help text</FormText> */}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="text" id="text-input" name="text-input" placeholder="Enter Last Name..." />                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Email</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="email" id="text-input" name="text-input" placeholder="Enter Email..." />                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Password</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="password" id="text-input" name="text-input" placeholder="Enter Password..." />                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Confirm Password</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="password" id="text-input" name="text-input" placeholder="Enter Confirm Password..." />                      
                    </Col>
                  </FormGroup>
                                                      
                  <FormGroup row>
                    <Col md="3">
                      <Label>Associated Roles</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="Administrator" />
                        <Label className="form-check-label" check htmlFor="inline-radio1">Administrator</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="Executive" />
                        <Label className="form-check-label" check htmlFor="inline-radio2">Executive</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="User" />
                        <Label className="form-check-label" check htmlFor="inline-radio3">User</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>                                                      
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
  ...state.users,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: USER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: USER_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);