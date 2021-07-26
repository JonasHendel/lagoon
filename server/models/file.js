const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const FileSchema = new Schema({
  title: { type: String, required: true },
  url: {
    type: String,
    required: true,
  },
  course: { type: ObjectId, ref: 'Course' },
  parent_id: { type: String, default: 'root' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.models.file || mongoose.model('File', FileSchema);
