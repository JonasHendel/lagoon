const mongoose = require('mongoose');
const database = require('./../config/database');

mongoose.connect(database.connection, database.config);
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to Lagoon DB');
});

db.on('error', (err) => {
  console.log(err);
});

let Lesson = require('./../models/lesson.js');

let timetable = [
  [
    {
      subject: 'Deutsch',
      time: '8:00 - 9:30',
    },
    {
      subject: 'Englisch',
      time: '9:45 - 11:15',
    },
    {
      subject: 'Chemie',
      time: '11:55 - 13:25',
    },
    {
      subject: 'Mathe',
      time: '13:40 - 15:10',
    },
  ],
  [
    {
      subject: 'Mathe',
      time: '8:00 - 9:30',
    },
    {
      subject: 'Deutsch',
      time: '9:45 - 11:15',
    },
    {
      subject: 'Englisch',
      time: '13:40 - 15:10',
    },
  ],
  [
    {
      subject: 'Englisch',
      time: '8:00 - 9:30',
    },
    {
      subject: 'Physik',
      time: '9:45 - 11:15',
    },
    {
      subject: 'Französisch',
      time: '11:55 - 13:25',
    },
    {
      subject: 'Deutsch',
      time: '13:40 - 15:10',
    },
  ],
  [
    {
      subject: 'Französisch',
      time: '8:00 - 9:30',
    },
    {
      subject: 'Mathe',
      time: '9:45 - 11:15',
    },
    {
      subject: 'Chemie',
      time: '11:55 - 13:25',
    },
  ],
  [
    {
      subject: 'Physik',
      time: '8:00 - 9:30',
    },
    {
      subject: 'Ethik',
      time: '9:45 - 11:15',
    },
    {
      subject: 'Mathe',
      time: '13:40 - 15:10',
    },
  ],
];

let courses = {
  Mathe: '60cfb754d2ea5ef6df535abb',
  Deutsch: '60cfb7d6d2ea5ef6df535abc',
  Chemie: '60cfb806d2ea5ef6df535abd',
  Englisch: '60cfb819d2ea5ef6df535abe',
  Physik: '60cfb833d2ea5ef6df535abf',
  Französisch: '60cfb846d2ea5ef6df535ac0',
  Ethik: '60cfb866d2ea5ef6df535ac1',
};

timetable.forEach((day, index) => {
  let dayNum = index + 1;

  day.forEach((lesson) => {
    let lessonMongo = new Lesson({
      course: new mongoose.Types.ObjectId(courses[lesson.subject]),
      startTime: lesson.time.split(' - ')[0],
      endTime: lesson.time.split(' - ')[1],
      day: dayNum,
      location: 'P5',
    });

    lessonMongo.save((err, doc) => {
      if (err) console.log(err);
      console.log(`Created ${lesson.subject} lesson: _id: ${doc._id}`);
    });
  });
});
