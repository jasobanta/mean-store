'use strict';

export default class BrandController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	brand:Object[];
	newBrand: Object[];
	vendors: Object[];
	brands: Object[];

	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;

		

	}
	$onInit(){
		this.$http.get(`/api/brands`)
		.then(allbrands => {
			this.brands = allbrands.data;
		});

		if (this.$stateParams.id) {
			console.log('brand id='+this.$stateParams.id)
			this.$http.get(`/api/brands/${this.$stateParams.id}`)
			.then(resbrand => {
				this.newBrand = resbrand.data;
			});

		}
		this.$http.get(`/api/vendors/`)
		.then(allvendors => {
			this.vendors = allvendors.data;
		});

	}
	creatBrand(form) {
		this.submitted = true;
		if (form.$valid) {
			console.log(this.newBrand);
			if (this.newBrand._id) {
				this.$http.put(`/api/brands/${this.newBrand._id}`, this.newBrand)
				.then(resbrand => {
					this.$state.go('brandlist');
				});
			} else {
				this.$http.post(`/api/brands/`, this.newBrand)
				.then(resbrand => {
					this.$state.go('brandlist');
				});
			}

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
