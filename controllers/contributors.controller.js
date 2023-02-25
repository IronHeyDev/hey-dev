const Contributor = require('../models/contributor.model');
const mongoose = require('mongoose');

module.exports.join = (req, res, next) => {
  Contributor.create({
    user: req.user.id,
    project: req.params.id
  }).then((contributor) => {
    console.log("this is join");
    res.redirect(`/projects/${req.params.id}`)
  })
    .catch(next)
}