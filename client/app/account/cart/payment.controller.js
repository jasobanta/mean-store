'use strict';
// @flow

export default class PaymentsController {
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;
  Auth;
  $http;
  $state;
  $cope;
  $stateParams;
  order: Object[];


  /*@ngInject*/
  constructor(Auth, $http, $scope, $state, $stateParams) {
    'ngInject';
    this.Auth = Auth;
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  $onInit() {
    this.$http.get('/api/users/me')
    .then(response => {
      this.currentUser = response.data;
      this.$http.get(`/api/carts/${this.currentUser._id}`)
      .then(res => {
        //console.log(res.data);
        var cartData = res.data;
        if(cartData.length){
          angular.forEach(cartData, function(item,key){
            this.$http.delete(`api/carts/${item._id}`);

          },this);
        }
        this.$http.get(`/api/orders/${this.$stateParams.orderid}`)
        .then(res => {
          this.order = res.data;
          this.$http.post(`/api/paytms/generatechecksum`, this.order)
          .then(res => {
          console.log(res.data);
          });
        });

      });

    });
  }
}
