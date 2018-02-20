'use strict';

import angular from 'angular';
import BrandController from './brand.controller';

export default angular.module('dorbbyfullstackApp.brand',[])
	.controller('BrandController',BrandController)
	.name;
