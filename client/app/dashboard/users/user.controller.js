'use strict';

export default class userController {
	$http;
	$state;
	$timeout;
	$stateParams;
	users: Object[];
	newUser: Object[];

	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
	}

	$onInit(){
		this.$http.get(`/api/users`)
		.then(allusers => {
			this.users = allusers.data;
			console.log('all users ', this.users);
		});

		if (this.$stateParams.id) {
			console.log('user id='+this.$stateParams.id)
			this.$http.get(`/api/users/${this.$stateParams.id}`)
			.then(resuser => {
				this.newUser = resuser.data;
			});
		}
	}
	
  
}  //class
