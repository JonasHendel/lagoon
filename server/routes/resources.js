let express = require('express');
let router = express.Router();
const Folders = require('../models/folder');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Files = require('../models/file');

// get root folders
router.get('/:id', async (req, res) => {
  const courseId = req.params.id;
  try {
    let folders = await Folders.find({course: courseId});
    let files = await Files.find({course: courseId});
    res.json({folders, files});
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// get subfoders
// router.get('/:id', async (req, res) => {
//   const folderId = req.params.id;
//   try {
//     let folders = await Folders.find({ parent_id: folderId });
//     let files = await Files.find({parent_id: folderId});
//     res.json({folders, files});
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });

// create folder
router.post('/folder/create', async (req, res) => {
  console.log('create folder');
  const newFolder = new Folders({
    title: req.body.title,
    course: req.body.course,
    parent_id: req.body.parent_id,
  });

  // Folder.findOneAndUpdate(req.body.parent_id, { $push: { folders: newFolder._id }})
 console.log(newFolder);
  newFolder.save();
  res.send(newFolder);
});
module.exports = router;

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
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  }).single('file');



  const {id} = req.params;

  console.log()

  upload(req, res, (error) => {
    if (error) {
      return res.status(500).json({ err: error.message });
    }

    const newFile = new Files({
      title: req.file.key,
      url: req.file.location,
      course: id.split(',')[0],
      parent_id: id.split(',')[1],
    });

    console.log(newFile);

    newFile.save();
  });
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
