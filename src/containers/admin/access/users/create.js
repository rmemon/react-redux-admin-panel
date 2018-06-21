import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../../../agent';
import { USER_PAGE_LOADED, USER_PAGE_UNLOADED, USER_CREATE } from '../../../../constants/actionTypes'
import {
  InputGroupText, InputGroupAddon, InputGroup
} from 'reactstrap';
import ListErrors from '../../../../components/ListErrors';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';

import { reduxForm, Field } from 'redux-form';
const data = {
  id: null,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  confirmed: true,
  status: true,
  confirmation_email: false,
  assignees_roles: "3",
  permissions: [1]
};

class Create extends Component {
  constructor(props) {
    super(props)
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
                    <ListErrors errors={this.props.errors} />
                    <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))} className="form-horizontal">
                      <FormGroup row>
                        <Label className="col-md-3 col-form-label" htmlFor="first_name">First Name*</Label>
                        <Col md="9">
                          <InputGroup>
                            <Field className="form-control" component="input" type="text" id="first_name" name="first_name" placeholder="Enter First Name..." />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label className="col-md-3 col-form-label" htmlFor="last_name">Last Name*</Label>
                        <Col md="9">
                          <InputGroup>
                            <Field className="form-control" component="input" type="text" id="last_name" name="last_name" placeholder="Enter Last Name..." />
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
                            <Field className="form-control" component="input" type="email" id="email" name="email" placeholder="Enter Email..." />
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
                            <Field className="form-control" component="input" type="password" id="password" name="password" placeholder="Enter Password..." />
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
                            <Field className="form-control" component="input" type="password" id="password_confirmation" name="password_confirmation" placeholder="Enter Confirm Password..." />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-lock"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label className="col-md-3 col-form-label" htmlFor="status">User Active</Label>
                        <Col md="9">
                          <Field type="checkbox" id="status" name="status" component="input" className="centered-checkbox" />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label className="col-md-3 col-form-label" htmlFor="confirmed">User Confirmed</Label>
                        <Col md="9">
                          <Field type="checkbox" id="confirmed" name="confirmed" component="input" className="centered-checkbox" />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label className="col-md-3 col-form-label" htmlFor="confirmation_email">Send Confirmation</Label>
                        <Col md="9">
                          <Field type="checkbox" id="confirmation_email" name="confirmation_email" component="input" className="centered-checkbox" />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label>Associated Roles</Label>
                        </Col>
                        <Col md="9">
                          <FormGroup check inline className="col-md-3">
                            <Field component="input" type="radio" id="inline-radio1" name="assignees_roles" value="1" className="form-check-input" />
                            <Label className="form-check-label" check htmlFor="inline-radio1"> Administrator</Label>
                          </FormGroup>
                          <FormGroup check inline className="col-md-3">
                            <Field component="input" type="radio" id="inline-radio2" name="assignees_roles" value="2" className="form-check-input" />
                            <Label className="form-check-label" check htmlFor="inline-radio2"> Executive</Label>
                          </FormGroup>
                          <FormGroup check inline className="col-md-3">
                            <Field component="input" type="radio" id="inline-radio3" name="assignees_roles" value="3" className="form-check-input" />
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
  ...state.users,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) =>
    dispatch({ type: USER_CREATE, payload: agent.User.create(values) }),
  onLoad: payload =>
    dispatch({ type: USER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: USER_PAGE_UNLOADED })
});

export default reduxForm({
  form: "CreateUserForm",
  initialValues: data
})(connect(mapStateToProps, mapDispatchToProps)(Create));