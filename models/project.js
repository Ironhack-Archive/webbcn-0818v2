'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  students: [{
    type: ObjectId,
    ref: 'User'
  }],
  presentationURL: {
    type: String,
    required: true
  },
  projectURL: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
