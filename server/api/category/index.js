'use strict';

var express = require('express');
var controller = require('./category.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/totalrecord', controller.totalrecord);
router.get('/:id', controller.show);
router.get('/list/:type', controller.list);
router.get('/pcats/:order', controller.pcats);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
