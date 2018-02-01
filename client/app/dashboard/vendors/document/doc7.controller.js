'use strict';

export default class doc7Controller {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	newDoc7: Object[];	
	addImages : Function;
	uploadHandler: Function;
	removeImage : Function;
	Upload;
	$uibModal;


	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams, Upload, $uibModal) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		this.Upload = Upload;
		this.$uibModal = $uibModal;
	}

	$onInit(){

		//fetch category data
		if(this.$stateParams.vendorid){
	      this.$http.get('/api/vendors/'+this.$stateParams.vendorid)
	      .then(response => {
	         this.newDoc7 = {};
	         this.newDoc7 = response.data;
	        console.log('newDoc7--##---',this.newDoc7);       
	      });
	    }else{
	      //
	      console.log('Invalid data. Vedor deatils not found.')
	    }
		
	}//init
	
	uploadHandler(file){
		if (file && !file.$error) {
      //this.skuNew.file = file;
//console.log('uploadHndler called here;........',this.Upload);
		var fileupload = this.Upload.upload({
      				//   url: '/api/products/'+this.newDoc7._id+'/upload',
		url: '/api/uploads/docimage/'+this.newDoc7._id,
        file: file,
		data: {handle: 'vendor',childof: this.newDoc7._id, imagename: 'doc7'}
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
        //  return data;
		}).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        });
				fileupload.then(resp =>{
					console.log(resp.data);
					//var images = [];
					/*if(this.newDoc7.images.length!=0){
						angular.forEach(this.newDoc7.images,function(value,key){
							images.push(value._id);
						},images);
					}*/
					//images.push(resp.data._id);
					
					this.newDoc7.doc7=resp.data._id;
					// console.log('after push image',this.newDoc7);
					this.$http.put(`/api/vendors/${this.newDoc7._id}`, this.newDoc7)
					.then(respro => {
					//	console.log('recoreded images relations with upload table',respro.data.images);
					    this.newDoc7 = {};
					    this.$state.reload();
					    //this.gotoAddVendor();
					    //this.$state.go('vendorsetting-add',{id:this.newDoc7._id});
					});
				});
    }
	}
	addImages(form){
		this.submitted = true;
		if(form.$valid){
			if (form.file.$valid && this.newDoc7.file) {
			console.log('file==',this.newDoc7.file);
				this.uploadHandler(this.newDoc7.file,this.newDoc7._id);
			 } else {
				 // console.log(this.newDoc7.file);
			 }
		}			
	}

	removeImage() {
		console.log('remove image called');
		this.newDoc7.doc7 = null;
		this.$http.put(`/api/vendors/${this.newDoc7._id}`,this.newDoc7)
		.then(res =>{
			// console.log(images);
			this.$state.reload();
		});
	}

	openModal(){
		console.log('open modal');
		this.$uibModal.open({component:'adminmenu'});
	}
 	
	gotoAddVendor(){
		this.$state.go('vendorsetting-add',{id:this.newDoc7._id});
		this.$http.get(`/api/vendors/${this.newDoc7._id}`)
		.then(res =>{
			console.log('vendor edit called');

		});
	}


}
