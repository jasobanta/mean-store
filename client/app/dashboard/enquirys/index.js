'use strict';

import angular from 'angular';
import EnquiryController from './enquiry.controller';

export default angular.module('dorbbyfullstackApp.enquiry',[])
	.controller('EnquiryController',EnquiryController)
	.name;