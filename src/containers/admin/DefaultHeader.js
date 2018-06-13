import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import { connect } from 'react-redux';

import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

import {
  LOGOUT
} from '../../constants/actionTypes';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: this.props.appName }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: this.props.appName }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto" navbar>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={this.props.currentUser.picture} className="img-avatar" alt={this.props.currentUser.email} />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong> {this.props.currentUser.first_name} {' '} {this.props.currentUser.last_name}</strong></DropdownItem>
              <DropdownItem onClick={this.props.onClickLogout} > Logout </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  // ...state.settings,
  // currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);