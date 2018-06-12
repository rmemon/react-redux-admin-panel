import { Link } from 'react-router-dom';
import ListErrors from '../../components/ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from 'reactstrap';


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeFirstName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'first_name', value }),
  onChangeLastName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'last_name', value }),
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangePasswordConfirm: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password_confirmation', value }),
  onChangeIsTermAccept: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'is_term_accept', value }),
  onSubmit: (first_name, last_name, email, password, password_confirmation, is_term_accept) => {    
    const payload = agent.Auth.register(first_name, last_name, email, password, password_confirmation, is_term_accept);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
    this.changeLastName = ev => this.props.onChangeLastName(ev.target.value);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changePasswordConfirm = ev => this.props.onChangePasswordConfirm(ev.target.value);
    this.changeIsTermAccept = ev => this.props.onChangeIsTermAccept(ev.target.checked);
    this.submitForm = (first_name, last_name, email, password, password_confirmation, is_term_accept) => ev => {
      ev.preventDefault();
      this.props.onSubmit(first_name, last_name, email, password, password_confirmation, is_term_accept);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const first_name = this.props.first_name;
    const last_name = this.props.last_name;
    const email = this.props.email;
    const password = this.props.password;
    const password_confirmation = this.props.password_confirmation;
    const is_term_accept = this.props.is_term_accept;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <ListErrors errors={this.props.errors} />
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form onSubmit={this.submitForm(first_name, last_name, email, password, password_confirmation, is_term_accept)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        value={this.props.first_name}
                        onChange={this.changeFirstName} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        value={this.props.last_name}
                        onChange={this.changeLastName} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={this.props.email}
                        onChange={this.changeEmail}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.props.password}
                        onChange={this.changePassword} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        name="password_confirmation"
                        type="password"
                        placeholder="Repeat password"
                        value={this.props.password_confirmation}
                        onChange={this.changePasswordConfirm} />
                    </InputGroup>
                    <InputGroup className="mb-4 custom-control custom-checkbox">
                      <input
                        name="is_term_accept"
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        onChange={this.changeIsTermAccept} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
