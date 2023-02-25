const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const multer = require('../config/multer.config');

const common = require('../controllers/common.controller');
const projects = require('../controllers/projects.controller');
const users = require('../controllers/users.controller');
const contributors = require('../controllers/contributors.controller');

router.get('/', common.home);

router.get('/projects/new', secure.isAuthenticated, projects.create);
router.post('/projects', secure.isAuthenticated, multer.single('image'), projects.doCreate);
router.get('/projects', projects.list);
router.get('/projects/:id', projects.detail);
router.get('/projects/:id/update', secure.isAuthenticated, projects.update);
router.post('/projects/:id', secure.isAuthenticated, multer.single('image'), projects.doUpdate);
router.post('/projects/:id/delete', secure.isAuthenticated, projects.delete);

router.post('/projects/:id/join', secure.isAuthenticated, contributors.join);

router.get('/signup', users.create);
router.post('/users', users.doCreate);
router.get('/users', secure.isAuthenticated, users.list);
router.get('/users/me/update', secure.isAuthenticated, users.update);
router.post('/users/me/delete', secure.isAuthenticated, users.delete);
router.post('/users/me/update', secure.isAuthenticated, multer.single('avatar'), users.doUpdate);
router.get('/users/:id', users.detail);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.post('/logout', users.logout);



module.exports = router;