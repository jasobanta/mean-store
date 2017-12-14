'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('dorbbyfullstackApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
