import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import agent from '../../../../agent';
import { USER_PAGE_LOADED, USER_PAGE_UNLOADED } from '../../../../constants/actionTypes'

class Create extends Component {
  constructor(props) {
    super(props)
  }  
  render() {
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <h5><i className="fa fa-user"></i> Users Create</h5>
              </CardHeader>              
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.user,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: USER_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: USER_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);