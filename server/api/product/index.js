'use strict';

var express = require('express');
var controller = require('./product.controller');
var multiparty = require('connect-multiparty');
var uploadOptions = { autoFile: true,
                      uploadDir: 'client/assets/uploads/'
}

var router = express.Router();

router.get('/', controller.index);
router.get('/admin/', controller.adminindex);
router.get('/:id', controller.show);
router.get('/:id/category', controller.getproductbycategory);
router.get('/:catid/:brandid/relatedproducts', controller.getrelatedproducts);
router.get('/aggregrate/:itemgroupcode', controller.showagre);
router.get('/byurl/:purl', controller.byurl);
router.post('/', controller.create);
router.post('/:id/upload',  multiparty(uploadOptions), controller.upload);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
