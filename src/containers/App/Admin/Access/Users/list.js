import React, {Component} from 'react';
import {connect} from 'react-redux';

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

import agent from '../../../../../agent'
import {USER_DELETE, USER_PAGE_LOADED, USER_PAGE_UNLOADED} from './constants';
import {Link} from 'react-router-dom';


import ReactTable from 'react-table';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import injectReducer from '../../../../../utils/injectReducer';
import reducer from './reducer';

const MySwal = withReactContent(Swal)

const title = 'Want To Delete ?';
const content = 'This User will be deleted permanently and cannot be undone';

class List extends Component {
    constructor(props) {
        super(props);
    

        this.state = {
            dropdownOpen: false,
            loading : false
        };
        this.props.onLoad(agent.User.list(this.state.page));

        this.toggle = this.toggle.bind(this);

        this.fetchData = this.fetchData.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onClickDelete(userId) {

        MySwal.fire({
            type: 'question',
            title: title,
            text: content,
            // confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            confirmButtonColor: '#4dbd74',
            cancelButtonColor: '#f64846',
            focusConfirm: true,
          }).then((result) =>
          {
              if(result.value)
              {
                  this.props.onClickDelete(Promise.all([
                      agent.User.del(userId)
                  ]).then(() => {
                      this.props.onLoad(agent.User.list());
                  }));
              }
          })

    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        this.props.onLoad(agent.User.list(state.page + 1));
        // });
    }
    render() {
        const {users, loading } = this.props;

        if (!users) {
            return null;
        }

        const noRecords = users ? users.data.length == 0 ? true : false: false;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <h5><i className="fa fa-user"></i> Users Lists</h5>
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
                                            <ButtonDropdown direction="down" isOpen={this.state.dropdownOpen}
                                                            toggle={this.toggle}>
                                                <DropdownToggle caret color="danger">
                                                    Action
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem tag={Link} to="/admin/access/user/create">
                                                        <i className="fa fa-user-plus"></i>Create User
                                                    </DropdownItem>
                                                    {/* <DropdownItem>
                            <i className="fa fa-trash"></i> Delete Selected
                            </DropdownItem> */}
                                                </DropdownMenu>
                                            </ButtonDropdown>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <ReactTable
                                data={users.data}
                                noDataText="No Data to Display"
                                minRows = {0}
                                columns={
                                    [
                                        {
                                            Header: 'First Name',
                                            accessor: 'first_name',
                                            className: 'text-left'
                                        },
                                        {
                                            Header: 'Last Name',
                                            accessor: 'last_name',
                                        },
                                        {
                                            Header: 'Email',
                                            accessor: 'email',
                                        },
                                        {
                                            Header: 'Role',
                                            accessor: 'role',
                                        },
                                        {
                                            Header: 'Status',
                                            accessor: 'status',
                                            Cell: row => (
                                                <Badge
                                                color={row.value === 1 ? 'success' : 'danger'}>{row.value === 1 ? 'Active' : 'InActive'}</Badge>
                                            )
                                        },
                                        {
                                            Header: 'Created On',
                                            accessor: 'registered_at',
                                            Cell: row => (
                                                <span>
                                                    {new Date(row.value).toLocaleString('en-US')}
                                                </span>
                                            )
                                        },
                                        {
                                            Header: 'Actions',
                                            accessor: 'id',
                                            Cell: row => (
                                                <span>
                                                    <Button block={false} tag={Link}
                                                    to={`/admin/access/user/view/${row.value}`} outline
                                                    color="primary" size="sm">
                                                    <i className="fa fa-eye"></i>
                                                    </Button>
                                                    &nbsp;
                                                    <Button tag={Link} to={`/admin/access/user/update/${row.value}`}
                                                            block={false} outline color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>
                                                    &nbsp;
                                                    <Button onClick={() => this.onClickDelete(row.value)}
                                                     block={false}
                                                            outline color="danger" size="sm">
                                                        <i className="fa fa-trash"></i>
                                                    </Button>
                                                </span>
                                            )
                                        },
                                    ]}
                                defaultPageSize={25}
                                showPageSizeOptions={false}
                                pages={users.meta.last_page}
                                manual
                                loading={loading}
                                // onFetchData={this.fetchData}
                                className="-striped -highlight"
                                />
                            </CardBody>
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
    {
        console.log("before");
        dispatch({type: USER_PAGE_LOADED, payload})
    },
    onClickDelete: payload =>
        dispatch({type: USER_DELETE, payload}),
    onUnload: () =>
        dispatch({type: USER_PAGE_UNLOADED})
});

const withReducer = injectReducer({ key: 'users', reducer });

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(    
    withReducer,    
    withConnect,    
  )(List);  

// export default connect(mapStateToProps, mapDispatchToProps)(List);