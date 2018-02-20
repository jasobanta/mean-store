'use strict';

var express = require('express');
var controller = require('./paytm.controller');

var router = express.Router();

router.post('/generatechecksum', controller.generateChecksum);
router.post('/verifychecksum', controller.verifyChecksum);
/*router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);*/

module.exports = router;
