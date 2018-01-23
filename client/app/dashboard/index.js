'use strict';

import angular from 'angular';
import routes from './dashboard.routes';
import catlist from './catlist';
import master from './masters';
import ord from './orders';
import vendor from './vendors';
import brand from './brands';
import sku from './skus';
import event from './events';
import enquiry from './enquirys';
import user from './users';
import DashboardController from './dashboard.controller';

export default angular.module('dorbbyfullstackApp.dashboard', ['dorbbyfullstackApp.auth', 'ui.router', catlist, master, ord, vendor, brand, sku, event, enquiry, user])
.config(routes)
.controller('DashboardController', DashboardController)
.name;
