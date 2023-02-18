const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/user.model');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hey-dev";

module.exports.session = session({
    secret: process.env.SESSION_SECRET || 'super secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, //document.cookie doesn't return the cookie
      secure: process.env.SESSION_SECURE === 'true' //only send in HTTPS petition
    },
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
})

module.exports.loadSessionUser = (req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        User.findById(userId) 
        .then(user => {
            req.user = user;
            res.locals.currentUser = user;
            next();
        })
        .catch(next)
    } else {
        next();
    }
}
