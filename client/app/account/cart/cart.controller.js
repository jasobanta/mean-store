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
  payable = 0;
  coupon = 0;
  codcharges = 0;
  qty = 0;
  newqty = 0;
  pmethod = '';
  newOrder = {
    userid: '',
    productid: {},
    quantity: 0,
    totalvalue: 0,
    codcharges: 0,
    shipingcharges: 0,
    payable: 0
  };
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
      this.$http.get('/api/carts/'+this.currentUser._id)
      .then(response => {
        this.cartItems = response.data;
      //  console.log('total items added to cart '+this.cartItems);
        for(var i = 0;i < this.cartItems.length; i++){
          var qty = this.cartItems[i].qty;
          var product = this.cartItems[i].product;
          var amount = product.discount ? (product.saleprice*qty) : (product.mrp*qty);
          if(amount <= 499) {
            this.shipingCharges += 50;
          }
          this.totalValue = this.totalValue+amount;
          if(this.totalValue > 499){
            this.shipingCharges = 0;
          }
          // if(this.pmethod === 'cod'){
          //   this.codcharges += 49;
          // }
          this.payable = (this.totalValue + this.shipingCharges) - this.coupon;
        }
      });
    });
  }
  updatePaymentMethod(){
    if(this.pmethod === 'cod'){
      for (var i = 0; i < this.cartItems.length; i++) {
          this.codcharges += 49;
      }
    }else{
      this.codcharges = 0;
    }
    this.payable = this.payable + this.codcharges;
    console.log(this.pmethod);
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
    if(items.qty === '0'){
      items.qty = 1;
    }else{
    this.$http.put(`/api/carts/${items._id}`,items)
    .then(res => {
      this.$state.reload();
    });
    }
//    console.log(items);
  }
  goContinue(){
    //console.log('visit idex');
    this.$state.routes('/');
  }
  placeTheOrder(form){
    this.submitted = true;
    if(form.$valid){
      this.newOrder.userid = this.currentUser._id;
      this.newOrder.products = this.cartItems;
      this.newOrder.codcharges = this.codcharges;
      this.newOrder.coupon = this.coupon;
      this.newOrder.total = this.totalValue;
      this.newOrder.payable = this.payable;
      this.newOrder.shiping = this.shipingCharges;
      this.newOrder.paymethod = this.pmethod;
      this.$http.post('/api/orders/', this.newOrder)
      .then(res => {
        var Order = res.data;
        angular.forEach(this.cartItems,function(cartItem,key){
          var details = {};
          details.orderid = Order._id;
          details.productid = cartItem.product._id;
          details.images = cartItem.images._id;
          details.quantity = cartItem.qty;
          this.ordersDetails.push(details);
        },this);
        this.$http.post(`/api/ordersdetails/`,this.ordersDetails)
        then(res => {
          if(Order.paymethod==='cc' || Order.paymethod==='dc' || Order.paymethod==='nb') {
            this.$state.go('paymentgateway',{orderid: res.data.orderid});
          }else {
            this.$state.go('finishedorder');
          }
        });
      });

      console.log('form is validated');
    }else{
      if(this.pmethod==''){
        this.errors.pmethod = true;
        console.log('form is not validated');
  //      console.log(this.errors.pmethod);
      }
      //console.log("fail to validate the form");
    }

  }
}
