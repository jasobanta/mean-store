'use strict';

export default class EnquiryController {
	$http;
	$state;
	$timeout;
	$stateParams;
	enquirytype: Object[];
	submitted = false;
	newEnquiry: Object[];
	enquirylist : Object[];


	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;

		
	}
	$onInit(){
/*	   this.$http.get('/api/masters/getbyname/enquirytype')
		.then(res => {
			this.vmaster = res.data[0];
			this.$http.get(`/api/masterattrs/childof/${this.vmaster._id}`)
			.then(vtype =>{
				this.enquirytype = vtype.data;
			});
		});
*/
		this.$http.get(`/api/enquirys/`)
		.then(allenquiries => {
			this.enquirylist = allenquiries.data;
			console.log('enquirylist',this.enquirylist);
		});
		
		if (this.$stateParams.id) {
			this.$http.get(`/api/enquirys/${this.$stateParams.id}`)
			.then(selectedEnquiry => {
				this.newEnquiry = selectedEnquiry.data;
			});
		}

	}
	

}
