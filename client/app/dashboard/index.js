'use strict';

import angular from 'angular';
import routes from './dashboard.routes';
import catlist from './catlist';
import DashboardController from './dashboard.controller';

export default angular.module('dorbbyfullstackApp.dashboard', ['dorbbyfullstackApp.auth', 'ui.router', catlist])
.config(routes)
.controller('DashboardController', DashboardController)
.name;
