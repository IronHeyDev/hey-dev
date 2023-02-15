require('dotenv').config();
require('./config/db.config');

const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));

const router = require('./config/routes.config');
app.use('/', router);

app.use((error, req, res, next) => {
    error = !error.status ? createError(500, error) : error;
    console.error(error);
    res.status(error.status)
    .render(`errors/${error.status}`, { error });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application running at port ${port}`));