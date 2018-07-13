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
    const { permission } = this.props;
    const { errors } = this.props;

    console.log(this.props);

    if (errors) {
      this.props.history.push('/access/permission');
      return null;
    }

    if (!permission) {
      return null;
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-user" /> View Permission
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="8">
                    <FormGroup row>
                      <Label
                        className="col-md-3 col-form-label"
                        htmlFor="text-input"
                      >
                        <strong>Name: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {permission.name}
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
                        <strong>Display Name: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {permission.display_name}
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
                        <strong>Sort: </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        {permission.sort}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  tag={Link}
                  to={`/access/permission`}
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
  ...state.permissions,
});

const withReducer = injectReducer({ key: 'permissions', reducer });

const withConnect = connect(
  mapStateToProps,
  { onViewPageLoad, onViewUnload },
);

export default compose(
  withReducer,
  withConnect,
)(View);
