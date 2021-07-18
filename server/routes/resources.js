let express = require('express');
let router = express.Router();
const Folders = require('../models/folder');

router.get('/folders', async (req, res) => {
  try {
    let folders = await Folders.find({parent_id: null});
    res.json(folders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/folders/:id', async (req, res) => {
  const folderId = req.params.id;
  try {
    let folders = await Folders.find({parent_id: folderId});
    res.json(folders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/create', async (req, res) => {
  const newFolder = new Folders({
    title: req.body.title,
    parent_id: req.body.parent_id,
  });
  newFolder.save();
  res.send(newFolder);
});
module.exports = router;
