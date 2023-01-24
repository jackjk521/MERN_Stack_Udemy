import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const privateRoute = ({
  auth: { isAuthenticated, loading },
  children,
}) => {
  return !isAuthenticated && !loading ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

privateRoute.propTypes = {
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(privateRoute);
