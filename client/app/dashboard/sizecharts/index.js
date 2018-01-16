'use strict';

import angular from 'angular';
import SkuController from './sizechart.controller';
import SkuUploadController from './sizechart.upload.controller';

export default angular.module('dorbbyfullstackApp.sku',[])
	.controller('SizachartController', SizechartController)
	.controller('SkuUploadController', SizechartUploadController)
	.name;
