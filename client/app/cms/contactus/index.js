'use strict';

import angular from 'angular';
import ContactusController from './contactus.controller';

export default angular.module('dorbbyfullstackApp.contactus', [])
  .controller('ContactusController', ContactusController)
  .name;
