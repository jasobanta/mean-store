'use strict';

import angular from 'angular';
import routes from './category.routes';
import CategoryController from './category.controller';

export default angular.module('dorbbyfullstackApp.category', ['dorbbyfullstackApp.auth', 'ui.router'])
  .config(routes)
  .controller('CategoryController', CategoryController)
  .name;
