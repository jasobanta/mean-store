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
  color = [];
  size = [];
  images=[];
  catid;
  brandid;
  relatedProducts : Object[];
  popularid;
  popularProducts : Object[];


  /*@ngInject*/
  constructor(Auth, $state, $http, $scope, socket, $stateParams) {
    'ngInject';
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
    //this.$http.get('/api/products/byurl/'+this.purl)
    this.$http.get('/api/products/'+this.purl)
        .then(response => {
		this.products = response.data;
    //------------------------------------
      var products = this.products;
      //console.log("prod==",this.products);
        this.$http.get('/api/products/aggregrate/'+products.itemgroupcode)
        .then(res =>{
          var resdata = res.data;
          var variants={sizes:[],colors:[],images:[]};
          angular.forEach(resdata,function(v,k){
            if(variants.sizes.indexOf(v.size.name)===-1){
                variants.sizes.push(v.size.name);
            }

            if(variants.colors.indexOf(v.color.name)===-1){
            variants.colors.push(v.color.name);
            }
            if(v.images.length){

              for(var i=0;i<v.images.length;i++)
              {
                variants.images[v.color.name]=v.images[i].logs;
                this.images[v.color.name]=v.images[i].logs;
             }
            }
            //var colorname = v.color.name;
          },variants);
          products.variants = variants;
        });

    //----------------popular product--------------------
    //this.popularid =  this.products.itemcats._id?this.products.itemcats._id:
    // (this.products.subcates._id?this.products.subcates._id : (this.products.maincats._id?this.products.maincats._id:null));

   // this.brandid = this.products.brands._id
  //  this.$http.get('/api/products/popularproducts')
  //  .then(resPop=>{
  //    this.popularProducts = resPop.data;
    //  console.log('popularproducts',this.popularProducts);
  //  });
    //----------------popular product end --------------------

    //----------------related product-------------------------
    this.catid = this.products.itemsubcats._id?this.products.itemsubcats._id:( this.products.itemcats._id?this.products.itemcats._id: (this.products.subcates._id?this.products.subcates._id : (this.products.maincats._id?this.products.maincats._id:null)));

   // this.brandid = this.products.brands._id
   //this.$http.get('/api/products/'+this.catid+'/'+this.brandid+'/relatedproducts/')
    this.$http.get('/api/products/'+this.catid+'/relatedproducts')
    .then(res=>{
      this.relatedProducts = res.data;
    //  console.log('relatedproducts',this.relatedProducts);
    });





    //console.log('proudct images==',this.images);
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

  colorSwitch(color){
    console.log('color='+color);
  }
  imageSwitch(color){
    console.log('imageSwitch='+color);
  }
}
