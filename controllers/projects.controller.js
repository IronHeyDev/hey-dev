const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    res.render('projects/new');
}

module.exports.doCreate = (req, res, next) => {
    Project.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        weeks: req.body.weeks,
        maxContributors: req.body.maxContributors,
        devLanguages: req.body.devLanguages,
        languages: req.body.languages
    }) 
        .then((project) => res.redirect(`/projects/${project.id}`))
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                console.log(req.body);
                console.log(err);
                res.render("projects/new", { errors: err.errors, project: req.body })
            } else {
                next(err);
            }
        })
}
