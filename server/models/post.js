// create post schema with course ref, title, content, date, author, tags

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  course: {
    type: ObjectId,
    ref: 'Course',
  },
  content: {
    type: String,
    required: true,
  },
  resources: {
    type: ObjectId,
    ref: 'Resource',
  },
  author: {
    type: ObjectId,
    ref: 'User',
  },
  tags: [
    {
      type: ObjectId,
      ref: 'Tag',
    },
  ],
  
},{ timestamps: true });

module.exports = mongoose.models.post || mongoose.model('Post', postSchema);
