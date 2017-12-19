'use strict';

export default class CategoryController {
  products: Object[];
  catename: String;
  catInfo: Object[];
  $http;
  $scope;
  socket;
  price = [];
  color = [];
  size = [];
  menu = [];


  /*@ngInject*/
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.catename = $stateParams.catename;
  }
  $onInit() {

    this.$http.get('/api/products')
      .then(response => {
      this.products = response.data;
      console.log(this.products);

    });
    this.brand = [
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      {name:'Chiktone',Productcount:'(1000)'},
      
    ];
    this.price = [
      {price:'599',pricecount:'(400)'},
      {price:'599',pricecount:'(400)'},
      {price:'599',pricecount:'(400)'},
      {price:'599',pricecount:'(400)'},
      {price:'599',pricecount:'(400)'},
      {price:'599',pricecount:'(400)'},
      {price:'599',pricecount:'(400)'}
    ];
    this.color = [
      {color:'red',colorname:'Red',colorcount:'(270)'},
      {color:'red',colorname:'Red',colorcount:'(270)'},
      {color:'red',colorname:'Red',colorcount:'(270)'},
      {color:'red',colorname:'Red',colorcount:'(270)'},
      {color:'red',colorname:'Red',colorcount:'(270)'},
  
    ];
    this.size = [
      {size:'XL'},
      {size:'XL'},
      {size:'XL'},
      {size:'XL'},
      {size:'XL'},
    ];
    this.menu = [
      {name:'Top Wear', count:'(1523)', url:'#'},
      {name:'Bottom Wear', count:'(1523)',url:'#'},
      {name:'Top Wear', count:'(1523)',url:'#'},
    ];

  }
}
