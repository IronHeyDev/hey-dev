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
  Project.findById(req.params.id)
    .populate('author')
    .then(project => {
      if (project.author.id === req.user.id) {
        project = Object.assign(project, req.body);
        return project.save();
      } else {
        res.redirect(`/projects/${project.id}`);
      }
    })
    .then((project) => res.redirect(`/projects/${project.id}`))
    .catch(next);
}

module.exports.list = (req, res, next) => {
  const criteria = {}

  if (req.query.author) {
    criteria.author = new RegExp(req.query.author, "i");
  }

  if (req.query.name) {
    criteria.name = new RegExp(req.query.name, "i");
  }

  if (req.query.description) {
    criteria.description = new RegExp(req.query.description, "i"); //case insensitive
  }

  function setRange(query) {
    if (query) {
      maxElems = query;
      let elems = [];
      for (i = 1; i <= maxElems; i++) {
        elems.push(i);
      }
      return elems;
    }
  }

  if (req.query.weeks) {
    criteria.weeks = { $in: setRange(req.query.weeks) }; 
  }

  if (req.query.location) {
    criteria.location = { $in: req.query.location }; 
  }

  if (req.query.maxContributors) {
    criteria.maxContributors = { $in: setRange(req.query.maxContributors) }; 
  }

  if (req.query.devLanguages) {
    criteria.devLanguages = { $in: req.query.devLanguages }; //$in the array includes one of the terms
  }

  if (req.query.languages) {
    criteria.languages = { $in: req.query.languages };
  }

  criteria.state = 'Open';

  console.log(criteria);

  Project.find(criteria)
    .populate('author')
    .then(projects => res.render('projects/list', { projects }))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Project.findById(req.params.id)
    .populate('author')
    .then(project => {
      if (project.author.id === req.user.id) {
        project.deleteOne({ id: project.id })
      } else {
        res.redirect(`/projects/${project.id}`);
      }
    })
    .then(() => res.redirect(`/`))
    .catch(next);
}