let mongoose = require('mongoose');

let courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	teacher: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});

module.exports =
	mongoose.models.course || mongoose.model('Course', courseSchema);
