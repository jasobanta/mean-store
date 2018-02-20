'use strict';

import angular from 'angular';
import SizachartController from './sizechart.controller';
import SizeUploadController from './sizechart.upload.controller';

export default angular.module('dorbbyfullstackApp.sku',[])
	.controller('SizachartController', SizechartController)
	.controller('SizeUploadController', SizechartUploadController)
	.name;
