'use strict';

import angular from 'angular';
import SkuController from './sku.controller';

export default angular.module('dorbbyfullstackApp.sku',[])
	.controller('SkuController',SkuController)
	.name;
