import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const CommentItem = ({
  deleteComment,
  comment: {
    comment_id,
    text,
    name,
    avatar,
    user_id,
    date,
  },
  postId,
  auth,
}) => {
  return (
    <Fragment>
      <div>
        <Link to={`/profile/${user_id}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
            width={50}
            height={50}
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on{" "}
          <Moment formant="YYYY/MM/DD">{date}</Moment>{" "}
        </p>

        {!auth.loading && user_id === auth.user.id && (
          <button
            type="button"
            class="btn btn-danger"
            onClick={() =>
              deleteComment(postId, comment_id)
            }>
            <i class="fas fa-times"></i>
            <p> Delete </p>
          </button>
        )}
      </div>
    </Fragment>
  );
};
CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};
const mapToStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapToStateProps, { deleteComment })(
  CommentItem
);
