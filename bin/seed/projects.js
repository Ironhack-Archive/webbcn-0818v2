'use strict';

require('dotenv').config();

const dotenv = require('dotenv');
const result = dotenv.config();

const mongoose = require('mongoose');

const Project = require('../../models/project');
const projects = require('../../data/projects');
const User = require('../../models/user');

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

function updateProjectStudentName (students, project, index) {
  return User.findOne({ name: students })
    .then((student) => {
      if (!student) {
        throw new Error('Unknown student ' + students);
      }
      project.students[index] = student._id;
    });
}

function updateProjectStudentNameIds (project) {
  const promisesOfUpdatingProjectStudentId = project.students.map((students, index) => updateProjectStudentName(students, project, index));
  return Promise.all(promisesOfUpdatingProjectStudentId);
}

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return Project.remove({});
  })
  .then(() => {
    const promisesOfUpdatingProjectStudents = projects.map((project) => updateProjectStudentNameIds(project));
    return Promise.all(promisesOfUpdatingProjectStudents);
  })
  .then(() => {
    return Project.insertMany(projects);
  })
  .then((result) => {
    console.log('successfully added to database', result);
    mongoose.connection.close();
  })

  .catch((error) => {
    console.log('there has been an error', error);
  });
