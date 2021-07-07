let mongoose = require('mongoose');

let lessonSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
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

module.exports =
  mongoose.models.lesson || mongoose.model('Lesson', lessonSchema);
