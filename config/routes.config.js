const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller');
const projects = require('../controllers/projects.controller');
const users = require('../controllers/user.controller');

router.get('/', common.home);

router.get('/projects/new', projects.create);
router.post('/projects', projects.doCreate);
router.get('/signup', users.create);
router.post('/users', users.doCreate);









module.exports = router;