import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../action";
import { reduxForm, Field } from "redux-form";

class Register extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = formProps => {
    formProps.is_term_accept = 1;
    this.props.signup(formProps, () => {
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
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <fieldset className="form-group">
                  <Field
                      className="form-control form-control-lg"
                      name="first_name"
                      type="text"
                      component="input"
                      autoComplete="none"
                      placeholder="First Name"
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                  <Field
                      className="form-control form-control-lg"
                      name="last_name"
                      type="text"
                      component="input"
                      autoComplete="none"
                      placeholder="Last Name"
                      required
                    />
                  </fieldset>

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
                      placeholder="Password"
                      required
                    />
                  </fieldset>

                  <fieldset className="form-group">
                  <Field
                      className="form-control form-control-lg"
                      name="password_confirmation"
                      type="password"
                      component="input"
                      autoComplete="none"
                      placeholder="Password Confirmation"
                      required
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
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

export default compose(
  connect(
  mapStateToProps,
  actions),
  reduxForm({ form: "sinup" })
)(Register);
