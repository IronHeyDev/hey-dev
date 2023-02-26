const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.home = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.render('home', { projects });
    })
    .catch(next);
}