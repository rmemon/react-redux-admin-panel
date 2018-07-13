import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { onViewPageLoad, onViewUnload } from './actions';

class View extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onViewPageLoad(id);
  }

  componentWillUnmount() {
    this.props.onViewUnload();
  }

  render() {
    const { user } = this.props;
    const { errors } = this.props;

    if (errors) {
      this.props.history.push('/access/user');
      return null;
    }

    if (!user) {
      return null;
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-user" /> View User
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>First Name: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {user.first_name}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Last Name: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {user.last_name}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Email: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {user.email}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Role: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {user.role}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Status: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        <Badge color={user.status === 1 ? 'success' : 'danger'}>
                          {user.status === 1 ? 'Active' : 'InActive'}
                        </Badge>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Confirmed: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        <Badge
                          color={user.confirmed === 1 ? 'success' : 'danger'}
                        >
                          {user.confirmed === 1 ? 'Yes' : 'No'}
                        </Badge>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Created On: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {new Date(user.created_at).toMediumDate()}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Updated On: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {new Date(user.updated_at).toMediumDate()}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  tag={Link}
                  to={`/access/user`}
                  className="btn btn-outline-danger"
                >
                  <i className="fa fa-arrow-left" /> Go Back
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.users,
});

const withReducer = injectReducer({ key: 'users', reducer });

const withConnect = connect(
  mapStateToProps,
  { onViewPageLoad, onViewUnload },
);

export default compose(
  withReducer,
  withConnect,
)(View);
