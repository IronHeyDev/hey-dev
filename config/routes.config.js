const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller');
const projects = require('../controllers/projects.controller');
const users = require('../controllers/users.controller');

router.get('/', common.home);

router.get('/projects/new', projects.create);
router.post('/projects', projects.doCreate);

router.get('/signup', users.create);
router.post('/users', users.doCreate);
router.get('/users', users.list);
router.get('/users/:id', users.detail);
router.get('/users/:id/update', users.update);
router.post('/users/:id', users.doUpdate);
router.post('/users/:id/delete', users.delete);
router.get('/login', users.login);
router.post('/login', users.doLogin);



module.exports = router;