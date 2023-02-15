const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    res.render('projects/new');
}

