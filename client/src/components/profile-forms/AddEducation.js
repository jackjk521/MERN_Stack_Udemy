import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link } from "react-router-dom";

const AddEducation = ({addEducation}) => {
  const [formData, setFormData] = useState({
    school:'',
    degree:'',
    fieldofstudy:'',
    from:'',
    to:'',
    current:'',
    description:'',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    addEducation(formData)
  };
  const changeHandler = async (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const checkCurrent = async(e) => {
    setFormData({
        ...formData,
        current: !current })
    toggleDisabled(!toDateDisabled)
  }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study*" name="fieldofstudy"   value={fieldofstudy}
            onChange={changeHandler} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"    value={from}
            onChange={changeHandler} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={checkCurrent}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={changeHandler}
            disabled={toDateDisabled ? 'disabled': ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={changeHandler}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="/dashboard">Go Back</a>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(
  AddEducation
);
