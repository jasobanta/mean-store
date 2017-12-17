  'use strict';

export default class CategoryController {
  products: Object[];
  catename: String;
  $http;
  $scope;
  socket;
  /*@ngInject*/
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.catename = $stateParams.catename;
  }
  $onInit() {
    this.$http.get('/api/products')
      .then(response => {
        this.products = response.data;
        console.log(this.products);
        this.socket.syncUpdates('Product', this.products);

      });
  }
}
