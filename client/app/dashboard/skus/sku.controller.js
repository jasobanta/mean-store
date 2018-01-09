'use strict';

export default class SkuController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	brands:Object[];
	newSku: Object[];
	vendors: Object[];
	brands: Object[];
	maincats: Object[];
	subcates: Object[];
	itemcats: Object[];
	itemsubcats: Object[];
	typecats: Object[];
	sizes;
	colors;
	materials;
	sku;
	skulist;
	dimensions: Object[];
	setsubcates: Function;
	addImages : Function;
	uploadHandler: Function;
	Upload;


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
			this.sku = {
			  itemname: '',
			  itemdescription: '',
			  itemcode: '',
			  itemgroupcode: '',
			  maincats: null,
			  subcates: null,
			  itemcats: null,
			  itemsubcats: null,
			  typecats: null,
			  size: null,
			  color: null,
			  material:null,
			  brands: null,
			  vendors: null,
			  vendorscode: '',
			  stock: 0,
			  costprice: 0,
			  mrp: 0,
			  discount: 0,
			  saleprice: 0,
			  wsp: 0,
			  romq: 0,
			  womq: 0,
			  st: 0,
			  lengh: 0,
			  dimension: null,
			  weight: '',
			  mop: '',
			  care: '',
			  rtnship: '',
			  deliverytime: '',
			  active: true,
			  istopseller: false
			};

	}
	$onInit(){
		this.$http.get(`/api/products/`)
		.then(resprd => {
			this.skulist = resprd.data;
		});
		if (this.$stateParams.id) {
			this.$http.get(`/api/products/${this.$stateParams.id}`)
			.then(res => {
				this.newSku = res.data;
				this.newSku.file = '';
			/*	console.log('=================================');
				console.log(this.newSku);
				console.log('=================================');*/
				if (this.newSku.maincats) {
					this.setsubcats(this.newSku.maincats,'subcates');
					this.setsubcats(this.newSku.subcates,'itemcats');
					this.setsubcats(this.newSku.itemcats,'itemsubcats');
					this.setsubcats(this.newSku.itemsubcats,'typecats');
				}
			});
		}
	}
	creatSku(form) {
		this.submitted = true;
		if (form.$valid) {
		//	console.log(this.newSku);
			this.sku = {
				itemname: this.newSku.itemname,
				itemdescription: this.newSku.itemdescription,
				itemcode: this.newSku.itemcode,
				itemgroupcode: this.newSku.itemgroupcode,
				vendorscode: this.newSku.vendorscode,
				stock: this.newSku.stock,
				costprice: this.newSku.costprice,
				mrp: this.newSku.mrp,
				discount: this.newSku.discount,
				saleprice: this.newSku.saleprice,
				wsp: this.newSku.wsp,
				romq: this.newSku.romq,
				womq: this.newSku.womq,
				st: this.newSku.st,
				lengh: this.newSku.lengh,
				weight: this.newSku.weight,
				mop: this.newSku.mop,
				care: this.newSku.care,
				rtnship: this.newSku.rtnship,
				deliverytime: this.newSku.deliverytime,
				active: this.newSku.active,
				istopseller: this.newSku.istopseller
			};
			this.sku.maincats = this.newSku.maincats? this.newSku.maincats._id: null;
			this.sku.subcates = this.newSku.subcates? this.newSku.subcates._id: null;
			this.sku.itemcats = this.newSku.itemcats? this.newSku.itemcats._id: null;
			this.sku.itemsubcats = this.newSku.itemsubcats?this.newSku.itemsubcats._id: null;
			this.sku.typecats = this.newSku.typecats? this.newSku.typecats._id :null;
			this.sku.size = this.newSku.size?this.newSku.size._id : null;
			this.sku.color = this.newSku.color?this.newSku.color._id : null;
			this.sku.dimension = this.newSku.dimension? this.newSku.dimension._id: null;
			this.sku.material = this.newSku.material?this.newSku.material._id : null;
			this.sku.brands = this.newSku.brands ? this.newSku.brands._id : null;
			this.sku.vendors = this.newSku.vendors?this.newSku.vendors._id : null;


			// console.log(this.sku);
			if (this.newSku._id) {
				this.$http.put(`/api/products/${this.newSku._id}`,this.sku)
				.then(res => {
					this.$state.go('skulist');
				});
			} else {
				this.$http.post(`/api/products/`,this.sku)
				.then(res => {
					this.$state.go('skulist');
				});
			}

		} else {
		//	console.log('dfasdfsa');
			// do not do anything
		}
	}
	uploadHandler(file){
		if (file && !file.$error) {
      //this.skuNew.file = file;
//console.log('uploadHndler called here;........',this.Upload);
			this.Upload.upload({
        url: '/api/products/'+this.newSku._id+'/upload',
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

	if (form.file.$valid && this.newSku.file) {
			this.uploadHandler(this.newSku.file,this.newSku._id);
			this.$state.reload();
		 } else {
			 // console.log(this.newSku.file);
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
		this.newSku.images.splice(idx,1);
		this.$http.put(`/api/products/${this.newSku._id}`,this.newSku)
		.then(res =>{
			// console.log(images);
		});
	}
  delete(sku) {
		this.$http.delete(`/api/products/${sku._id}`)
		.then(res => {
			this.$state.go('skulist');
		});
  }

}