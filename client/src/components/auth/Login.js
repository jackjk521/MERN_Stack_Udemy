import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const changeHandler = async (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login( email, password );
  };

// Redirect if logged in
if(isAuthenticated) {
    return < Navigate to='/dashboard' />
}

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Sign In</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Sign Into your Account
        </p>
        <form class="form" onSubmit={onSubmit}>
          <div class="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={changeHandler}
              required
            />
            <small class="form-text">
              This site uses Gravatar so if you want a
              profile image, use a Gravatar email
            </small>
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={changeHandler}
              minLength="6"
            />
          </div>
          <input
            type="submit"
            class="btn btn-primary"
            value="Login"
          />
        </form>
        <p class="my-1">
          Don't have an account?{" "}
          <Link to="/register">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    // auth: state.auth // to get all the initState
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
