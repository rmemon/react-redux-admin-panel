import {Link} from 'react-router-dom';
import { compose } from 'redux';
import ListErrors from 'components/ListErrors';
import React from 'react';
import authAgent from './agent';
import {connect} from 'react-redux';
import {LOGIN, LOGIN_PAGE_UNLOADED} from './constants';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import {Field, reduxForm} from "redux-form";

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
    onSubmit: (values) =>
        dispatch({type: LOGIN, payload: authAgent.login(values)}),
    onUnload: () =>
        dispatch({type: LOGIN_PAGE_UNLOADED}),
});

class Login extends React.Component {
    // constructor(props) {
    //   super(props);
    //   // this.onSubmit = (values) => {
    //   //   this.props.onSubmit(values);
    //   // };
    // }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <ListErrors errors={this.props.errors}/>
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Field
                                                    name="title"
                                                    className="form-control"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
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
                                                    name="password"
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    component="input"
                                                    required
                                                />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button type="submit" color="primary"
                                                            className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button type='button' color="link" className="px-0">Forgot
                                                        password?</Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Smart React is an open source React project with basic admin features. It
                                                uses Laravel famous PHP framework for backend API purpose.</p>
                                            <Link to="/register"><Button color="primary" className="mt-3" active>Register
                                                Now!</Button></Link>
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

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);


const withReducer = injectReducer({ key: 'auth', reducer });

const withreduxForm = reduxForm({
    form: "LoginForm"
});

export default compose(
    withReducer,
    withreduxForm,
    withConnect,
  )(Login);