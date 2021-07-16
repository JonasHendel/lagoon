const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Courses = require('../models/course');

router.get('/', async (req, res) => {
  const { courseId } = req.query;
  try {
    if (courseId) {
      const course = await Courses.findById(courseId);
      res.status(200).json(course);
    } else {
      const courses = await Courses.find();
      res.status(200).json(courses);
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
