// create post schema with course ref, title, content, date, author, tags

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema(
  {
    type: { 
      type: String, 
      default: 'text' 
    },
    course: {
      type: ObjectId,
      ref: 'Course',
      ref: 'User',
      required: true
    },
    text: {
      type: String,
    },
    files: {
      type: ObjectId,
      ref: 'File',
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.post || mongoose.model('Post', postSchema);
