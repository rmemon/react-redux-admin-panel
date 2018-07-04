import React, {Component} from 'react';
import {connect} from 'react-redux';
import roleAgent from './agent';
import {ROLE_DELETE, ROLE_PAGE_LOADED, ROLE_PAGE_UNLOADED} from './constants';

import { compose } from 'redux';

import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table
} from 'reactstrap';

import {Link} from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

class List extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        this.props.onLoad(roleAgent.list());
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const {roles} = this.props;
        if (!roles) {
            return null;
        }

        const noRecords = roles.length == 0 ? true : false;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <h5><i className="fa fa-tag"></i> Role Lists</h5>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <form action="" method="post" className="form-horizontal invisible">
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <div className="input-group">
                                                        <span className="input-group-prepend">
                                                            <button type="button" className="btn btn-primary">
                                                                <i className="fa fa-search"></i> Search
                                                            </button>
                                                        </span>
                                                        <input type="text" className="form-control"/>
                                                        <span className="input-group-append">
                                                            <button type="button" className="btn btn-primary">
                                                                <i className="fa fa-remove"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </Col>
                                    <Col md="6">
                                        <ButtonGroup className="btn-group float-sm-right">
                                            <ButtonDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                                <DropdownToggle caret color="danger">
                                                    Action
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem tag={Link} to="/access/user/create">
                                                        <i className="fa fa-user-plus"></i>Create User
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </ButtonDropdown>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Permissions</th>
                                            <th>Number of Users</th>
                                            <th>Sort</th>
                                            <th>Status</th>
                                            <th>Created On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            roles.map(role => {

                                                const permissions = role.permissions.constructor == Array ? role.permissions.join('<br/>') : role.permissions;
                                                return (
                                                    <tr
                                                        key={role.id}>
                                                        <td>{role.name}</td>
                                                        <td dangerouslySetInnerHTML = {{__html:permissions }} />
                                                        <td>{role.number_of_users}</td>
                                                        <td>{role.sort}</td>
                                                        <td>
                                                            <Badge color={role.status === 1 ? 'success' : 'danger'}>
                                                                {role.status === 1 ? 'Active' : 'InActive'}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            {(new Date(role.registered_at)).toLocaleString('en-US')}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        {noRecords &&
                                        <tr>
                                            <td colSpan='7'>
                                                No Data to Display
                                            </td>
                                        </tr>
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
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
    onLoad: payload =>
        dispatch({type: ROLE_PAGE_LOADED, payload}),
    onClickDelete: payload =>
        dispatch({type: ROLE_DELETE, payload}),
    onUnload: () =>
        dispatch({type: ROLE_PAGE_UNLOADED})
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);


const withReducer = injectReducer({ key: 'roles', reducer });

export default compose(
    withReducer,
    withConnect,
  )(List);