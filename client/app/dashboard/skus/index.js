'use strict';

import angular from 'angular';
import SkuController from './sku.controller';
import SkuUploadController from './sku.upload.controller';
import SkuCopyController from './skucopy.controller';

export default angular.module('dorbbyfullstackApp.sku',[])
	.controller('SkuController', SkuController)
	.controller('SkuUploadController', SkuUploadController)
	.controller('SkuCopyController', SkuCopyController)
	.name;
