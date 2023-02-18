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
          } else if (error.message.includes("E11000")) {
            renderWithErrors({ alias: "Alias already registered" });
          } else {
            next();
          }
        });
    }
  });
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
  .then((user) => {
    res.render('users/profile', { user });
  }
  )
  .catch(next)
}

module.exports.update = (req,res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.render('users/update', { user });
  })
  .catch(next);
}

module.exports.doUpdate = (req, res, next) => {
  Object.keys(req.body).forEach(key => {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  })

  User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
  .then((user) => res.redirect(`/users/${user.id}`))
  .catch(next);
}