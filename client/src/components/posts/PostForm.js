import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
const PostForm = ({ addPost, posts }) => {
  const [text, setText] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };
  return (
    <Fragment>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Create a Post </h3>
        </div>
        <form class="form my-1" onSubmit={onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Post here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required></textarea>
          <input
            type="submit"
            class="btn btn-dark my-1"
            value="Submit"
          />
        </form>
      </div>
    </Fragment>
  );
};
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
