import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { userName, avatar },
    user_id,
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2> {userName} </h2>
        <p>
          {" "}
          {status} {company && <span> at {company}</span>}
        </p>
        <p> {location && <span>{location} </span>} </p>
        <Link
          to={`/profile/${user_id}`}
          className="btn btn-primary">
          View Profile
        </Link>
        <p> {skills} </p>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
