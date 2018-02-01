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
  $scope;
  ordersDetails: Object[];

  /*@ngInject*/
  constructor(Auth, $http, $scope, $state) {
    'ngInject';
    this.Auth = Auth;
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;
  }
  $onInit() {
    this.$http.get('/api/users/me')
    .then(response => {
      this.currentUser = response.data;
    });
  }
}
