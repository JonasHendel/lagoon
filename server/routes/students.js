
const express = require('express');
const router = express.Router();
const moment = require('moment');

let Users = require('../models/user');

router.get('/all', async (req, res) => {
  try {
    const users = await Users.find()

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
