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

  constructor($http, $scope, socket) {
    'ngInject';
    this.$http = $http;
    this.socket = socket;
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
  convertClick(elm){
    elm.click();
  }
}

export default angular.module('directives.floatingnavbar', [])
  .component('floatingnavbar', {
    template: require('./floatingnavbar.html'),
    controller: FloatingnavbarComponent
  })
  .name;
