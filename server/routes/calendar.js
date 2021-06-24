const express = require('express');
const router = express.Router();

let Lessons = require('../models/lesson');
let Courses = require('../models/course');
let Events = require('../models/event')

router.get('/', async (req, res) => {
	try {
		const lessons = await Lessons.find()
			.populate('course')

    const events = await Events.find()

		res.json({events, lessons});
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = router;
