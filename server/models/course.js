let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
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
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
});

module.exports =
  mongoose.models.course || mongoose.model('Course', courseSchema);
