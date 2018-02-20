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
  subCategories = [];
  subsubCategories = [];

  constructor($http, $scope, socket) {
    'ngInject';
    this.$http = $http;
    this.socket = socket;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('Category');
    });
  }

  $onInit() {
    this.$http.get('/api/categories/categorytree')
      .then(response => {
        this.parentCategories = response.data;
      });
    this.subCategories = [
      {name:'Top Wear1'},
      {name:'Bottom Wear'},
      {name:'Winter Wear'},
    ];
    this.subsubCategories = [
      {products:'Sarees',url:'#'},
      {products:'Ethnic Suits',url:'#'},
      {products:'Blouses',url:'#'},
      {products:'Ethnic Jackets',url:'#'},
      {products:'Kurta and Kurti',url:'#'},
      {products:'Dress Materials',url:'#'},
      {products:'Sarees',url:'#'},



    ];


  }
  convertClick(elm) {
    elm.click();
  }
}

export default angular.module('directives.floatingnavbar', [])
  .component('floatingnavbar', {
    template: require('./floatingnavbar.html'),
    controller: FloatingnavbarComponent
  })
  .name;
