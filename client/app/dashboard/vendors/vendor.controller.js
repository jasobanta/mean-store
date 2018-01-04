'use strict';

export default class VendorController {
	$http;
	$state;
	$timeout;
	$stateParams;
	vendortype: Object[];
	submitted = false;
	newVendor: Object[];
	successMessage = '';
	errorMessage = '';
	vendorlist : Object[];
	valueLists: Object[];
	message : Object[];
	vmaster: Object[];

	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		this.$http.get('/api/masters/getbyname/vendortype')
		.then(res => {
			this.vmaster = res.data[0];
			this.$http.get(`/api/masterattrs/childof/${this.vmaster._id}`)
			.then(vtype =>{
				this.vendortype = vtype.data;
			});
		});
		/*this.vendortype = [
			{title: 'Proprietor', type: 'proprietor'},
			{title: 'Partnership', type: 'partnership'},
			{title: 'Pvt Ltd', type: 'pvtltd'},
			{title: 'Firm', type: 'firm'}
		];*/
		//console.log(this.vendortype);
	}
	$onInit(){
		this.$http.get(`/api/vendors/`)
		.then(allvenders => {
			this.vendorlist = allvenders.data;
		});
		if (this.$stateParams.id) {
			this.$http.get(`/api/vendors/${this.$stateParams.id}`)
			.then(selectedVendor => {
				this.newVendor = selectedVendor.data;
			});
		}

	}
	creatVendor(form) {
		this.submitted = true;
		if (form.$valid) {
			if (this.newVendor._id) {
				this.$http.put(`/api/vendors/${this.newVendor._id}`,this.newVendor)
				.then(vendor => {
				this.$state.go('vendorlist');
			});

			} else {
				this.$http.post('/api/vendors/',this.newVendor)
				.then(vendor => {
				this.$state.go('vendorlist');
			});
			}
	} else {
		console.log('invalid vendor form submited.');
	}
}
delete(vendor) {
	this.$http.delete(`/api/vendors/${vendor._id}`)
	.then(res => {
		this.$state.go('vendorlist');
	});
//	console.log(`${vendor._id}`);
}

}
