import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { postPermission, onFormLoad, onFormUnLoad } from './actions';

let data = {
  id: null,
  name: '',
  display_name: '',
  sort: '',
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
    if (this.props.match.params.id) {
      return this.props.onFormLoad(this.props.match.params.id);
    }
    this.props.onFormLoad(null);
  }

  componentWillUnmount() {
    this.props.onFormUnLoad();
  }

  render() {
    const { handleSubmit } = this.props;
    const { invalid } = this.props;
    const { permission } = this.props;
    const isEditMode = permission ? true : false;
    const { errors } = this.props;

    if (permission) {
      data.id = permission.id;
      data.name = permission.name;
      data.display_name = permission.display_name;
      data.sort = permission.sort;
    }

    if (this.props.match.params.id && errors) {
      this.props.history.push('/access/permission');
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <form
              onSubmit={handleSubmit(this.props.postPermission.bind(this))}
              className="form-horizontal"
            >
              <Card>
                <CardHeader>
                  <i className="fa fa fa-user-plus" />
                  {isEditMode ? 'Update' : 'Create'} Permission
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
                              placeholder="Enter First Name..."
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
                          htmlFor="display_name"
                        >
                          Display Name*
                        </Label>
                        <Col md="9">
                          <InputGroup>
                            <Field
                              className="form-control"
                              component="input"
                              type="text"
                              id="display_name"
                              name="display_name"
                              placeholder="Enter Last Name..."
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
                          Sort
                        </Label>
                        <Col md="9">
                          <InputGroup>
                            <Field
                              className="form-control"
                              component="input"
                              type="sort"
                              id="sort"
                              name="sort"
                              placeholder="Enter sort..."
                              required
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <i className="fa fa-envelope" />
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
                  </Button>
                  <Button
                    tag={Link}
                    to={`/access/permission`}
                    className="btn btn-outline-danger"
                  >
                    <i className="fa fa-arrow-left" /> Go Back
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
  ...state.permissions,
});

const withreduxForm = reduxForm({
  form: 'CreatePermissionForm',
  initialValues: data,
});

const withReducer = injectReducer({ key: 'permissions', reducer });

const withConnect = connect(
  mapStateToProps,
  { postPermission, onFormLoad, onFormUnLoad }
);

export default compose(
  withReducer,
  withreduxForm,
  withConnect
)(Form);
