let mongoose = require('mongoose');

let lessonsSchema = mongoose.Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'course',
		required: true,
	},
	startTime: {
		type: String,
		required: true,
	},
	endTime: {
		type: String,
		required: true,
	},
	day: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	week: {
		type: Number,
	},
});

module.exports = mongoose.model('Lesson', lessonsSchema);
