import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
import { postRole, onFormLoad, onFormUnLoad } from './actions';
import { onLoadAction as onLoadPermissionsAction } from '../Permissions/actions';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import Select from 'react-select';

let data = {
  name: '',
  sort: null,
  permissions: null,
  status: 0,
};

class Form extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      if (nextProps.match.params.id) {
        this.props.onFormUnLoad();
        return this.props.onFormLoad(this.props.match.params.id);
      }
      this.props.onFormLoad(null);
    }
  }

  componentDidMount() {
    this.props.onLoadPermissionsAction();

    if (this.props.match.params.id) {
      return this.props.onFormLoad(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.onFormUnLoad();
  }

  render() {
    const { handleSubmit } = this.props;
    const { invalid } = this.props;
    const { role, permissions } = this.props;
    const isEditMode = role ? true : false;
    const { errors } = this.props;

    if (role) {
      data.name = role.name;
      data.sort = role.sort;
      data.status = role.status;
    } else {
      data.name = '';
      data.sort = '';
      data.status = '';
      data.permissions = '';
    }

    if (permissions && permissions.length && role) {
      let permissionTemp = [],
        selectAll = role.permissions === 'All';
      permissions.forEach(permission => {
        if (
          role.permissions.indexOf(permission.display_name) !== -1 ||
          selectAll
        ) {
          permissionTemp.push(permission.id);
        }
      });
      data.permissions = permissionTemp.join(',');
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <form
              onSubmit={handleSubmit(this.props.postRole.bind(this))}
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

                      <FormGroup row>
                        <Label
                          className="col-md-3 col-form-label"
                          htmlFor="sort"
                        >
                          Sort*
                        </Label>
                        <Col md="9">
                          <InputGroup>
                            <Field
                              className="form-control"
                              component="input"
                              type="number"
                              id="sort"
                              name="sort"
                              placeholder="Enter Sort..."
                              required
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <i className="fa fa-sort-numeric-desc" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          className="col-md-3 col-form-label"
                          htmlFor="status"
                        >
                          Active
                        </Label>
                        <Col md="9">
                          <Field
                            type="checkbox"
                            id="status"
                            name="status"
                            component="input"
                            className="centered-checkbox"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          className="col-md-3 col-form-label"
                          htmlFor="status"
                        >
                          Active
                        </Label>
                        <Col md="9">
                          <Field
                            name="permissions"
                            component={props => (
                              <Select
                                labelKey="display_name"
                                valueKey="id"
                                multi={true}
                                value={props.input.value}
                                onChange={props.input.onChange}
                                onBlur={() =>
                                  props.input.onBlur(props.input.value)
                                }
                                options={permissions}
                                placeholder="Select"
                                simpleValue
                                closeOnSelect={false}
                              />
                            )}
                          />
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

const withreduxForm = reduxForm({
  form: 'CreateRoleForm',
  initialValues: data,
});

const withReducer = injectReducer({ key: 'roles', reducer });

const withConnect = connect(
  mapStateToProps,
  { postRole, onFormLoad, onFormUnLoad, onLoadPermissionsAction },
);

export default compose(
  withReducer,
  withreduxForm,
  withConnect,
)(Form);
