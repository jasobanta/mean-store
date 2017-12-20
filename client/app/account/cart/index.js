'use strict';

import angular from 'angular';
import CartsController from './cart.controller';

export default angular.module('dorbbyfullstackApp.settings', [])
  .controller('CartsController', CartsController)
  .name;
