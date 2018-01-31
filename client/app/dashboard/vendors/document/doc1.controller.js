'use strict';

export default class Doc1Controller {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	newDoc1: Object[];	
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
	        this.newDoc1 = response.data;	 
	        console.log('newDoc1---',this.newDoc1);       
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
      				//   url: '/api/products/'+this.newDoc1._id+'/upload',
		url: '/api/uploads/doc1image/'+this.newDoc1._id,
        file: file,
		data: {handle: 'vendor',childof: this.newDoc1._id, imagename:this.newDoc1.name.replace(' ','-')}
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
					var images = [];
					/*if(this.newDoc1.images.length!=0){
						angular.forEach(this.newDoc1.images,function(value,key){
							images.push(value._id);
						},images);
					}*/
					//images.push(resp.data._id);
					this.newDoc1.doc1=resp.data._id;
					// console.log('after push image',this.newDoc1);
					this.$http.put(`/api/vendors/${this.newDoc1._id}`, this.newDoc1)
					.then(respro => {
					//	console.log('recoreded images relations with upload table',respro.data.images);
						this.$state.reload();
					});
				});
    }
	}
	addImages(form){
		if (form.file.$valid && this.newDoc1.file) {
			console.log('file==',this.newDoc1.file);
				this.uploadHandler(this.newDoc1.file,this.newDoc1._id);
			 } else {
				 // console.log(this.newDoc1.file);
			 }
	}

	removeImage() {
		console.log('remove image called');
		this.newDoc1.doc1 = null;
		this.$http.put(`/api/vendors/${this.newDoc1._id}`,this.newDoc1)
		.then(res =>{
			// console.log(images);
		});
	}

	openModal(){
		console.log('open modal');
		this.$uibModal.open({component:'adminmenu'});
	}
 

}
