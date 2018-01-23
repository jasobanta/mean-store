'use strict';

import angular from 'angular';
import EventController from './event.controller';
import EventimageController from './eventimage/eventimage.controller';

export default angular.module('dorbbyfullstackApp.event',[])
	.controller('EventController',EventController)
	.controller('EventimageController',EventimageController)
	.name;
