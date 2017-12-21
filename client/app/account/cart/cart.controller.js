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
  $state;
  $scope;
  cartItems = {};
  cartItemsDetails = [];
  currentUser = [];
  totalValue = 0;
  shipingCharges = 0;
  qty = 0;
  newqty = 0;

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
      this.$http.get('api/carts/'+this.currentUser._id)
      .then(response => {
        this.cartItems = response.data;
      //  console.log('total items added to cart '+this.cartItems);
        for(var i = 0;i < this.cartItems.length; i++){
          var qty = this.cartItems[i].qty;
          var product = this.cartItems[i].product;
          var amount = product.productsdiscount ? (product.productsdiscount*qty) : (product.productsprice*qty);
          if(amount <= 499) {
            this.shipingCharges += 50;
          }
          this.totalValue = this.totalValue+amount;
          if(this.totalValue > 499){
            this.shipingCharges = 0;
          }
        }
      });
    });
  }
  onRemoveItem(items){
    this.$http.delete(`/api/carts/${items._id}`)
    .then(res => {
      this.$state.reload();
    });
//    console.log(items);
  }
  moveToWishlist(items){
    console.log(items);
  }
  onUpdateItem(items){
    this.$http.put(`/api/carts/${items._id}`,items)
    .then(res => {
      this.$state.reload();
    });
//    console.log(items);
  }
  goContinue(){
    console.log('visit idex');
    this.$state.routes('/');
  }
}
