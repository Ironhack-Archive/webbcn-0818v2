'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const cohortSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  students: [{
    type: ObjectId,
    ref: 'User'
  }]
});

const Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
