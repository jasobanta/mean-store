'use strict';

import angular from 'angular';
import SkuController from './sku.controller';
import SkuUploadController from './sku.upload.controller';

export default angular.module('dorbbyfullstackApp.sku',[])
	.controller('SkuController', SkuController)
	.controller('SkuUploadController', SkuUploadController)
	.name;
