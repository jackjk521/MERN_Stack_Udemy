import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addLike,
  removeLike,
  deletePost,
} from "../../actions/post";
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    post_id,
    user_id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
  },
  showActions,
}) => {
  return (
    <Fragment>
      {" "}
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user_id}`}>
            <img class="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">
            Posted on{" "}
            <Moment formant="YYYY/MM/DD">{date}</Moment>{" "}
          </p>
          {showActions && (
            <Fragment>
              <button
                type="button"
                class="btn btn-light"
                onClick={(e) => addLike(post_id)}>
                <i class="fas fa-thumbs-up"></i>
                <p> Likes: </p>
                {
                  <span>
                    {" "}
                    {likes.length > 0 && (
                      <span>{likes.length}</span>
                    )}{" "}
                  </span>
                }
              </button>
              <button
                type="button"
                class="btn btn-light"
                onClick={(e) => removeLike(post_id)}>
                <i class="fas fa-thumbs-down"></i>
                <p> Dislikes: </p>
              </button>
              <Link
                to={`/post/${post_id}`}
                class="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span span class="comment-count">
                    {comments.length}
                  </span>
                )}
              </Link>
              {!auth.loading && user === auth.id && (
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => deletePost(post_id)}>
                  <i class="fas fa-times"></i>
                  <p> Delete </p>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapToStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapToStateProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
