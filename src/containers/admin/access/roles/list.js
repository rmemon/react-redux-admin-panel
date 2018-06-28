import React, {Component} from 'react';
import {connect} from 'react-redux';
import agent from '../../../../agent';
import {ROLE_DELETE, ROLE_PAGE_LOADED, ROLE_PAGE_UNLOADED} from '../../../../constants/actionTypes';

/*import {
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

import {Link} from 'react-router-dom';*/

class List extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {        
        this.props.onLoad(agent.Role.list());
    }    

    render() {
        const {roles} = this.props;           
        if (!roles) {
            console.log('error');  
            return null;
        }

        const noRecords = roles.length == 0 ? true : false;
        return (
            <div> Role List </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);