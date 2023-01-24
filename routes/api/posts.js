const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");
const {
  check,
  validationResult,
  body,
} = require("express-validator");
const { User } = require("../../models/User.model");
const { Post } = require("../../models/Post.model");
const { Like } = require("../../models/Like.model");
const { Comment } = require("../../models/Comment.model");
const { Op } = require("sequelize");

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  [
    auth,
    [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
      });

      const newPost = {
        text: req.body.text,
        name: user.userName,
        avatar: user.avatar,
        user_id: req.user.id,
      };

      const post = await Post.create(newPost);
      await post.save();

      res.json(post); // testing purposes
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/posts
// @desc Get All Posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [["date", "DESC"]],
      include: [Like, Comment],
    });

    return res.json(posts); // testing purposes
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/posts/:post_id
// @desc Get specific post id
// @access Private

router.get("/:post_id", async (req, res) => {
  try {
    const post = await Post.findOne({
      include: [Like, Comment],
      where: { post_id: req.params.post_id },
    });

    if (!post) {
      return res
        .status(400)
        .json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "Post not found" });
    }
  }
});

// @route DELETE api/posts/:post_id
// @desc Delete a post
// @access Private

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.post_id);

    //Check for user authorization
    if (post.user_id !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "User not authortized" });
    }

    // Remove post
    await post.destroy();
    res.json("Post deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "Profile not found" });
    }
  }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    // Check if the post has already been liked
    const likes = await Like.findOne({
      where: {
        [Op.and]: [
          { post_id: req.params.post_id },
          { user_id: req.user.id },
        ],
      },
    });
    if (likes) {
      return res
        .status(400)
        .json({ msg: "Post already liked" });
    } else {
      const like = await Like.create({
        post_id: req.params.post_id,
        user_id: req.user.id,
      });
      await like.save();
      return res.json(await Like.findAll({
        where: { post_id: req.params.post_id },
      }));
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/unlike/:id
// @desc Like a post
// @access Private

router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    // Check if the post has already been liked
    const likes = await Like.findOne({
      where: {
        [Op.and]: [
          { post_id: req.params.post_id },
          { user_id: req.user.id },
        ],
      },
    });
    if (likes) {
      await likes.destroy();
      res.json({ msg: "Unliked post" });
    } else {
      const like = await Like.create({
        post_id: req.params.post_id,
        user_id: req.user.id,
      });
      await like.save();
      res.json({ msg: "Liked post" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/posts/comment/:post_id
// @desc Comment on post
// @access Private
router.post(
  "/comment/:post_id",
  [
    auth,
    [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
      });
      const post = await Post.findByPk(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.userName,
        avatar: user.avatar,
        user_id: req.user.id,
        post_id: req.params.post_id,
      };

      if (post) {
        // i see a bug
        const comment = await Comment.create(newComment);
        await comment.save();
        res.json(comment); // testing purposes
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/posts/comment/:post_id
// @desc Delete a comment
// @access Private

router.delete(
  "/comment/:post_id/:comment_id",
  auth,
  async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.post_id);

      const comment = await Comment.findOne({
        where: {
          [Op.and]: [
            { post_id: req.params.post_id },
            { comment_id: req.params.comment_id },
            { user_id: req.user.id },
          ],
        },
      });
      //Check for user authorization
      if (!comment) {
        return res
          .status(400)
          .json({ msg: "Comment does not exist" });
      }

      // Remove post
      await comment.destroy();
      res.json("Comment deleted");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");

      if (err.kind == "ObjectId") {
        return res
          .status(400)
          .json({ msg: "Comment not found" });
      }
    }
  }
);

// @route GET api/posts/comment
// @desc Get All comments
// @access Private
router.get("/comments/all", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [["date", "DESC"]],
    });
    res.json(comments); // testing purposes
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
