'use strict';

export default class ProductController {
  products: Object[];
  purl: String;
  catInfo: Object[];
  $http;
  $scope;
  socket;

  /*@ngInject*/
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.purl = $stateParams.purl;
  }
  
  $onInit() {
    //this.$http.
    // get all products of the categrory
    console.log(this.purl);
  }
}
