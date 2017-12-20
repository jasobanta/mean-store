'use strict';
// @flow

export default class CartsController {
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;
  Auth;
  $http;
  cartItems = {};
  cartItemsDetails = [];
  currentUser = [];

  /*@ngInject*/
  constructor(Auth, $http) {
    'ngInject';
    this.Auth = Auth;
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/users/me')
    .then(response => {
      this.currentUser = response.data;
      this.$http.get('api/carts/'+this.currentUser._id)
      .then(response => {
        this.cartItems = response.data;
        for(var i = 0;i < this.cartItems.length; i++){
          var productid = this.cartItems[i].product;
          var qty = this.cartItems[i].qty;
          this.$http.get('/api/products/'+productid)
          .then(response =>{
            var pdata = response.data;
            pdata.qty = qty;
            this.cartItemsDetails.push(pdata);
          });

        }
        //console.log(this.cartItemsDetails);
      });
    });

  }
}
