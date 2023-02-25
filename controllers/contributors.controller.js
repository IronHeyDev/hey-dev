const Contributor = require('../models/contributor.model');
const mongoose = require('mongoose');

module.exports.join = (req, res, next) => {
  if (req.user) {
    Contributor.create({
      user: req.user.id,
      project: req.params.id
    }).then((project) => {
      console.log("this is join");
      res.redirect(`/projects/${project}`)
    })
      .catch(next)
  }
}