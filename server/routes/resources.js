let express = require('express');
let router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Files = require('../models/file');
const Folders = require('../models/folder');
const Posts = require('../models/post');

// get root folders
router.get('/:id', async (req, res) => {
  const courseId = req.params.id;
  try {
    let folders = await Folders.find({ course: courseId });
    let files = await Files.find({ course: courseId });
    res.json({ folders, files });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// create folder
router.post('/folder/create', async (req, res) => {
  console.log('create folder');
  const newFolder = new Folders({
    title: req.body.title,
    course: req.body.course,
    parent_id: req.body.parent_id,
    path: req.body.path,
  });

  // Folder.findOneAndUpdate(req.body.parent_id, { $push: { folders: newFolder._id }})
  console.log(newFolder);
  newFolder.save();
  res.send(newFolder);
});

// upload file
router.post('/file/upload/:id', async (req, res) => {
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  });

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'lagoon',
      acl: 'public-read',
      key: (req, file, cb) => {
        cb(null, file.originalname);
      },
      contentType: (req, file, cb) => {
        cb(null, file.mimetype);
      },
    }),
  }).single('file');

  upload(req, res, (error) => {
    if (error) {
      return res.status(500).json({ err: error.message });
    }
    return res.json(req.file);
  });
});

router.post('/create/file/post', async (req, res) => {
  const { post, file } = req.body;
  console.log('file', file);
  console.log('post', post);

  const newFile = await new Files({
    title: file.title,
    url: file.url,
    course: file.course,
    parent_id: file.parent_id,
    path: file.path,
  });

  const newPostTemp = await new Posts({
    type: post.type,
    course: post.course,
    text: post.text,
    files: newFile._id,
    author: post.author,
  });
  newFile.save();
  await newPostTemp.save();

  const newPost = await Posts.findById(newPostTemp._id)
    .populate('author')
    .populate('files')
    .sort('-createdAt');

  res.send({ newFile, newPost });
});

router.get('/file', async (req, res) => {
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  });

  const url = s3.getSignedUrl('getObject', {
    Bucket: 'lagoon',
    Key: 'Screenshot 2021-04-09 at 09.24.01.png',
    Expires: 9999999999,
  });
  res.send(url);
});

router.delete('/file/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Files.findByIdAndDelete(id);
    await Posts.findOneAndDelete({ files: id });
    res.json({ msg: 'File deleted' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete('/folder/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const childFolders = await Folders.find({ parent_id: id });
    const childFiles = await Files.find({ parent_id: id });
    console.log('childFolders', childFolders);
    console.log('childFiles', childFiles);

    if (childFolders || childFiles) {
      return res.json({ err: 'Files and or subfolders exist in this folder' });
    }

    // await Folders.findByIdAndDelete(id);

    res.json({ msg: 'File deleted' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
