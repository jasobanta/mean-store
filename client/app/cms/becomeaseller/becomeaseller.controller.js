'use strict';

export default class BecomeasellerController {

  errors = {
    other: undefined
  };
  message = '';
  submitted = false;
  $http;
  $state;


  /*@ngInject*/
  constructor($state, $http) {
    'ngInject';
    this.$state = $state;
    this.$http = $http;
  }

  $onInit() {
    console.log('becoeme a seller working progres');
     this.sf = {sellername: '', emailaddress: '', mobilenumber: '', brand: '', companyname: '', remark: ''};
  }
  becomeasellerForm(form){
    this.submitted = true;
    console.log(this.sf);
      if(form.$valid){
        this.sf.etype = 'seller';
        this.$http.post('/api/enquirys/', this.sf)
        .then(() => {
          this.message = 'Enquiry send successfully.';
          this.sf = {sellername: '', emailaddress: '', mobilenumber: '', brand: '', companyname: '', remark: ''};
          this.submitted = false;

        });
        console.log('form is valide and save data');
      }
      else{
        console.log('form not valid save no data');
      }

  }
}
