'use strict';

import angular from 'angular';
import ProductsController from './products.controller';

export default angular.module('dorbbyfullstackApp.products',[])
	.controller('ProductsController',ProductsController)
	.name;
