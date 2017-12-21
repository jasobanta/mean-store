'use strict';

import angular from 'angular';
import routes from './cms.routes';
import becomeaseller from './becomeaseller';
import contactus from './contactus';

export default angular.module('dorbbyfullstackApp.cms', ['ui.router', becomeaseller, contactus])
  .config(routes)
  .name;
