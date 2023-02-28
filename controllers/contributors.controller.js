const Contributor = require('../models/contributor.model');
const Project = require('../models/project.model');
const mongoose = require('mongoose');

module.exports.join = (req, res, next) => {
  Project.findById(req.params.id)
    .populate('author')
    .populate({
      path: "contributors",
      populate: {
        path: "user"
      }
    })
    .then((project) => {
      if (project.author.id === req.user.id) {
        res.redirect(`/projects/${project.id}`);
      }
      else if (project.contributors.length >= project.maxContributors) {
        project.state = 'In progress';
        project.save()
        .then((project) => res.redirect(`/projects/${project.id}`))
        .catch(next)
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