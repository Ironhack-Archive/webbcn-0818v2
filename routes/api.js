'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Event = require('../models/events');

const ObjectId = mongoose.Types.ObjectId;

router.get('/students', (req, res, next) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error('ERROR', req.method, req.path, err);
      res.status(500).json({ message: 'error-unexpected' });
    });
});

router.get('/username-unique', (req, res, next) => {
  const username = req.query.username;
  User.findOne({ username })
    .then((result) => {
      res.json({ unique: !result });
    })
    .catch((err) => {
      console.error('ERROR', req.method, req.path, err);
      res.status(500).json({ message: 'error-unexpected' });
    });
});

router.get('/events', (req, res, next) => {
  Event.find({})
    .then((results) => {
      res.json(results);
    });
});

router.get('/events/:id', (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return next();
  }
  Event.findOne({ _id: id })
    .then((result) => {
      if (!result) {
        return next();
      }
      res.json(result);
    });
});

module.exports = router;
