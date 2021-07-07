const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const validate = require('../utils/validate');
const {
  createAccessToken,
  createRefreshToken,
} = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/create', async (req, res) => {
  try {
    const { name, role, grade } = req.body;

    const newUser = new Users({
      name,
      role,
      grade,
      code: '1' + Math.random().toString(36).substr(2, 9),
    });
    await newUser.save();
    res.json({ success: 'User was created' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.patch('/register', async (req, res) => {
  const { email, password, cf_password, code } = req.body;

  const errMessage = validate(email, password, cf_password, code);

  if (errMessage) {
    console.error(errMessage);
    return res.status(400).json({ err: errMessage });
  }

  const checkCode = await Users.find({ code: code });

  if (checkCode.length <= 0) {
    return res
      .status(400)
      .json({ err: 'Code does not exist or has already been used.' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await Users.findOneAndUpdate(
    { code: code },
    {
      email,
      password: hashedPassword,
      code: '2' + Math.random().toString(36).substr(2, 9),
    }
  );
  res.status(200).json({ success: 'User was registered!' });
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: 'This email does not exists' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: 'Incorrect password.' });
    }

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: 'Logged in!',
      access_token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post('/accessToken', async (req, res) => {
  try {
    console.log('access token log');
    const { rf_token } = req.body;
    if (!rf_token) {
      return res.status(400).json({ err: 'Please login!' });
    }

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result) {
      return res
        .status(400)
        .json({ err: 'Your token is incorrect or has expired' });
    }

    const user = await Users.findById(result.id);
    if (!user) {
      return res.status(400).json({ err: 'User does not exist' });
    }

    const access_token = createAccessToken({ id: user._id });

    res.json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
