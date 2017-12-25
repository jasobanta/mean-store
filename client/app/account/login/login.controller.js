'use strict';
// @flow

type User = {
  name: string;
  email: string;
  password: string;
};

export default class LoginController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;
  referrer;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;


  }

  login(form) {
    this.submitted = true;
    var referrer = this.$state.params.referrer || this.$state.current.referrer || 'main';
    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
      if(referrer.split(".")[0] === 'product') {
			var params = referrer.split(".");
			referrer = params[0];
			var purl = params[1];
			//console.log(purl);
			this.$state.go(referrer, {'purl': purl});
		}else{
     this.$state.go(referrer);
    }
    })
    .catch(err => {
      this.errors.login = err.message;
    });
    }
  }
}
