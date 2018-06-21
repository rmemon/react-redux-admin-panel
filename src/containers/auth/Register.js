import { Link } from 'react-router-dom';
import ListErrors from '../../components/ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import { Button, Card, CardBody, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row, } from 'reactstrap';

import { reduxForm, Field } from "redux-form";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    const payload = agent.Auth.register(values);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <ListErrors errors={this.props.errors} />
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        className="form-control"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        component="input"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        className="form-control"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        component="input"
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Field
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        component="input"
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
                        type="password"
                        name="password"
                        placeholder="Password"
                        component="input"
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
                        type="password"
                        name="password_confirmation"
                        placeholder="Repeat password"
                        component="input"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4 custom-control custom-checkbox">
                      <Field
                        name="is_term_accept"
                        type="checkbox"
                        className="custom-control-input"
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

export default reduxForm({
  form: "RegisterForm"
})(connect(mapStateToProps, mapDispatchToProps)(Register));
