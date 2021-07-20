// create Folder model with title, files, parent_id and path
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const folderSchema = new Schema({
  title: { type: String, required: true },
  files: [{ type: ObjectId, ref: 'File' }],
  parent_id: { type: ObjectId, ref: 'Folder', default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.folder || mongoose.model('Folder', folderSchema);
