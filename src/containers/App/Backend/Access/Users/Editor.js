import React, {Component} from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';
import userAgent from './agent';
import {
    USER_CREATE,
    USER_EDITOR_PAGE_LOADED,
    USER_EDITOR_PAGE_UNLOADED,
    USER_UPDATE
} from './constants';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row
} from 'reactstrap';
import ListErrors from 'components/ListErrors';

import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

let data = {
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

const roleMap = {
    Administrator: '1',
    Executive: '2',
    User: '3'
}

class Editor extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            if (nextProps.match.params.id) {
                this.props.onUnload();
                return this.props.onLoad(userAgent.get(this.props.match.params.id));
            }
            this.props.onLoad(null);
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            return this.props.onLoad(userAgent.get(this.props.match.params.id));
        }
        this.props.onLoad(null);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const {handleSubmit} = this.props;
        const {invalid} = this.props;
        const {user} = this.props;
        const isEditMode = user ? true : false;
        const {errors} = this.props;

        console.log(user);

        if (user) {
            data.first_name = user.first_name;
            data.id = user.id;
            data.last_name = user.last_name;
            data.email = user.email;
            data.confirmed = user.confirmed;
            data.status = user.status;
            data.confirmation_email = user.confirmation_email;
            data.assignees_roles = roleMap[user.role];
        }
        if (this.props.match.params.id && errors) {
            this.props.history.push('/access/user');
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <form onSubmit={handleSubmit(this.props.onSubmit.bind(this))} className="form-horizontal">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa fa-user-plus"></i> {isEditMode ? 'Update' : 'Create'} User
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col sm="8">
                                            <ListErrors errors={this.props.errors}/>

                                            <FormGroup row>
                                                <Label className="col-md-3 col-form-label" htmlFor="first_name">First
                                                    Name*</Label>
                                                <Col md="9">
                                                    <InputGroup>
                                                        <Field className="form-control" component="input" type="text"
                                                               id="first_name" name="first_name"
                                                               placeholder="Enter First Name..." required/>
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><i
                                                                className="fa fa-user"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label className="col-md-3 col-form-label" htmlFor="last_name">Last
                                                    Name*</Label>
                                                <Col md="9">
                                                    <InputGroup>
                                                        <Field className="form-control" component="input" type="text"
                                                               id="last_name" name="last_name"
                                                               placeholder="Enter Last Name..." required/>
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><i
                                                                className="fa fa-user"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label className="col-md-3 col-form-label"
                                                       htmlFor="email">Email*</Label>
                                                <Col md="9">
                                                    <InputGroup>
                                                        <Field className="form-control" component="input" type="email"
                                                               id="email" name="email" placeholder="Enter Email..."
                                                               required/>
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><i
                                                                className="fa fa-envelope"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </FormGroup>
                                            {!isEditMode &&
                                            <div>
                                                <FormGroup row>
                                                    <Label className="col-md-3 col-form-label"
                                                           htmlFor="password">Password*</Label>
                                                    <Col md="9">
                                                        <InputGroup>
                                                            <Field className="form-control" component="input"
                                                                   type="password" id="password" name="password"
                                                                   placeholder="Enter Password..." required/>
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText><i
                                                                    className="fa fa-lock"></i></InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label className="col-md-3 col-form-label" htmlFor="password">Confirm
                                                        Password*</Label>
                                                    <Col md="9">
                                                        <InputGroup>
                                                            <Field className="form-control" component="input"
                                                                   type="password" id="password_confirmation"
                                                                   name="password_confirmation"
                                                                   placeholder="Enter Confirm Password..." required/>
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText><i
                                                                    className="fa fa-lock"></i></InputGroupText>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                            }

                                            <FormGroup row>
                                                <Label className="col-md-3 col-form-label" htmlFor="status">User
                                                    Active</Label>
                                                <Col md="9">
                                                    <Field type="checkbox" id="status" name="status" component="input"
                                                           className="centered-checkbox"/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label className="col-md-3 col-form-label" htmlFor="confirmed">User
                                                    Confirmed</Label>
                                                <Col md="9">
                                                    <Field type="checkbox" id="confirmed" name="confirmed"
                                                           component="input" className="centered-checkbox"/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label className="col-md-3 col-form-label" htmlFor="confirmation_email">Send
                                                    Confirmation</Label>
                                                <Col md="9">
                                                    <Field type="checkbox" id="confirmation_email"
                                                           name="confirmation_email" component="input"
                                                           className="centered-checkbox"/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="3">
                                                    <Label>Associated Roles</Label>
                                                </Col>
                                                <Col md="9">
                                                    <FormGroup check inline className="col-md-3">
                                                        <Field component="input" type="radio" id="inline-radio1"
                                                               name="assignees_roles" value="1"
                                                               className="form-check-input"/>
                                                        <Label className="form-check-label" check
                                                               htmlFor="inline-radio1"> Administrator</Label>
                                                    </FormGroup>
                                                    <FormGroup check inline className="col-md-3">
                                                        <Field component="input" type="radio" id="inline-radio2"
                                                               name="assignees_roles" value="2"
                                                               className="form-check-input"/>
                                                        <Label className="form-check-label" check
                                                               htmlFor="inline-radio2"> Executive</Label>
                                                    </FormGroup>
                                                    <FormGroup check inline className="col-md-3">
                                                        <Field component="input" type="radio" id="inline-radio3"
                                                               name="assignees_roles" value="3"
                                                               className="form-check-input"/>
                                                        <Label className="form-check-label" check
                                                               htmlFor="inline-radio3"> User</Label>
                                                    </FormGroup>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button block={false} outline color="primary" disabled={invalid} type="submit">
                                        <i className='fa fa-save'></i> Submit
                                    </Button> {' '}
                                    <Button tag={Link} to={`/access/user`} className='btn btn-outline-danger'> <i
                                        className="fa fa-arrow-left"></i> Go Back </Button>
                                </CardFooter>
                            </Card>
                        </form>
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
    onSubmit: (values) => {
        if (values.id) {
            dispatch({type: USER_UPDATE, payload: userAgent.update(values)})
        }
        else {
            dispatch({type: USER_CREATE, payload: userAgent.create(values)})
        }
    },
    onLoad: payload =>
        dispatch({type: USER_EDITOR_PAGE_LOADED, payload}),
    onUnload: () =>
        dispatch({type: USER_EDITOR_PAGE_UNLOADED})
});

const withreduxForm = reduxForm({
    form: "CreateUserForm",
    initialValues: data
});

const withReducer = injectReducer({ key: 'users', reducer });

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withreduxForm,
    withConnect,
)(Editor);