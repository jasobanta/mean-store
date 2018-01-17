'use strict';

import angular from 'angular';
import CatlistController from './catlist.controller';
import SizechartController from './sizechart/sizechart.controller';

export default angular.module('dorbbyfullstackApp.catlist', [])
.controller('CatlistController', CatlistController)
.controller('SizechartController', SizechartController)
.name;
