'use strict';

export default class ProductsController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	brand:Object[];
	newProduct: Object[];
	vendors: Object[];
	brands: Object[];
	maincats: Object[];
	listsubcat: Object[];
	listitemcats: Object[];
	listitemsubcats: ObjectId[];
	listtypecats: ObjectId[];
	


	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;

	}
	$onInit(){
		this.$http.get('/api/categories/list/isparent')
    .then(response => {
      this.maincats = response.data;
    });
		console.log(this.maincats);
		this.$http.get('/api/categories/list/issubcat')
    .then(response => {
      this.listsubcat = response.data;
    });
    this.$http.get('/api/categories/list/isitemcat')
    .then(response => {
      this.listitemcats = response.data;
    });
    this.$http.get('/api/categories/list/isitemsubcat')
    .then(response => {
      this.listitemsubcats = response.data;
    });
    this.$http.get('/api/categories/list/isitemtypecat')
    .then(response => {
      this.listtypecats = response.data;
    });
		if (this.$stateParams.id) {
			this.$http.get(`/api/brands/${this.$stateParams.id}`)
			.then(resbrand => {
				this.brand = resbrand.data;
			});

		}
		this.$http.get(`/api/vendors/`)
		.then(allvendors => {
			this.vendors = allvendors.data;
		});
		this.$http.get(`/api/brands`)
		.then(allbrands => {
			this.brands = allbrands.data;
		});

	}
	creatProduct(form) {
		this.submitted = true;
		if (form.$valid) {
			console.log(this.newProduct);

		} else {
		//	console.log('dfasdfsa');
			// do not do anything
		}
	}
  delete(brand) {
		this.$http.delete(`/api/brands/${brand._id}`)
		.then(res => {
			this.$state.go('brandlist');
		});
  }

}
