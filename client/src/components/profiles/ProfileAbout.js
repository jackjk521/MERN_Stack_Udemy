import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { userName },
  },
}) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 class="text-primary">{userName} Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}

      <div class="line"></div>
      {/* should be an array to loop  */}
      <h2 class="text-primary">Skill Set</h2>
      <p> {skills} </p>
    </div>
  );
};

ProfileAbout.propTypes = {};

export default ProfileAbout;
