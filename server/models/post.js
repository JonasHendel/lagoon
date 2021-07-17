// create post schema with course ref, title, content, date, author, tags

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  course: {
    type: ObjectId,
    ref: 'Course',
  },
  content: { 
    type: String, 
    required: true 
  },
  resources: { 
    type: ObjectId, 
    ref: 'Resource' 
  },
  date: { 
    type: Date, 
    default: Date.now()
  },
  author: { 
    type: ObjectId, 
    ref: 'User' },
  tags: [{ 
    type: ObjectId, 
    ref: 'Tag' 
  }],
});

module.exports = mongoose.models.lesson || mongoose.model('Lesson', lessonSchema);