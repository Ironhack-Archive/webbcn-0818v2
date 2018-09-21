'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const cohorts = require('../../data/cohorts');

const Cohort = require('../../models/cohort.js');
const User = require('../../models/user.js');

function updateCohortStudent (studentName, cohort, index) {
  return User.findOne({ name: studentName })
    .then((student) => {
      if (!student) {
        throw new Error('Unknown student ' + studentName);
      }
      cohort.students[index] = student._id;
    });
}

function updateCohortStudentIds (cohort) {
  const promisesOfUpdatingCohortStudentId = cohort.students.map((studentName, index) => updateCohortStudent(studentName, cohort, index));
  return Promise.all(promisesOfUpdatingCohortStudentId);
}

const options = {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
};
mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log('Connected to Mongo!');
    return Cohort.remove({});
  })
  .then(() => {
    const promisesOfUpdatingCohortStudents = cohorts.map((cohort) => updateCohortStudentIds(cohort));
    return Promise.all(promisesOfUpdatingCohortStudents);
  })
  .then(() => {
    console.log('Empty db');
    return Cohort.insertMany(cohorts);
  })
  .then((results) => {
    console.log('You have some cohorts', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
