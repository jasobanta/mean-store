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
  $state;
  $currentstate;

  constructor(Auth, $state) {
    'ngInject';
    this.$state = $state;
    this.currentstate = this.$state.current.name;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    //console.log();
  }

}

export default angular.module('directives.adminmenu', [])
  .component('adminmenu', {
    template: require('./admin.html'),
    controller: AdminMenuComponent
  })
  .name;