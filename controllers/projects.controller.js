const Project = require("../models/project.model");
const User = require('../models/user.model');
const Contributor = require('../models/contributor.model');
const mongoose = require("mongoose");


module.exports.create = (req, res, next) => {
  res.render("projects/new");
};

module.exports.doCreate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
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
  }).then((project) => {
    Contributor.create({ user: req.user.id, project: project.id })
      .then((contributor) => {
        req.flash('flashMessage', 'Project successfully created. ✨');
        res.redirect(`/projects/${project.id}`)
      }).catch(next)
  })
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
    .populate({
      path: "contributors",
      populate: {
        path: "user"
      }
    })
    .then((project) => {
      res.locals.projectState = project.state;
      project.users = project.contributors.map(x => x.user);
      res.locals.projectUsers = project.users.map(user => user._id);
      res.render('projects/detail', { project });
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => res.render('projects/update', { project }))
    .catch(next)
}

module.exports.doUpdate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

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
    .then((project) => {
      req.flash('flashMessage', 'Project successfully edited. ✨');
      res.redirect(`/projects/${project.id}`)
    })
    .catch(next);
}

module.exports.list = (req, res, next) => {
  const criteria = {};

  if (req.query.author) {
    User.findOne({ alias: new RegExp(req.query.author, "i") })
      .then(user => {
        if (user) {
          criteria.author = user._id
        } else {
          delete req.query;
        }
      })
      .catch(next)
  }

  if (req.query.name) {
    criteria.name = new RegExp(req.query.name, "i");
  }

  if (req.query.description) {
    criteria.description = new RegExp(req.query.description, "i"); //case insensitive
  }

  if (req.query.weeks) {
    criteria.weeks = { $lte: req.query.weeks };
  }

  if (req.query.location) {
    criteria.location = { $in: req.query.location };
  }

  if (req.query.maxContributors) {
    criteria.maxContributors = { $lte: req.query.maxContributors };
  }

  if (req.query.devLanguages) {
    criteria.devLanguages = { $in: req.query.devLanguages }; //$in the array includes one of the terms
  }

  if (req.query.languages) {
    criteria.languages = { $in: req.query.languages };
  }

  if (req.query.state) {
    criteria.state = { $in: req.query.state };
  }

  console.log(criteria);

  Project.find(criteria)
    .populate('author')
    .sort({ createdAt: 'desc' })
    .then(projects => {
      if (projects.length === 0) {
        res.render('projects/list', { warning: 'No results found for your search.' })
      }
      res.render('projects/list', { projects })
    })
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
    .then(() => {
      req.flash('flashMessage', 'Your project has been deleted.');
      res.redirect(`/`)
    })
    .catch(next);
}