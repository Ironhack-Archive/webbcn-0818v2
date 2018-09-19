'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');
const Cohort = require('../models/cohort');

/* GET auth/login page. */
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const messages = req.flash('login-error');
  const data = {
    message: messages[0]
  };
  res.render('login', data);
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash('login-error', 'Username and password are required');
    return res.redirect('/auth/login');
  }
  User.findOne({ username })
    .then(result => {
      if (!result) {
        req.flash('login-error', 'User doesnt exists');
        return res.redirect('/auth/login');
      }
      if (!bcrypt.compareSync(password, result.password)) {
        req.flash('login-error', 'User doesnt exists');
        return res.redirect('/auth/login');
      }
      req.session.currentUser = result;
      res.redirect('/');
    })
    .catch(next);
});

/* GET auth/signup page. */
router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const formErrors = req.flash('signup-error');
  const formData = req.flash('signup-form-data');

  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  Cohort.find()
    .then(results => {
      data.cohorts = results;
      res.render('signup', data);
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  const { username, password, name, cohortId } = req.body;

  if (!username || !password || !name || !cohortId) {
    req.flash('signup-error', 'Username, password, name and cohort are required');
    req.flash('signup-form-data', { username, name });
    return res.redirect('/auth/signup');
  }
  if (!ObjectId.isValid(cohortId) && !cohortId.match(/^[a-fA-F0-9]{24}$/)) {
    req.flash('signup-error', 'That cohort doesn\'t exist');
    req.flash('signup-form-data', { username, name });
    return res.redirect('/auth/signup');
  }
  User.findOne({ username })
    .then(result => {
      if (result) {
        req.flash('signup-error', 'Username already exists');
        return res.redirect('/auth/signup');
      }

      // encrypt password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = new User({ username, password: hashedPassword, name });
      return user.save()
        .then(() => {
          Cohort.findByIdAndUpdate(cohortId, { $push: { students: user.id } }, { new: true })
            .then(() => {
              req.session.currentUser = user;
              res.redirect('/');
            });
        });
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
