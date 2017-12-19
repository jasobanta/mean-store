'use strict';

import angular from 'angular';
import ProductController from './product.controller';

export default angular.module('dorbbyfullstackApp.product', [])
  .controller('ProductController', ProductController)
  .name;
