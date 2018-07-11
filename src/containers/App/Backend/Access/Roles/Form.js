import React, { Component } from 'react';
import { connect } from 'react-redux';
import userAgent from './agent';
import {
  ROLE_CREATE,
  ROLE_FORM_PAGE_LOADED,
  ROLE_FORM_PAGE_UNLOADED,
  ROLE_UPDATE,
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
  Row,
} from 'reactstrap';
import ListErrors from 'components/ListErrors';

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

let data = {
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  confirmed: true,
  status: true,
  confirmation_email: false,
  assignees_roles: '3',
  permissions: [1],
};

const roleMap = {
  Administrator: '1',
  Executive: '2',
  User: '3',
};

class Form extends Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.id) {
      return this.props.onLoad(userAgent.get(this.props.match.params.id));
    }
    this.props.onLoad(null);
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

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { handleSubmit } = this.props;
    const { invalid } = this.props;
    const { user } = this.props;
    const isEditMode = user ? true : false;
    const { errors } = this.props;

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
      this.props.history.push('/access/role');
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <form
              onSubmit={handleSubmit(this.props.onSubmit.bind(this))}
              className="form-horizontal"
            >
              <Card>
                <CardHeader>
                  <i className="fa fa fa-user-plus" />{' '}
                  {isEditMode ? 'Update' : 'Create'} Role
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="8">
                      <ListErrors errors={this.props.errors} />

                      <FormGroup row>
                        <Label
                          className="col-md-3 col-form-label"
                          htmlFor="name"
                        >
                          Name*
                        </Label>
                        <Col md="9">
                          <InputGroup>
                            <Field
                              className="form-control"
                              component="input"
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter Role..."
                              required
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <i className="fa fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button
                    block={false}
                    outline
                    color="primary"
                    disabled={invalid}
                    type="submit"
                  >
                    <i className="fa fa-save" /> Submit
                  </Button>{' '}
                  <Button
                    tag={Link}
                    to={`/access/role`}
                    className="btn btn-outline-danger"
                  >
                    {' '}
                    <i className="fa fa-arrow-left" /> Go Back{' '}
                  </Button>
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
  ...state.roles,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: values => {
    if (values.id) {
      dispatch({ type: ROLE_UPDATE, payload: userAgent.update(values) });
    } else {
      dispatch({ type: ROLE_CREATE, payload: userAgent.create(values) });
    }
  },
  onLoad: payload => dispatch({ type: ROLE_FORM_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ROLE_FORM_PAGE_UNLOADED }),
});

export default reduxForm({
  form: 'CreateRoleForm',
  initialValues: data,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form)
);
