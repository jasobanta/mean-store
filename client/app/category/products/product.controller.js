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
  color: Object[];
  size = [];
  images=[];
  catid;
  brandid;
  relatedProducts: Object[];
  popularid;
  popularProducts: Object[];
  associateProducts: Object[];
  variants: Object[];
  getRelatedProducts: Function;
  selectedSize;
  selectedId;
  selectedImage;



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
    this.color = [];
    this.selectedSize = '';
  }

  $onInit() {

    this.$http.get('/api/products/'+this.purl)
    .then(response => {
		this.products = response.data;
    this.images = this.products.images;
    this.selectedId = this.products._id;
    this.selectedImage = this.images[0]._id;
    //------------------------------------
    var products = this.products;
    this.$http.get(`/api/products/aggregrate/${products.itemgroupcode}`)
    .then(res =>{
      this.associateProducts = res.data;
      //console.log(this.associateProducts);
      this.getVariants(this.associateProducts);
      //console.log(this.color);
    });
    this.getRelatedProducts();
	 });
  }
  getVariants(data){
    if(data!==null) {
    this.color = [];
    this.size = [];
      var colorid = [];
      var sizeid = [];
      angular.forEach(data,function(product,index){
        if (product.active && product.images.length!=0) {
          this.color.push(product);
        }
        if (this.products.itemcode===product.itemcode) {
          this.size.push(product);
        }
        if(this.products._id === product._id){
          this.selectedSize = product;
        }
      },this);
    }
  }
  getPopularProducts() {

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


        //console.log('proudct images==',this.images);

  }
  getRelatedProducts() {
    this.catid = this.products.itemsubcats._id?this.products.itemsubcats._id:( this.products.itemcats._id?this.products.itemcats._id: (this.products.subcates._id?this.products.subcates._id : (this.products.maincats._id?this.products.maincats._id:null)));
   this.$http.get('/api/products/'+this.catid+'/relatedproducts')
    .then(res=>{
      this.relatedProducts = res.data;
      //console.log('relatedproducts',this.relatedProducts);
    });
  }
  changeProduct(id) {
  //  console.log();
    this.products = [];
    this.images = [];
    this.associateProducts = [];
    this.selectedProduct = [];
    this.$http.get(`/api/products/${id}`)
    .then(response => {
    this.products = response.data;
    this.images = this.products.images;
    this.selectedId = this.products._id;
    this.selectedImage = this.images[0]._id;
    //console.log("prod==",this.products);
    var products = this.products;
    this.$http.get(`/api/products/aggregrate/${this.products.itemgroupcode}`)
    .then(res => {
      this.associateProducts = res.data;
      //console.log(this.associateProducts);
      this.getVariants(this.associateProducts);
      //console.log(this.color);
    });
//this.getRelatedProducts();
   });
  }
  switchProducts() {
    console.log(this.selectedSize)
    this.selectedId = this.selectedSize._id;
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
    newCartData.product = this.selectedId;
    newCartData.images = this.selectedImage;
    newCartData.qty = 1;
    console.log(newCartData);
    this.$http.get('/api/carts/findbyuidpid/'+newCartData.userid+'/'+newCartData.product)
    .then(response => {
    var cart = response.data;
  //  console.log(cart);
    if(cart.length){
    var id = cart[0]._id;
    newCartData.userid = cart[0].userid;
    newCartData.product = cart[0].product;
    newCartData.qty = cart[0].qty+1;
    this.$http.put('/api/carts/'+id,newCartData)
    .then(res => {
    this.$state.go('cart');
    });
    }else{
    this.$http.post('/api/carts',newCartData)
    .then(res => {
    newCartData = {};
    //               console.log('insert',res.data);
    this.$state.go('cart');
    });
    }
  });
     //this.$http.post('/api/carts',newCartData);
	}
}

}
