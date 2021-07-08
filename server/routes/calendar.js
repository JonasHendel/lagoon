const express = require('express');
const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');
let Lessons = require('../models/lesson');
let Courses = require('../models/course');
let Events = require('../models/event');

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const lessons = await Lessons.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      {
        $match: {
          'course.students': mongoose.Types.ObjectId(
            '60e357c0003c4c8bfd68d352'
          ),
        },
      },
    ]);

    // const lessons = await Lessons.find().populate('course');

    const events = await Events.find();

    res.json({ events, lessons });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const events = Events.find();
    const {
      name,
      startTimeUnformatted,
      endTime,
      eventType,
      teacher,
      location,
    } = req.body;

    events.map((event) => {
      if (
        moment(event.startTime).isBetween(startTime, endTime, undefined, '[]')
      ) {
        console.log('times are overlapping');
        return null;
      }
    });

    const newEvent = new Events({
      name,
      startTime: startTimeUnformatted,
      endTime,
      eventType,
      teacher,
      location,
    });

    await newEvent.save();

    res.json({ msg: 'Success! Event was created.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
