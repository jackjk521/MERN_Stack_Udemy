import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getCurrentProfile,
  delAccount,
} from "../../actions/profile";
import { TbHeartHandshake } from "react-icons/tb";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  delAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <TbHeartHandshake /> Welcome {user && user.userName}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience
            experience={profile.user.experiences}
          />
          <Education education={profile.user.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => delAccount()}>
              {" "}
              Delete Account{" "}
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            {" "}
            You have not yet setup a profile, please add
            some info{" "}
          </p>
          <Link to="/create-profile">
            {" "}
            Create a Profile here{" "}
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};
Dashboard.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  delAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  delAccount,
})(Dashboard);
