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
  const criteria = {};

  if(req.query.alias) {
    criteria.alias = new RegExp(req.query.alias, "i");
  }
  
  if (req.query.name) {
    criteria.name = new RegExp(req.query.name, "i");
  }
  
  if (req.query.surname) {
    criteria.surname = new RegExp(req.query.surname, "i");
  }

  if (req.query.email) {
    criteria.email = req.query.email;
  }

  if (req.query.location) {
    criteria.location = { $in: req.query.location }; 
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
  if (req.query.devLanguages) {
    criteria.devLanguages = { $in: req.query.devLanguages }; //$in the array includes one of the terms
  }

  if (req.query.languages) {
    criteria.languages = { $in: req.query.languages };
  }

  if (req.query.about) {
    criteria.about = new RegExp(req.query.about, "i");
  }

  console.log(criteria);

  User.find(criteria)
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