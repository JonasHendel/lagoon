const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const database = require('./config/database');
const fs = require('fs');
var bodyParser = require('body-parser');

const app = express();

mongoose.connect(database.connection, database.config);
let db = mongoose.connection;

db.once('open', function () {
  console.log('Connected to Lagoon DB');
});

db.on('error', function (err) {
  console.log(err);
});

app.use(cors());

app.use(bodyParser.json());

fs.readdir('./routes/', (err, files) => {
  if (err) {
    console.log(err);
  }

  console.log(files)

  let routeFiles = files.filter((f) => f.split('.').pop() === 'js');

  console.log('Loading routes:');

  routeFiles.forEach((routeFile, index) => {
    let route = require(`./routes/${routeFile}`);
    app.use('/' + routeFile.replace('.js', ''), route);

    console.log(`\t${index + 1} / ${routeFiles.length}: Loaded ${routeFile}`);
  });
});

app.get('/', (req, res) => {
  res.json({ pog: true });
});

app.listen(8000, () => {
  console.log('Lagoon server online on port 8000');
});
