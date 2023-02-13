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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application running at port ${port}`));