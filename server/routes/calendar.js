const express = require('express');
const router = express.Router();

let Lessons = require('../models/lesson');
let Courses = require('../models/course');

router.get('/', async (req, res) => {
	try {
		const lessons = await Lessons.find({})
			.populate('course')

		res.json(lessons);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

module.exports = router;
