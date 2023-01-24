import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types"; // when dealing with props

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { userName, email, password, password2 } = formData;

  const changeHandler = async (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 3000); // danger here is called dynamically via css
    } else {
      register({
        userName,
        email,
        password,
      });
    }
  };

// Redirect if logged in
  if(isAuthenticated) {
    return < Navigate to='/dashboard' />
  }

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Sign Up</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Create Your Account
        </p>
        <form class="form" onSubmit={onSubmit}>
          <div class="form-group">
            <input
              type="text"
              placeholder="Name"
              name="userName"
              value={userName}
              onChange={changeHandler}
              //   required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={changeHandler}
              //   required
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
              // minLength="6"
              // required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={changeHandler}
              // minLength="6"
              // required
            />
          </div>
          <input
            type="submit"
            class="btn btn-primary"
            value="Register"
          />
        </form>
        <p class="my-1">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired, // shortcut ptfr
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  // auth: state.auth // to get all the initState
  isAuthenticated: state.auth.isAuthenticated
})

/* connect ( param1 = state to map,  object- with any action you wanna use  (accesible via props)) */
export default connect( mapStateToProps, {
  setAlert,
  register,
})(Register);
