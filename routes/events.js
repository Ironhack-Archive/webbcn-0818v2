'use strict';

const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const Event = require('../models/events');

router.get('/', (req, res, next) => {
  Event.find({})
    .populate('attendees')
    .then((results) => {
      const data = {
        events: results
      };
      res.render('events', data);
    })
    .catch(next);
});

router.get('/create', (req, res, next) => {
  const formData = req.flash('event-form-data');
  const formErrors = req.flash('event-form-error');
  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  res.render('events-create', data);
});

router.post('/create', (req, res, next) => {
  const { date, name, type, description } = req.body;
  if (!date || !name || !type || !description) {
    req.flash('event-form-error', 'Name, event-type and date are mandatory!');
    req.flash('event-form-data', { date, name, type, description });
    return res.redirect('/events/create');
  }
  const typeError = !type === 'presentation' || !type === 'party' || !type === 'talk';
  const descriptionError = description.length > 500;
  if (typeError || descriptionError) {
    req.flash('event-form-error', 'Select provided type, or reduce length of event description');
    req.flash('event-form-data', { date, name, type, description });
    return res.redirect('/events/create');
  }

  const event = new Event({ date, name, type, description });
  event.save()
    .then(() => {
      res.redirect('/events');
    })
    .catch(next);
});

router.get('/:eventId', (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .then((results) => {
      const data = {
        event: results
      };
      res.render('event-details', data);
    })
    .catch(next);
});

router.post('/:eventId/delete', (req, res, next) => {
  const id = req.params.eventId;

  if (!ObjectId.isValid(id)) {
    return res.redirect('/events');
  }

  Event.remove({ _id: id })
    .then(() => {
      res.redirect('/events');
    })
    .catch(next);
});

module.exports = router;
