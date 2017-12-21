'use strict';

export default class BecomeasellerController {
  products: Object[];
  purl: String;
  catInfo: Object[];
  $http;
  $scope;
  socket;
  $state;


  /*@ngInject*/
  constructor(Auth, $state, $http, $scope, socket, $stateParams) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.$state = $state;
  
  }

  $onInit() {
    //this.$http.
    // get products details
    this.$http.get('/api/becomeaseller/byurl/'+this.purl)
        .then(response => {
		this.products = response.data;
		console.log(this.products);
	});
  }
 
}
