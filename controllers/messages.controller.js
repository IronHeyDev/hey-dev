const Message = require("../models/message.model");
const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
  Message.find({
    $or: [
      { from: req.user._id, to: req.params.id },
      { to: req.user._id, from: req.params.id }
    ]
  })
    .populate('from')
    .populate('to')
    .then((messages) => {
      console.log('holi' + req.params.id)
      res.render('messages/chat', { messages, userId: req.params.id });
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Message.create({
    message: req.body.message,
    to: req.params.id,
    from: req.user.id
  })
    .then(() => {
      if (!req.user.adquiredChats.map((x) => x = x.id).includes(req.params.id)) {
        req.user.adquiredChats.push(req.params.id)
        User.findByIdAndUpdate(req.user.id, req.user)
          .then(() => console.log('updated'))
          .catch(next)
        User.findById(req.params.id)
          .then((userTo) => {
            userTo.adquiredChats.push(req.user.id)
            User.save()
              .then(() => console.log('updated'))
              .catch(next)
          })
          .catch(next)
      }
      res.redirect(`/users/${req.params.id}/chat`)
    })
    .catch(next)
}

module.exports.inbox = (req, res, next) => {
  res.render('messages/inbox');
}

