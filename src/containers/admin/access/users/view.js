import React, {Component} from 'react';
import {connect} from 'react-redux';
import agent from '../../../../agent';
import {USER_VIEW_PAGE_LOADED, USER_VIEW_PAGE_UNLOADED} from '../../../../constants/actionTypes'

import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Label, Row} from 'reactstrap';
import {Link} from 'react-router-dom';

class View extends Component {
    componentWillMount() {
        const {id} = this.props.match.params
        this.props.onLoad(agent.User.get(id));
    }

    render() {
        const {user} = this.props;
        const {errors} = this.props;

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
                                <i className="fa fa-user"></i> View User
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>First Name: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                {user.first_name}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Last Name: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                {user.last_name}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Email: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                {user.email}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Role: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                {user.role}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Status: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                <Badge
                                                    color={user.status === 1 ? 'success' : 'danger'}>{user.status === 1 ? 'Active' : 'InActive'}</Badge>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Confirmed: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                <Badge
                                                    color={user.confirmed === 1 ? 'success' : 'danger'}>{user.confirmed === 1 ? 'Yes' : 'No'}</Badge>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Created On: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                {(new Date(user.registered_at)).toLocaleString('en-US')}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8">
                                        <FormGroup row>
                                            <Label className="col-md-3 col-form-label" htmlFor="text-input">
                                                <strong>Updated On: </strong> </Label>
                                            <Col xs="6" md="6" className='centered-checkbox'>
                                                {(new Date(user.last_updated_at)).toLocaleString('en-US')}
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button tag={Link} to={`/access/user`} className='btn btn-outline-danger'> <i
                                    className="fa fa-arrow-left"></i> Go Back </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.users,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({type: USER_VIEW_PAGE_LOADED, payload}),
    onUnload: () =>
        dispatch({type: USER_VIEW_PAGE_UNLOADED})
});

export default connect(mapStateToProps, mapDispatchToProps)(View);