let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
	// class: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Class',
	// 	required: true,
	// },
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
		ref: 'User',
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

module.exports = mongoose.models.event || mongoose.model('Event', eventSchema);


