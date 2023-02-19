const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');

const common = require('../controllers/common.controller');
const projects = require('../controllers/projects.controller');
const users = require('../controllers/users.controller');

router.get('/', common.home);

router.get('/projects/new', secure.isAuthenticated, projects.create);
router.post('/projects', secure.isAuthenticated, projects.doCreate);

router.get('/signup', users.create);
router.post('/users', users.doCreate);
router.get('/users', users.list);
router.get('/users/update', secure.isAuthenticated, users.update);
router.post('/users/delete', secure.isAuthenticated, users.delete);
router.get('/users/:id', users.detail);
router.post('/users/:id', secure.isAuthenticated, users.doUpdate);
router.get('/login', users.login);
router.post('/login', users.doLogin);



module.exports = router;