import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
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
  Row
} from "reactstrap";
import { Link } from "react-router-dom";

import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import { onViewPageLoad, onViewUnload } from "./actions";

class View extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onViewPageLoad(id);
  }

  componentWillUnmount() {
    this.props.onViewUnload();
  }

  render() {
    const { role } = this.props;
    const { errors } = this.props;

    if (errors) {
      this.props.history.push("/access/role");
      return null;
    }

    if (!role) {
      return null;
    }

    const permissions = role.permissions.constructor == Array
        ? role.permissions.join('<br/>')
        : role.permissions;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-user" /> View Role
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
                        {role.name}
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
                        <strong>Associated Permissions </strong>
                      </Label>
                      <Col xs="6" md="6" className="centered-checkbox">
                        <div dangerouslySetInnerHTML={{__html: permissions}} />
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
                        {role.sort}
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
                        {new Date(role.created_at).toLocaleString("en-US")}
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
                        {new Date(role.updated_at).toLocaleString("en-US")}
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  tag={Link}
                  to={`/access/role`}
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
  ...state.roles
});

const withReducer = injectReducer({ key: "roles", reducer });

const withConnect = connect(
  mapStateToProps,
  { onViewPageLoad, onViewUnload }
);

export default compose(
  withReducer,
  withConnect
)(View);
