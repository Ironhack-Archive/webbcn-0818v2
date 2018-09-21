'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find({})
    .then((result) => {
      const data = {
        script: 'homepage',
        students: result
      };

      res.render('index', data);
    })
    .catch(next);
});

module.exports = router;
