const Contributor = require('../models/contributor.model');
const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.join = (req, res, next) => {
  Project.findById(req.params.id)
    .populate('author')
    .then((project) => {
      if (project.author.id === req.user.id) {
        res.redirect(`/projects/${project.id}`)
      } else {
        Contributor.create({
          user: req.user.id,
          project: project.id
        }).then(() => {
          res.redirect(`/projects/${project.id}`)
        })
          .catch(next)
      }
    })

  
}