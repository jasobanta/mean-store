'use strict';

import angular from 'angular';
import routes from './category.routes';
import product from './products';
import CategoryController from './category.controller';

export default angular.module('dorbbyfullstackApp.category', ['ui.router', product])
  .config(routes)
  .controller('CategoryController', CategoryController)
  .name;
