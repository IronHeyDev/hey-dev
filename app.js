require('dotenv').config();
require('./config/db.config');
require('./config/hbs.config');

const express = require('express');
const app = express();
const createError = require("http-errors");

const { session, loadSessionUser } = require('./config/session.config');
app.use(session);
app.use(loadSessionUser);

app.use(express.urlencoded());

const logger = require('morgan');
app.use(logger('dev'));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

const router = require('./config/routes.config');
app.use('/', router);

app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

app.use((error, req, res, next) => {
    error = !error.status ? createError(500, error) : error;
    console.error(error);
    res.status(error.status)
    .render(`errors/${error.status}`, { error });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application running at port ${port}`));