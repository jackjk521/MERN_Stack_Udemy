import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "../profiles/ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
    console.log(id);
  }, [getProfileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {" "}
          <Link to="/profiles" className="btn btn-light">
            {" "}
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.id === profile.user_id && (
              <Link
                to="/edit-profile"
                className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white-2">
              <h2 className="text-primary"> Experience </h2>
              {profile.user.experiences.length > 0 ? (
                <Fragment>
                  {" "}
                  {profile.user.experiences.map((exp) => (
                    <ProfileExperience
                      key={exp.exp_id}
                      experience={exp}
                    />
                  ))}{" "}
                </Fragment>
              ) : (
                <h4> No Experience Credentials </h4>
              )}
            </div>
            <div className="profile-edu bg-white-2">
              <h2 className="text-primary"> Education </h2>
              {profile.user.education.length > 0 ? (
                <Fragment>
                  {" "}
                  {profile.user.education.map((edu) => (
                    <ProfileEducation
                      key={edu.edu_id}
                      education={edu}
                    />
                  ))}{" "}
                </Fragment>
              ) : (
                <h4> No Experience Credentials </h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub
                username={profile.githubusername}
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(
  Profile
);
