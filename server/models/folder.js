// create Folder model with title, files, parent_id and path
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const folderSchema = new Schema(
  {
    title: { type: String, required: true },
    course: { type: ObjectId, ref: 'Course' },
    path: [{ type: String, required: true }],
    files: [{ type: ObjectId, ref: 'File' }],
    folders: [{ type: ObjectId, ref: 'Folder' }],
    parent_id: { type: String, default: 'root' },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.folder || mongoose.model('Folder', folderSchema);
