let mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
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
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // resources: {
  // ref bla blab blac
  // }
});

module.exports = mongoose.models.event || mongoose.model('Event', eventSchema);
