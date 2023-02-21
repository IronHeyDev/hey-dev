const Project = require("../models/project.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
  res.render("projects/new");
};

module.exports.doCreate = (req, res, next) => {
  Project.create({
    author: req.user.id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    location: req.body.location,
    weeks: req.body.weeks,
    maxContributors: req.body.maxContributors,
    devLanguages: req.body.devLanguages,
    languages: req.body.languages,
  }).then((project) => res.redirect(`/projects/${project.id}`))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.render("projects/new", { errors: err.errors, project: req.body });
      } else {
        next(err);
      }
    });
};

module.exports.detail = (req, res, next) => {
  Project.findById(req.params.id)
    .populate('author')
    .then(project => res.render('projects/detail', { project }))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => res.render('projects/update', { project }))
    .catch(next)
}

module.exports.doUpdate = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
    .then(project => res.redirect(`/projects/${project.id}`))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  Project.find()
    .populate('author')
    .then(projects => res.render('projects/list', { projects }))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch(next)
}