'use strict';

export default class MastersettingsController {
  $http;
  $state;
  $stateParams;
  mastertype;

  /*@ngInject*/
  constructor($state, $http,  $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  $onInit(){
    /*this.$http.get('/api/masters/')
    .then( masters => {
      this.mastertype = masters.data;
    });*/
  }
}
