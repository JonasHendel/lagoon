const mongoose = require('mongoose');
const database = require('./config/database');

mongoose.connect(database.connection, database.config);
let db = mongoose.connection;

db.once('open', function () {
	console.log('Connected to Lagoon DB');
});

db.on('error', function (err) {
	console.log(err);
});

let Lesson = require('./models/lesson.js');

let timetable = [
	[
		{
			subject: 'German',
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
];
let test = new Lesson({
	course: new mongoose.Types.ObjectId('60cfb754d2ea5ef6df535abb'),
	startTime: '8:00',
	endTime: '9:30',
	day: 1,
	location: 'P5',
});

test.save((err, doc) => {
	if (err) console.log(err);

	console.log('Saved Lesson:', doc._id);
});
