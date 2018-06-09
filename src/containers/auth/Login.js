import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../action";
import { reduxForm, Field } from "redux-form";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(this.props.signout());
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push("/");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-12 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
                <Link to="/home">Home</Link>
              </p>

              <div>{this.props.errorMessage}</div>

              {/* <ListErrors errors={this.props.errors} /> */}
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <Field
                      className="form-control form-control-lg"
                      name="email"
                      type="email"
                      component="input"
                      autoComplete="none"
                      placeholder="Email"
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <Field
                      className="form-control form-control-lg"
                      name="password"
                      type="password"
                      component="input"
                      autoComplete="none"
                      placeholder="Pass"
                      required
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Sign in
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

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Login);
