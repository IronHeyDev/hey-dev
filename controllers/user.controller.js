const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

module.exports.create = (req, res, next) => {
  res.render("users/signup");
};

module.exports.doCreate = (req, res, next) => {
  function renderWithErrors(errors) {
    res.render("users/signup", { errors, user: req.body });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      renderWithErrors({ email: "Email already registered" });
     // renderWithErrors({ alias: "Alias already taken, please choose something else"});
    } else {
      return User.create({
        avatar: req.body.avatar,
        alias: req.body.alias,
        name: req.body.name,
        surname: req.body.surname,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
      })
        .then(() => {
          res.redirect("/login");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            console.log(error);
            renderWithErrors(error.errors);
          } else {
            next(error);
          }
        });
    }
  });
};
