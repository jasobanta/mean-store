'use strict';

import angular from 'angular';
import UserController from './user.controller';


export default angular.module('dorbbyfullstackApp.User',[])
	.controller('UserController',UserController)
	.name;
