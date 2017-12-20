'use strict';

export default class ProductController {
  products: Object[];
  purl: String;
  catInfo: Object[];
  $http;
  $scope;
  socket;
  $state;
  Auth;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;

  /*@ngInject*/
  constructor(Auth, $state, $http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.$state = $state;
    this.Auth = Auth;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
	this.stateParams = $stateParams;
    this.purl = $stateParams.purl;
  }

  $onInit() {
    //this.$http.
    // get products details
    this.$http.get('/api/products/byurl/'+this.purl)
        .then(response => {
		this.products = response.data;
		console.log(this.products);
	});
  }
  addToCart(form) {
	//var referr
	if(!this.isLoggedIn()) {
		this.$state.go('login',{referrer: this.$state.current.name+'.'+this.purl});
	}
	//collect data for adding to cart
	if(this.isLoggedIn()) {
		var newCartData = {};
		 newCartData.userid = this.getCurrentUser()._id;
		 newCartData.product = this.products._id;
		 newCartData.qty = 1;
		 //console.log(newCartData);
     this.$http.get('/api/carts/findbyuidpid/'+newCartData.userid+'/'+newCartData.product)
         .then(response => {
           var cart = response.data;
           console.log(cart);
           if(cart.length){
			   var id = cart[0]._id;
			   newCartData.userid = cart[0].userid;
			   newCartData.product = cart[0].product;
			   newCartData.qty = cart[0].qty+1;

			   //cart.qty = cart.qty+1;
             //console.log(cart[0]._id);
             this.$http.put('/api/carts/'+id,newCartData);
           }else{
		     this.$http.post('/api/carts',newCartData);
		     newCartData = {};
            // console.log('insert');
           }
           this.$state.go('cart');
  });
     //this.$http.post('/api/carts',newCartData);
	}
  }
}
