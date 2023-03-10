import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    facebook,
    instagram,
    twitter,
    linkedin,
    youtube,
    user: { userName, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{userName}</h1>
      <p className="lead">
        {status} at {company}{" "}
      </p>
      <p>{location}</p>
      <div className="icons my-1">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
            website
          </a>
        )}

        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
            twitter
          </a>
        )}
        {facebook && (
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {youtube && (
          <a
            href={youtube}
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {twitter && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {};

export default ProfileTop;
