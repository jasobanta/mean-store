'use strict';

import angular from 'angular';
import VendorController from './vendor.controller';
import Doc1Controller from './document/doc1.controller';
import Doc2Controller from './document/doc2.controller';
import Doc3Controller from './document/doc3.controller';
import Doc4Controller from './document/doc4.controller';
import Doc5Controller from './document/doc5.controller';
import Doc6Controller from './document/doc6.controller';
import Doc7Controller from './document/doc7.controller';
import Doc8Controller from './document/doc8.controller';

export default angular.module('dorbbyfullstackApp.vendor',[])
	.controller('VendorController',VendorController)
	.controller('Doc1Controller', Doc1Controller)
	.controller('Doc2Controller', Doc2Controller)
	.controller('Doc3Controller', Doc3Controller)
	.controller('Doc4Controller', Doc4Controller)
	.controller('Doc5Controller', Doc5Controller)
	.controller('Doc6Controller', Doc6Controller)
	.controller('Doc7Controller', Doc7Controller)
	.controller('Doc8Controller', Doc8Controller)
	.name;