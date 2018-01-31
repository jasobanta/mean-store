'use strict';

import angular from 'angular';
import VendorController from './vendor.controller';
import Doc1Controller from './document/doc1.controller';

export default angular.module('dorbbyfullstackApp.vendor',[])
	.controller('VendorController',VendorController)
	.controller('Doc1Controller',Doc1Controller)
	.name;