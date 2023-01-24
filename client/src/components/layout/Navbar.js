import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import "../../style.css";

// React icons
import { BiLogOut } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
            Developers <MdOutlineDashboard />
        </Link>
        <Link to="/posts">
            Posts <MdOutlineDashboard />
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <span className="hide-sm">
            Dashboard <MdOutlineDashboard />
          </span>
        </Link>
        <a onClick={logout} href="#!">
          <span className="hide-sm">
            Logout <BiLogOut />
          </span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
