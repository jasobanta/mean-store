'use strict';

export default class EventimageController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	newEventimage: Object[];	
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
		//fetch event data
		if(this.$stateParams.evtid){
	      this.$http.get('/api/events/'+this.$stateParams.evtid)
	      .then(response => {
	        this.newEventimage = response.data;	 
	        console.log('newEventimage---',this.newEventimage);       
	      });
	    }else{
	      //
	      console.log('Invalid data. Event image not found.')
	    }
		
	}//init
	
	uploadHandler(file){
		if (file && !file.$error) {
      //this.skuNew.file = file;
//console.log('uploadHndler called here;........',this.Upload);
		var fileupload = this.Upload.upload({
      				//   url: '/api/products/'+this.newEventimage._id+'/upload',
		url: '/api/uploads/eventimage/'+this.newEventimage._id,
        file: file,
		data: {handle: 'event',childof: this.newEventimage._id, imagename:this.newEventimage.name.replace(' ','-')}
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
					this.newEventimage.eventimage=resp.data._id;
					// console.log('after push image',this.newEventimage);
					this.$http.put(`/api/events/${this.newEventimage._id}`, this.newEventimage)
					.then(respro => {
					  this.$state.reload();
					});
				});
    }
	}
	addImages(form){
		if (form.file.$valid && this.newEventimage.file) {
			console.log('file==',this.newEventimage.file);
				this.uploadHandler(this.newEventimage.file,this.newEventimage._id);
			 } else {
				 // console.log(this.newEventimage.file);
			 }
	}

	removeImage() {
		console.log('remove image called');
		this.newEventimage.eventimage = null;
		this.$http.put(`/api/events/${this.newEventimage._id}`,this.newEventimage)
		.then(res =>{
			// console.log(images);
		});
	}
 

}
