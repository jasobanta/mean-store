'use strict';

export default class SkuSearchController {
  $http;
  $state;
  $timeout;
  $stateParams;
  submitted = false;
  itemcodes: Object[];
  itemgroupcodes: Object[];
  itemcode: '';
  itemgroupcode: '';
  errorMessage = '';
  skulist: Object[];
  /*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  $onInit(){
    if(this.$stateParams.itemgroupcode) {
      this.itemgroupcode = this.$stateParams.itemgroupcode;
    }
    if(this.$stateParams.itemcode) {
      this.itemcode = this.$stateParams.itemcode;
    }
    if(this.itemgroupcode && this.itemcode){
      this.$http.get(`api/products/search/${this.itemgroupcode}/${this.itemcode}`)
      .then(res => {
        this.skulist = res.data;
      });
    }
    this.$http.get(`api/products/itemcodes`)
    .then(res => {
      this.itemcodes = res.data;
    })
    this.$http.get(`api/products/itemgroupcodes`)
    .then(res => {
      this.itemgroupcodes = res.data;
    })
  }
  updateItemCode() {
  //  console.log(this.itemgroupcode);
    if (this.itemgroupcode!==undefined) {
      this.$http.get(`api/products/itemcodes/${this.itemgroupcode}`)
      .then(res => {
        this.itemcodes = res.data;
      //  console.log(this.itemcodes);
      })
    }
  }
  findProducts(form){
    this.submitted = true;
    this.skulist = [];
    if(form.$valid){
      this.$http.get(`api/products/search/${this.itemgroupcode}/${this.itemcode}`)
      .then(res => {
        this.skulist = res.data;
      });

    }

  }

}
