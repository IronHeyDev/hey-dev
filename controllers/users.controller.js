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
  res.render('users/update', { user: req.user });
}

module.exports.doUpdate = (req, res, next) => {
  if (!req.body.password) {
    delete req.body.password;
  }

  const user = Object.assign(req.user, req.body);
  user.save()
    .then((user) => res.redirect(`/users/${user.id}`))
    .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.render('users/list', { users }))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.user.id)
  .then(() => {
    res.redirect(`/`)
  })
  .catch(next);
} 

module.exports.login = (req, res, next) => {
  res.render('users/login');
}

module.exports.doLogin = (req, res, next) => {

  User.findOne({ email: req.body.email })
  .then(user => {
    bcrypt
    .compare(req.body.password, user.password)
    .then(ok => {
      if (ok) {
        req.session.userId = user.id;
        res.redirect('/');
      } else {
        res.render('users/login', { error: "Login failed, please make sure the email and passwords are correct", email: req.body.email });
      }
    })
    .catch(next);
  })
  .catch(next);
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}