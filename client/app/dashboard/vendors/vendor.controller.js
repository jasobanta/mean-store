'use strict';

export default class VendorController{
	 $http;
  $state;
  $timeout;
  $stateParams;
  vendortype;
  submitted = false;
  newVendor: Object[];
  successMessage = '';
  errorMessage = '';
  vendorlist : Object[];
  valueLists: Object[];
  message : Object[];

  /*@ngInject*/
  constructor($state, $http, $timeout, $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
  }
  $onInit(){
    this.$http.get('/api/vendors/')
    .then( vendors => {
      this.vendortype = vendors.data;
    });
  }
  vendorSettings(form){
    this.submitted = true;
    this.successMessage = '';

    if (form.$valid) {
      console.log(this.vendorlist);
      if (this.vendorlist) {
        this.$http.get('/api/vendors/childof/'+this.vendorlist._id)
        .then(resValues => {
          this.valueLists =  resValues.data;
        });

//        this.valueLists = this.vendorlist.childs;
      }

    } else {

    }
  }
  vendorAdd(form){
    this.submitted = true;

    if (form.$valid) {
      this.$http.get('/api/vendors/getbyname/'+this.newVendor.name)
      .then(resattrib => {
      //  console.log(resattrib);
        if (resattrib.data.length===0) {
                this.$http.post('/api/vendors/',this.newVendor)
                .then(attribs => {
                  this.successMessage = 'An vendor {'+attribs.data.name+'} created!';
                  this.newVendor = {};
                  this.submitted = false;
                  this.errorMessage ='';
                });
                // console.log('log the data to database');
        } else {
          this.successMessage = '';
          this.errorMessage = 'Vendor already exist';
        }

      });
    } else {
//      console.log('log invalide');
    }
  }
  addMore(form){
    this.valueLists.push({name: '', active: true});
  }
  saveValues(form){
    var vendorlist = this.vendorlist;
    var $http = this.$http;
    angular.forEach(this.valueLists, function(values, key){
      values.childof = vendorlist._id;
      if (values._id) {
        $http.put('/api/brands/'+values._id, values)
        .then(result => {
//          this.message.push({key: 'updated' });
//          console.log(this.message[key]);
        });
      } else {
        if (values.name) {
          $http.post('/api/brands/', values)
          .then(result => {
//            this.message.push({key: 'added' });
//            console.log(this.message[key]);
          });
        }
      }
    });
    this.$http.get('/api/brands/childof/'+this.vendorlist._id)
    .then(resValues => {
      this.valueLists =  resValues.data;
      this.successMessage = this.valueLists.length+' records updated successfully (empty filled will not be saved)!';
    });

  }
  deleteAttr(vendorid){
    this.$http.delete('/api/brands/'+vendorid)
    .then(res=>{
      this.$state.reload();
    });

  }


}