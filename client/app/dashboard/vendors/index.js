'use strict';

import angular from 'angular';
import VendorController from './vendor.controller';

export default angular.module('dorbbyfullstackApp.vendor',[])
	.controller('VendorController',VendorController)
	.name;