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
  $sce;
  $stateParams;
  order: Object[];
  paytmDet: Object[];
  apiUrl = 'https://secure.paytm.in/oltp-web/processTransaction';
  //apiUrl = 'https://pguat.paytm.com/oltp-web/processTransaction';


  /*@ngInject*/
  constructor(Auth, $http, $scope, $state, $stateParams, $sce) {
    'ngInject';
    this.Auth = Auth;
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$sce = $sce;
    //this.apiUrl = 'https://pguat.paytm.in/oltp-web/processTransaction';
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
            this.paytmDet = res.data;
            //this.$http.post(this.$sce.trustAsResourceUrl(this.apiUrl),this.PaytmDet);
          });

        });

      });

    });
  }
  trustSrc(src) {
    return this.$sce.trustAsResourceUrl(src);
  }
}
