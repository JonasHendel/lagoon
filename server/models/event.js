let mongoose = require('mongoose');

let classSchema = mongoose.Schema({
	class: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'class',
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
	location: {
		type: String,
		required: true,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	eventType: {
		type: String,
		required: true,
	},
	eventName: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model('Event', classSchema);
