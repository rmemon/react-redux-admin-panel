import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";

import * as actions from "../../action/";


class Login extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(this.props.signout());
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push("/");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  <form onSubmit={handleSubmit(this.onSubmit)} >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                      className="form-control form-control-lg"
                      name="email"
                      type="email"
                      component="input"
                      autoComplete="none"
                      placeholder="Email"
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
                      className="form-control form-control-lg"
                      name="password"
                      type="password"
                      component="input"
                      autoComplete="none"
                      placeholder="Pass"
                      required
                    />
                    </InputGroup>
                    
                    <Row>
                      <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Smart React is an open source React project with basic admin features. It uses Laravel famous PHP framework for backend API purpose.</p>                      
                      <Link to="/register"><Button color="primary" className="mt-3" active>Register Now!</Button></Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Login);

