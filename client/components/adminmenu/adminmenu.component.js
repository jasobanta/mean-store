'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class AdminMenuComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.adminmenu', [])
  .component('adminmenu', {
    template: require('./admin.html'),
    controller: AdminMenuComponent
  })
  .name;
