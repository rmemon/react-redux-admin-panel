import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Register extends Component {
    constructor() {
      super();
      this.submitForm = (email, password) => ev => {        
        ev.preventDefault();        
      };
      this.submitForm = (username, email, password) => ev => {
        ev.preventDefault();       
      }
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const username = this.props.username;
    
        return (
          <div className="auth-page">
            <div className="container page">
              <div className="row">
    
                <div className="col-md-12 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Sign Up</h1>
                  <p className="text-xs-center">
                    <Link to="/login">
                      Have an account?
                    </Link>
                  </p>
                      
                  <form onSubmit={this.submitForm(username, email, password)}>
                    <fieldset>
    
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Username"
                          value={this.props.username}
                          onChange={this.changeUsername} />
                      </fieldset>
    
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          placeholder="Email"
                          value={this.props.email}
                          onChange={this.changeEmail} />
                      </fieldset>
    
                      <fieldset className="form-group">
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                          value={this.props.password}
                          onChange={this.changePassword} />
                      </fieldset>
    
                      <button
                        className="btn btn-lg pull-xs-right"
                        type="submit"
                        disabled={this.props.inProgress}>
                        Sign up
                      </button>
    
                    </fieldset>
                  </form>
                </div>
    
              </div>
            </div>
          </div>
        );
    }    
}

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
    // onChangeEmail: value =>
    //   dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    // onChangePassword: value =>
    //   dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    // onSubmit: (email, password) =>
    //   dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
    // onUnload: () =>
    //   dispatch({ type: LOGIN_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
