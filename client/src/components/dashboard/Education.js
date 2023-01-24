import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { delEducation } from "../../actions/profile";

const Education = ({ education, delEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu.edu_id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD"> {edu.from} </Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD"> {edu.to} </Moment>
        )}
      </td>
      <td>
        {" "}
        <button
          className="btn btn-danger"
          onClick={() => delEducation(edu.edu_id)}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  delEducation: PropTypes.func.isRequired,
};

export default connect(null, { delEducation })(Education);
