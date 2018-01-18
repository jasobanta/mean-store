'use strict';

export default class SizechartController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	newSizechart: Object[];	
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
		if(this.$stateParams.catid){
	      this.$http.get('/api/categories/'+this.$stateParams.catid)
	      .then(response => {
	        this.newSizechart = response.data;	 
	        console.log('newSizechart---',this.newSizechart);       
	      });
	    }else{
	      //
	      console.log('Invalid data. Item category not found.')
	    }
		
	}//init
	
	uploadHandler(file){
		if (file && !file.$error) {
      //this.skuNew.file = file;
//console.log('uploadHndler called here;........',this.Upload);
		var fileupload = this.Upload.upload({
      				//   url: '/api/products/'+this.newSizechart._id+'/upload',
		url: '/api/uploads/sizechartimage/'+this.newSizechart._id,
        file: file,
		data: {handle: 'itemcategory',childof: this.newSizechart._id, imagename:this.newSizechart.name.replace(' ','-')}
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
					/*if(this.newSizechart.images.length!=0){
						angular.forEach(this.newSizechart.images,function(value,key){
							images.push(value._id);
						},images);
					}*/
					//images.push(resp.data._id);
					this.newSizechart.sizechart=resp.data._id;
					// console.log('after push image',this.newSizechart);
					this.$http.put(`/api/categories/${this.newSizechart._id}`, this.newSizechart)
					.then(respro => {
					//	console.log('recoreded images relations with upload table',respro.data.images);
						this.$state.reload();
					});
				});
    }
	}
	addImages(form){
		if (form.file.$valid && this.newSizechart.file) {
			console.log('file==',this.newSizechart.file);
				this.uploadHandler(this.newSizechart.file,this.newSizechart._id);
			 } else {
				 // console.log(this.newSizechart.file);
			 }
	}

	removeImage() {
		console.log('remove image called');
		this.newSizechart.sizechart = null;
		this.$http.put(`/api/categories/${this.newSizechart._id}`,this.newSizechart)
		.then(res =>{
			// console.log(images);
		});
	}

	openModal(){
		console.log('open modal');
		this.$uibModal.open({component:'adminmenu'});
	}
 

}
