import { Link } from 'react-router-dom';
import ListErrors from '../../components/ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  LOGIN_PAGE_LOADED
} from '../../constants/actionTypes';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { compose } from "redux";
import { reduxForm, Field } from "redux-form";



const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: (value = null) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onLoad: () =>
    dispatch({ type: LOGIN_PAGE_LOADED, key: 'email', key: 'password' })
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  
  componentDidMount(){
    this.props.onLoad();
  }

  render() {
    const email = this.props.email || '';
    const password = this.props.password || '';
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <ListErrors errors={this.props.errors} />
              <CardGroup>

                <Card className="p-4">
                  <CardBody>
                    <form onSubmit={this.submitForm(email, password)} >
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={this.changeEmail} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={this.changePassword} />
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button type='button' color="link" className="px-0">Forgot password?</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);