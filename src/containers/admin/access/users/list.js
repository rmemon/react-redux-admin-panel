import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {
  ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Button, ButtonGroup
} from 'reactstrap';
import agent from '../../../../agent';
import { USER_PAGE_LOADED, USER_PAGE_UNLOADED } from '../../../../constants/actionTypes'
import { Link } from 'react-router-dom';

class List extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  componentWillMount() {
    this.props.onLoad(agent.User.list());
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {    
    const { users } = this.props;
    if (!users) {
      return null;
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h5><i className="fa fa-user"></i> Users List</h5>
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
                            <input type="text" className="form-control" />
                            <span className="input-group-append">
                              <button type="button" className="btn btn-primary" >
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
                      <ButtonDropdown direction="down"  isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                        <DropdownToggle caret color="danger">
                          Action
                          </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag={Link} to="/access/user/create">
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
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map(user => {
                        return (
                          <tr
                            key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td> <Badge color={user.status === 1 ? 'success' : 'danger'}>{user.status === 1 ? 'Active' : 'InActive'}</Badge></td>
                            <td>{(new Date(user.registered_at)).toLocaleString('en-US')}</td>
                            <td>
                              <Button block={false} tag={Link} to={`/access/user/view/${user.id}`} outline color="primary" size="sm">                                
                                  <i className="fa fa-eye"></i>                                
                              </Button>
                              &nbsp;
                              <Button tag={Link} to={`/access/user/update/${user.id}`} block={false} outline color="success" size="sm">
                                <i className="fa fa-edit"></i>
                              </Button>
                              &nbsp;
                              <Button block={false} outline color="danger" size="sm">
                                <i className="fa fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    }
                    {/* <tr>
                      <td>Yiorgos Avraamu</td>
                      <td>2012/01/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
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
    dispatch({ type: USER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: USER_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(List);