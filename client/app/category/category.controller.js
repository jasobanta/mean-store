'use strict';

export default class CategoryController {
  products: Object[];
  catename: String;
  catInfo: Object[];
  catId;
  $http;
  $scope;
  socket;
  $stateParams;
  price = [
    {from: 0, to: 499},
    {from: 500, to: 999},
    {from: 1000, to: 1499},
    {from: 1500, to: 1999},
    {from: 2000, to: 2499},
    {from: 2500, to: 'above'},
  ];
  rangeprice = [];
  color = [];
  size = [];
  material = [];
  menu = [];
  brand = [];
  BannerImages = [];
  sortparams = [
    {val: 'newarrival', label: "What's New"},
    {val: 'trending', label: "Trending"},
    {val: 'pricelth', label: "Price: Low to High"},
    {val: 'pricehtl', label: "Price: High to Low"},
    {val: 'discounthtl', label: "Discount: High to Low"},
  ];
  sort;
  pagedProducts: Object[];
  pagedProductsAdd: Object[];
  paged;
  loadmoreshow = true;
  recentSrc;

  /*@ngInject*/
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.$stateParams = $stateParams;
    this.catename = this.$stateParams.catename;
    this.sort = this.sortparams[0];
  }
  $onInit() {
    this.$http.get(`/api/categories/getbyname/${this.catename}`)
    .then(res =>{
      this.catInfo = res.data;
      this.BannerImages='/assets/images/bannerimages/categories/'+this.catInfo.name+'.jpg';
      //console.log(this.catInfo);
      if (this.$stateParams.subcates) {
        angular.forEach(this.catInfo.childs,function(childs,key){
          if(this.$stateParams.itemcates && childs.slug===this.$stateParams.subcates){
            angular.forEach(childs.childs, function(itemcats, key){
              if(itemcats.slug===this.$stateParams.itemcates)
              this.catId = itemcats._id;
            },this);
          } else {
            if(childs.slug===this.$stateParams.subcates)
            this.catId = childs._id;
          }
        },this);
      } else {
        this.catId = this.catInfo._id;
      }

      this.$http.get(`/api/categories/${this.catId}/sidemenu`)
      .then(res =>{
        //console.log('categories menu: ',res.data);
        this.menu = res.data;

      });

      // console.log(this.catId);
    this.$http.get(`/api/products/${this.catId}/category/`)
      .then(response => {
      this.products = response.data;
      var products = this.products;
      var brandcallid = [];
      var colorid = [];
      var sizeid = [];
      var materialid = [];
      angular.forEach(this.products,function(value,key){
        if (value.brands !== null && (brandcallid.length===0 || brandcallid.indexOf(value.brands._id)===-1)) {
          this.brand.push(value.brands);
          brandcallid.push(value.brands._id) ;
        }

/*        if (this.price.indexOf(value.saleprice+'('+value.mrp+')')===-1) {
            this.price.push(value.saleprice+'('+value.mrp+')');
        }*/
      // console.log(value);
        if (value.color !== null && (colorid.length===0 || colorid.indexOf(value.color._id)===-1)) {
            this.color.push(value.color);
            colorid.push(value.color._id);
        }
        if (value.size !== null && (sizeid.length===0 || sizeid.indexOf(value.size._id)===-1)) {
            this.size.push(value.size);
            sizeid.push(value.size._id);
        }
        if (value.material !== null && (materialid.length===0 || materialid.indexOf(value.material._id)===-1)) {
            this.material.push(value.material);
            materialid.push(value.material._id);
        }
      },this);
      //console.log(this.products);
      //console.log(this.catId);
    // start paging products data
    });
    this.$http.get(`/api/products/${this.catId}/category/paged`)
    .then(res => {
      this.paged = res.data;
    //  console.log('paged data called.',this.paged);
      this.page = 1;
      this.loadmoreshow = true;
      this.$http.get(`/api/products/${this.catId}/category/paged/${this.page}`)
      .then(res => {
        this.pagedProducts = res.data;
        angular.forEach(this.pagedProducts,function(value,key){
          this.$http.get(`/api/products/aggregrate/${value.itemgroupcode}`)
          .then(res =>{
            var resdata = res.data;
            var variants={sizes:[],colors:[],images:[]};
            var sizeid=[];
            var colorsid=[];
            var clorImagId = [];

            angular.forEach(resdata,function(v,k){
              if(sizeid.indexOf(v.size._id)===-1){
                variants.sizes.push(v.size.name);
                sizeid.push(v.size._id);
              }

              if(v.color !== null && colorsid.indexOf(v.color._id)===-1){
              variants.colors.push(v.color);
              colorsid.push(v.color._id);
              }
              if(v.images.length){

                for(var i=0;i<v.images.length;i++)
                {
                  if(clorImagId !== null && clorImagId.indexOf(v.color._id))
                  variants.images[v.color.name]=v.images[i].logs;
                //  variants.images[v.color.name].push();
                  clorImagId.push(v.color._id);
                }
              }
              //var colorname = v.color.name;
            },variants);
            // variants.sizes.reverse();
             value.variants = variants;
          });
        },this);
        // console.log(this.pagedProducts);
      });
      //console.log(this.paged);
    });
  });

    //this.BannerImages='/assets/images/banner-sale.jpg';
  }
  loadProduct(){
  //  console.log(this.paged);
    if(this.page!==this.paged.pages) {
      this.page = this.page+1;
      this.loadmoreshow = true;
    }
    else {
      this.page = this.paged.pages;
      this.loadmoreshow = false;
    }
    this.$http.get(`/api/products/${this.catId}/category/paged/${this.page}`)
    .then(res => {
      this.pagedProductsAdd = res.data;
      angular.forEach(this.pagedProductsAdd,function(value,key){
        this.$http.get(`/api/products/aggregrate/${value.itemgroupcode}`)
        .then(res =>{
          var resdata = res.data;
          var variants={sizes:[],colors:[],images:[]};
          var colorsid = [];
          var sizeid = [];
          var clorImagId = [];
          angular.forEach(resdata,function(v,k){
            if(sizeid.indexOf(v.size._id)===-1) {
              variants.sizes.push(v.size.name);
              sizeid.push(v.size._id);

            }

            if(v.color !== null && colorsid.indexOf(v.color._id)===-1){
            variants.colors.push(v.color);
            colorsid.push(v.color._id);

            }
            if(v.images.length){

              for(var i=0;i<v.images.length;i++)
              {
                if(clorImagId !== null && clorImagId.indexOf(v.color._id))
                variants.images[v.color.name]=v.images[i].logs;
              //  variants.images[v.color.name].push();
                clorImagId.push(v.color._id);
              }
            }
            //var colorname = v.color.name;
          },variants);
          //console.log(variants.colors);
          variants.sizes.sort();
          value.variants = variants;
          this.pagedProducts.push(value);
        });

      },this);
       console.log(this.pagedProducts);
    });
  }
  changeImage(cl,src,pid){
    var el = document.getElementById("product-img-"+pid);
    this.recentSrc = el.getAttribute('src');
    el.src = src;
    //.log(this.recentSrc);

//    console.log(cl,src,pid);
  }
  restoreImage(pid){
    var el = document.getElementById("product-img-"+pid);
  //  console.log(this.recentSrc);
    el.src = this.recentSrc;
  }

}
