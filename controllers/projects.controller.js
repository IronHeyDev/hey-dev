const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    res.render('projects/new');
}

module.exports.doCreate = (req, res, next) => {
    Project.create(req.body)
        .then((project) => res.redirect(`/projects/${project.id}`))
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.render("projects/new", { errors: err.errors, project: req.body })
            } else {
                next(err);
            }
        })
}
