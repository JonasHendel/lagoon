const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

router.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.post('/create', (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      course: req.body.course,
      content: req.body.content,
      resources: req.body.resources,
      author: req.body.author,
    });
    newPost.save();
    res
      .status(200)
      .json({ message: 'Post created successfully!', post: newPost });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
