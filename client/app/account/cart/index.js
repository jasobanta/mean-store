'use strict';

import angular from 'angular';
import CartsController from './cart.controller';
import PaymentsController from './payment.controller';

export default angular.module('dorbbyfullstackApp.settings', [])
  .controller('CartsController', CartsController)
  .controller('PaymentsController', PaymentsController)
  .name;
