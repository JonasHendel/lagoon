const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');

router.get('/', (req, res) => {
  const posts = Post.find().sort('createdAt');
  console.log(posts);
  res.json({ posts });
});

router.get('/:id', async (req, res) => {
  try {
    const posts = await Post.find({ course: req.params.id })
      .populate('author')
      .populate('files')
      .sort('-createdAt');
    res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post('/create', (req, res) => {
  console.log(req.body)
  try {
    const newPost = new Post({
      type: req.body.type,
      course: req.body.course,
      text: req.body.text,
      files: req.body.files,
      author: req.body.author,
    });
    newPost.save();
    console.log(newPost);
    console.log('created post');
    res
      .status(200)
      .json({ message: 'Post created successfully!', post: newPost });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
