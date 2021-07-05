const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt')

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validate = (email, password, cf_password, code) => {
  if (!email || !password) {
    return 'Please add all fields';
  }

  if (!validateEmail(email)) {
    return 'Invalid email.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  if (password !== cf_password) {
    return 'Confirm password did not match';
  }
};

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
    console.error(errMessage)
    return res.status(400).json({ err: errMessage });
  }

  const checkCode = await Users.find({code: code});


  if(checkCode.length <= 0){
    return res.status(400).json({err: 'Code does not exist or has already been used.'})
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await Users.findOneAndUpdate(
    { code: code },
    {
      email,
      password: hashedPassword,
      code: '2' + Math.random().toString(36).substr(2, 9),
    }
  );
  res.status(200).json({success: 'User was registered!'})
});

module.exports = router;
