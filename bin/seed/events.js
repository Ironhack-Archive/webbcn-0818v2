'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const events = require('../../data/events.js');
const Event = require('../../models/events.js');
const Attendee = require('../../models/user.js');

function updateAttendee (attendee, event, index) {
  return Attendee.findOne({ name: attendee })
    .then((result) => {
      if (!result) {
        throw new Error('Unknown result ' + attendee);
      }
      event.attendees[index] = result._id;
    });
}

function updateAttendeeId (event) {
  const promisesOfUpdatingEventAttendeeId = event.attendees.map((attendee, index) => updateAttendee(attendee, event, index));
  return Promise.all(promisesOfUpdatingEventAttendeeId);
}

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    console.log('Connected to Mongo!');
    return Event.remove({});
  })
  .then(() => {
    const promisesOfUpdatingEventAttendee = events.map((event) => updateAttendeeId(event));
    return Promise.all(promisesOfUpdatingEventAttendee);
  })
  .then(() => {
    // user1 = users.find();
    console.log('Empty db');
    return Event.insertMany(events);
  })
  .then((results) => {
    console.log('You have some events', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
