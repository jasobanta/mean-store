'use strict';

import angular from 'angular';
import EventController from './event.controller';

export default angular.module('dorbbyfullstackApp.event',[])
	.controller('EventController',EventController)
	.name;
