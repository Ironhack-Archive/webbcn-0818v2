'use strict';

const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Project = require('../models/project');

router.get('/', (req, res, next) => {
  Project.find({})
    .populate('students')
    .then((results) => {
      const data = {
        projects: results
      };
      res.render('projects', data);
    })
    .catch((error) => {
      console.log('there has been an error', error);
    });
});

router.get('/create', (req, res, next) => {
  const formData = req.flash('project-form-data');
  const formErrors = req.flash('project-form-error');
  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  res.render('project-create', data);
});

router.post('/create', (req, res, next) => {
  const { name, students, presentationURL, projectURL, imageURL } = req.body;

  if (!name || !students || !presentationURL || !projectURL || !imageURL) {
    req.flash('project-form-error', 'all fields are mandatory');
    req.flash('project-form-data', { name, students, presentationURL, projectURL, imageURL });
    return res.redirect('/projects/create');
  }

  const project = new Project({ name, students, presentationURL, projectURL, imageURL });
  project.save()
    .then(() => {
      res.redirect('/projects');
    })
    .catch(next);
});

router.get('/:projectId', (req, res, next) => {
  const id = req.params.projectId;

  // if (!ObjectId.isValid(id)) {
  //   return res.redirect('/projects');
  // }
  Project.find({ _id: id })
    .populate('students')
    .then((results) => {
      const data = {
        projects: results
      };
      res.render('project-detail', data);
    })
    .catch((error) => {
      console.log('there has been an error', error);
      return res.redirect('/projects');
    });
});

router.post('/:projectId/delete', (req, res, next) => {
  const id = req.params.projectId;

  if (!ObjectId.isValid(id)) {
    return res.redirect('/projects');
  }

  Project.remove({ _id: id })
    .then(() => {
      res.redirect('/projects');
    })
    .catch(next);
});

module.exports = router;
