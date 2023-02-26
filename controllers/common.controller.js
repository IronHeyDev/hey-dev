const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.home = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.render('common/home', { projects });
    })
    .catch(next);
}

module.exports.about = (req, res, next) => {
  res.render('common/about');
}