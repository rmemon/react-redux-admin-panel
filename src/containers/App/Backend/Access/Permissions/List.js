import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
} from 'reactstrap';

import {
  onUnloadAction,
  onClickDeleteAction,
  onLoadAction,
  onLoadRequestAction,
} from './actions';

import reducer from './reducer';
import injectReducer from 'utils/injectReducer';

const MySwal = withReactContent(Swal);

const title = 'Want To Delete ?';
const content =
  'This Permission will be deleted permanently and cannot be undone';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      sorted: [],
      page: 0,
    };
    this.loadPermissionData();

    this.toggle = this.toggle.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnloadAction();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
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
    }).then(result => {
      if (result.value) {
        this.props.onClickDeleteAction(userId);
      }
    });
  }

  fetchData(state) {
    this.setState({ page: state }, this.loadPermissionData);
  }

  sortedChange(sorted) {
    this.setState({ sorted: sorted, page: 0 }, this.loadPermissionData);
  }

  loadPermissionData() {
    this.props.onLoadRequestAction();

    const props = {
      page: this.state.page || 0,
      orderBy: '',
      sortBy: '',
    };

    if (this.state.sorted.length > 0) {
      props.sortBy = this.state.sorted[0].id;
      props.orderBy = this.state.sorted[0].desc ? 'DESC' : 'ASC';
    }

    this.props.onLoadAction(props);
  }

  render() {
    const { permissions, inProgress, meta } = this.props;

    if (!permissions) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h5>
                  <i className="fa fa-user" /> Permissions Lists
                </h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6">
                    <form
                      action=""
                      method="post"
                      className="form-horizontal invisible"
                    >
                      <div className="form-group row">
                        <div className="col-md-12">
                          <div className="input-group">
                            <span className="input-group-prepend">
                              <button type="button" className="btn btn-primary">
                                <i className="fa fa-search" /> Search
                              </button>
                            </span>
                            <input type="text" className="form-control" />
                            <span className="input-group-append">
                              <button type="button" className="btn btn-primary">
                                <i className="fa fa-remove" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Col>
                  <Col md="6">
                    <ButtonGroup className="btn-group float-sm-right">
                      <ButtonDropdown
                        direction="down"
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle caret color="danger">
                          Action
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            tag={Link}
                            to="/access/permission/create"
                          >
                            <i className="fa fa-user-plus" />Create Permission
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
                  data={permissions}
                  noDataText="No Data to Display"
                  minRows={0}
                  columns={[
                    {
                      Header: 'Permission',
                      accessor: 'name',
                      className: 'text-left',
                    },
                    {
                      Header: 'Display Name',
                      accessor: 'display_name',
                    },
                    {
                      Header: 'Sort',
                      accessor: 'sort',
                    },
                    {
                      Header: 'Actions',
                      accessor: 'id',
                      Cell: row => (
                        <span>
                          <Button
                            block={false}
                            tag={Link}
                            to={`/access/permission/view/${row.value}`}
                            outline
                            color="primary"
                            size="sm"
                          >
                            <i className="fa fa-eye" />
                          </Button>
                          &nbsp;
                          <Button
                            tag={Link}
                            to={`/access/permission/update/${row.value}`}
                            block={false}
                            outline
                            color="success"
                            size="sm"
                          >
                            <i className="fa fa-edit" />
                          </Button>
                          &nbsp;
                          <Button
                            onClick={() => this.onClickDelete(row.value)}
                            block={false}
                            outline
                            color="danger"
                            size="sm"
                          >
                            <i className="fa fa-trash" />
                          </Button>
                        </span>
                      ),
                      sortable: false,
                    },
                  ]}
                  defaultPageSize={25}
                  showPageSizeOptions={false}
                  pages={meta.last_page}
                  manual
                  loading={inProgress}
                  className="-striped -highlight"
                  onPageChange={this.fetchData}
                  sorted={this.state.sorted}
                  onSortedChange={sort => this.sortedChange(sort)}
                  multiSort={false}
                />
              </CardBody>
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
  {
    onUnloadAction,
    onClickDeleteAction,
    onLoadAction,
    onLoadRequestAction,
  }
);

export default compose(
  withReducer,
  withConnect
)(List);
