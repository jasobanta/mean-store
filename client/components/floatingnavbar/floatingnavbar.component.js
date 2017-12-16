'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class FloatingnavbarComponent {
  $http;
  socket;
  menu = [{
    title: 'Home',
    state: 'main'
  }];
  isCollapsed = true;
  parentCategories = [];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor(Auth, $http, $scope, socket) {
    'ngInject';
    this.$http = $http;
    this.socket = socket;

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('Category');
    });
  }

  $onInit() {
    this.$http.get('/api/categories/pcats/asc')
      .then(response => {
        this.parentCategories = response.data;
        this.socket.syncUpdates('Category', this.parentCategories);
      });
  }
}

export default angular.module('directives.floatingnavbar', [])
  .component('floatingnavbar', {
    template: require('./floatingnavbar.html'),
    controller: FloatingnavbarComponent
  })
  .name;
