const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller');
const projects = require('../controllers/projects.controller');

router.get('/', common.home);

router.get('/projects/new', projects.create);
router.post('/projects', projects.doCreate);









module.exports = router;