import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
const Posts = ({
  getAllPosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return loading ? (
    <h4>Loading</h4>
  ) : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">
        {" "}
        Welcome to the community{" "}
      </h1>
        <PostForm/>
      <div className="posts">
       {posts.map((post) => (
          <PostItem key={post.post_id} post={post} />
        ))} 
      </div>
    </Fragment>
  );
};
Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};
const mapToStateProps = (state) => ({
 
  post: state.post,
});
export default connect(mapToStateProps, { getAllPosts })(
  Posts
);
