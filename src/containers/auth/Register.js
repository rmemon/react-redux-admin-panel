import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row,  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../action";
import { reduxForm, Field } from "redux-form";


class Register extends Component {
  constructor(props) {
    super(props);
  }
  
  onSubmit = formProps => {
    console.log(formProps.is_term_accept);
    // formProps.is_term_accept = 1;
    this.props.signup(formProps, () => {
      this.props.history.push("/");
    });
  };

  render() {
    
    const { handleSubmit } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form onSubmit={handleSubmit(this.onSubmit)} >
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    {/* <Input type="text" placeholder="Username" /> */}
                    <Field
                      className="form-control"
                      name="first_name"
                      type="text"
                      component="input"
                      autoComplete="none"
                      placeholder="First Name"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    {/* <Input type="text" placeholder="Username" /> */}
                    <Field
                      className="form-control"
                      name="last_name"
                      type="text"
                      component="input"
                      autoComplete="none"
                      placeholder="Last Name"
                      required
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Field
                      className="form-control"
                      name="email"
                      type="email"
                      component="input"
                      autoComplete="none"
                      placeholder="Email"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                      component="input"
                      autoComplete="none"
                      placeholder="Password"
                      required
                    />

                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>                    
                    <Field
                      className="form-control"
                      name="password_confirmation"
                      type="password"
                      component="input"
                      autoComplete="none"
                      placeholder="Repeat password"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-4 custom-control custom-checkbox">
                  <Field name="is_term_accept" type="checkbox" className="custom-control-input"
                  component='input' id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">Check this custom checkbox</label>

                  </InputGroup>
                  <Button color="success" >
                    <i className="fa fa-user-plus"></i> Create Account
                  </Button>
                  {'  '}
                  <Link to="/login"> 
                  <Button color="primary" type="submit" >
                  <i className="fa fa-lock"></i>login
                  </Button>
                  </Link>
                  
                  </form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

export default compose(
  connect(
  mapStateToProps,
  actions),
  reduxForm({ form: "sinup" })
)(Register);