'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('dorbbyfullstackApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
