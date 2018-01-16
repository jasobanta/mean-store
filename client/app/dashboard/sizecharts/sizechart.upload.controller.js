'use strict';

export default class SizechartUploadController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	brands:Object[];
	newDatafile: Object[];
	vendors: Object[];
	brands: Object[];
	maincats: Object[];
	subcates: Object[];
	itemcats: Object[];
	itemsubcats: Object[];
	typecats: Object[];
	bulkupload;
	bulkuploadlist;
	setsubcates: Function;
	addImages : Function;
	uploadHandler: Function;
	Upload;
	datafile;


	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams, Upload) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		this.Upload = Upload;
		this.$http.get('/api/categories/list/isparent')
    .then(response => {
      this.maincats = response.data;
    });
		this.$http.get('/api/vendors/')
    .then(response => {
      this.vendors = response.data;
    });
		this.$http.get('/api/brands/')
    .then(response => {
      this.brands = response.data;
    });
		this.$http.get('/api/masters/getbyname/size')
		.then(res => {
			this.$http.get(`/api/masterattrs/childof/${res.data[0]._id}`)
			.then(size =>{
				this.sizes = size.data;
			});
		});
		this.$http.get('/api/masters/getbyname/color')
		.then(res => {
			this.$http.get(`/api/masterattrs/childof/${res.data[0]._id}`)
			.then(size =>{
				this.colors = size.data;
			});
		});
		this.$http.get('/api/masters/getbyname/Material')
		.then(res => {
			this.$http.get(`/api/masterattrs/childof/${res.data[0]._id}`)
			.then(size =>{
				this.materials = size.data;
			});
		});
		this.$http.get('/api/masters/getbyname/Packaging Dimension')
		.then(res => {
			this.$http.get(`/api/masterattrs/childof/${res.data[0]._id}`)
			.then(size =>{
				this.dimensions = size.data;
			});
		});
			//	console.log(this.maincats);.
			//get one empty instance of sky
			this.Datafile = {
			  maincats: null,
			  subcates: null,
			  itemcats: null,
			  itemsubcats: null,
			  typecats: null,
				datafile:''
			};

	}
	$onInit(){
	}
	creatsizechart(form) {
		this.submitted = true;
		if (form.$valid) {
		//	console.log(this.newDatafile);
		//	console.log(this.maincats);.
		//get one empty instance of sky
		this.Datafile = {};
		this.Datafile.maincats = this.newDatafile.maincats? this.newDatafile.maincats._id: null;
		this.Datafile.subcates = this.newDatafile.subcates? this.newDatafile.subcates._id: null;
		this.Datafile.itemcats = this.newDatafile.itemcats? this.newDatafile.itemcats._id: null;
		this.Datafile.itemsubcats = this.newDatafile.itemsubcats?this.newDatafile.itemsubcats._id: null;
		this.Datafile.typecats = this.newDatafile.typecats? this.newDatafile.typecats._id :null;



			// console.log(this.sizechart);
			if (this.newDatafile._id) {
				this.$http.put(`/api/products/${this.newDatafile._id}`,this.sizechart)
				.then(res => {
					this.$state.go('sizechartlist');
				});
			} else {
				this.$http.post(`/api/products/`,this.sizechart)
				.then(res => {
					this.$state.go('sizechartlist');
				});
			}

		} else {
		//	console.log('dfasdfsa');
			// do not do anything
		}
	}
	uploadHandler(file){
		if (file && !file.$error) {
      //this.sizechartNew.file = file;
//console.log('uploadHndler called here;........',this.Upload);
			this.Upload.upload({
        url: '/api/products/'+this.newDatafile._id+'/upload',
        file: file
      }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ');
						console.log(data);
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    }
	}
	// upload on file select or drop
/* upload = function (file) {
    this.Upload.upload({
				method: 'POST',
         url: '/api/uploads/',
         data: {file: file}
     }).then(function (resp) {
         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
     }, function (resp) {
         console.log('Error status: ' + resp.status);
     }, function (evt) {
         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
     });
 };*/
addImages(form){

	if (form.file.$valid && this.newDatafile.file) {
			this.uploadHandler(this.newDatafile.file,this.newDatafile._id);
			this.$state.reload();
		 } else {
			 // console.log(this.newDatafile.file);
		 }
}
setsubcats(cats,which){
		// console.log(cats);
		var which = which;
		if (cats !== undefined && cats !== null) {
			this.$http.get(`/api/categories/listchildof/${cats._id}`)
			.then(subdata => {
				this[which] = subdata.data;
			});
		}
	}
	removeImage(idx) {
		this.newDatafile.images.splice(idx,1);
		this.$http.put(`/api/products/${this.newDatafile._id}`,this.newDatafile)
		.then(res =>{
			// console.log(images);
		});
	}
  delete(sizechart) {
		this.$http.delete(`/api/products/${sizechart._id}`)
		.then(res => {
			this.$state.go('sizechartlist');
		});
  }

}
