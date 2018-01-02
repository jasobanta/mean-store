'use strict';

export default class MastersettingsController {
  $http;
  $state;
  $timeout;
  $stateParams;
  mastertype;
  submitted = false;
  newAttribute: Object[];
  successMessage = '';
  errorMessage = '';
  mslist : Object[];
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
    this.$http.get('/api/masters/')
    .then( masters => {
      this.mastertype = masters.data;
    });
  }
  masterSettings(form){
    this.submitted = true;
    this.successMessage = '';

    if (form.$valid) {
      console.log(this.mslist);
      if (this.mslist) {
        this.$http.get('/api/masterattrs/childof/'+this.mslist._id)
        .then(resValues => {
          this.valueLists =  resValues.data;
        });

//        this.valueLists = this.mslist.childs;
      }

    } else {

    }
  }
  masterAddSettings(form){
    this.submitted = true;

    if (form.$valid) {
      this.$http.get('/api/masters/getbyname/'+this.newAttribute.name)
      .then(resattrib => {
      //  console.log(resattrib);
        if (resattrib.data.length===0) {
                this.$http.post('/api/masters/',this.newAttribute)
                .then(attribs => {
                  this.successMessage = 'An attribute {'+attribs.data.name+'} created!';
                  this.newAttribute = {};
                  this.submitted = false;
                  this.errorMessage ='';
                });
                // console.log('log the data to database');
        } else {
          this.successMessage = '';
          this.errorMessage = 'Attribute already exist';
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
    var mslist = this.mslist;
    var $http = this.$http;
    angular.forEach(this.valueLists, function(values, key){
      values.childof = mslist._id;
      if (values._id) {
        $http.put('/api/masterattrs/'+values._id, values)
        .then(result => {
//          this.message.push({key: 'updated' });
//          console.log(this.message[key]);
        });
      } else {
        if (values.name) {
          $http.post('/api/masterattrs/', values)
          .then(result => {
//            this.message.push({key: 'added' });
//            console.log(this.message[key]);
          });
        }
      }
    });
    this.$http.get('/api/masterattrs/childof/'+this.mslist._id)
    .then(resValues => {
      this.valueLists =  resValues.data;
      this.successMessage = this.valueLists.length+' records updated successfully (empty filled will not be saved)!';
    });

  }
  deleteAttr(msid){
    this.$http.delete('/api/masterattrs/'+msid)
    .then(res=>{
      this.$state.reload();
    });

  }
}
