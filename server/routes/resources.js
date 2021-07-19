let express = require('express');
let router = express.Router();
const Folders = require('../models/folder');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// get root folders
router.get('/folders', async (req, res) => {
  try {
    let folders = await Folders.find({ parent_id: null });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// get subfoders
router.get('/folders/:id', async (req, res) => {
  const folderId = req.params.id;
  try {
    let folders = await Folders.find({ parent_id: folderId });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// create folder
router.post('folder/create', async (req, res) => {
  const newFolder = new Folders({
    title: req.body.title,
    parent_id: req.body.parent_id,
  });
  newFolder.save();
  res.send(newFolder);
});
module.exports = router;


// upload file
router.post('/file/upload', async (req, res) => {
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  });

  console.log(req.body);

  var params = {
    Bucket: 'lagoon',
    Key: req.body.file,
    Body: req.body.file,
    ACL: 'public-read',
    Metadata: {
      'x-amz-meta-my-key': req.body.file,
    },
  };

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log('works', data);
    }
  });
});
