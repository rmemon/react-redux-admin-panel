import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

import {connect} from 'react-redux';

import logo from '../../../assets/img/brand/logo.svg';
import sygnet from '../../../assets/img/brand/sygnet.svg';

import {LOGOUT} from '../../../constants/actionTypes';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class AdminHeader extends Component {
    render() {

        // eslint-disable-next-line
        const {appName, ...attributes} = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <AppNavbarBrand
                    full={{src: logo, width: 89, height: 25, alt: attributes.appName}}
                    minimized={{src: sygnet, width: 30, height: 30, alt: attributes.appName}}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg"/>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink tag={Link} to='/dashboard'>Dashboard</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink tag={Link} to='/access/user'>Users</NavLink>
                    </NavItem>
                    {/* <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem> */}
                </Nav>

                <Nav className="ml-auto" navbar>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img src={attributes.currentUser.picture} className="img-avatar"
                                 alt={attributes.currentUser.email}/>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem header tag="div"
                                          className="text-center"><strong> {attributes.currentUser.first_name} {' '} {this.props.currentUser.last_name}</strong></DropdownItem>
                            <DropdownItem onClick={attributes.onClickLogout}> Logout </DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}

AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({type: LOGOUT}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);