import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({ getPost, post: { post, loading } }) => {
  const { post_id } = useParams();
  useEffect(() => {
    getPost(post_id);
  }, [getPost]);
  return loading || post === null ? (
    <h4>Loading... {post_id} </h4>
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post.post_id} />
      <div className="comments">
        {post.comments.map((comm) => (
          <CommentItem
            key={comm.comment_id}
            comment={comm}
            postId={post.post_id}
          />
        ))}
      </div>
    </Fragment>
  );
};
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapToStateProps = (state) => ({
  post: state.post,
});
export default connect(mapToStateProps, { getPost })(Post);
