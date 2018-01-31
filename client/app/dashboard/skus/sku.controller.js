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
	$uibModal;
	textattributes;
	page=1;
	successMessage='';
	paged;
	skip=0;



	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams, Upload, $uibModal) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		this.Upload = Upload;
		this.$uibModal = $uibModal;
		this.textattributes = [];
		// this.textattributes.push({label: '', value: ''});
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
		this.$http.get('/api/masters/getbyname/mop')
		.then(res => {
			this.$http.get(`/api/masterattrs/childof/${res.data[0]._id}`)
			.then(mop =>{
				this.mop = mop.data;
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
			  hsncode: 0,
			  gst: 0,
			  lengh: 0,
			  dimension: null,
			  weight: '',
			  mop: null,
			  care: '',
			  rtnship: '',
			  deliverytime: '',
			  active: true,
			  istopseller: false,
			  isexclusive: false,
			  userlike: 100,
			  textattributes: {},
			};

	}
	$onInit(){

		this.$http.get(`/api/products/paged`)
		.then(resprd => {
			this.paged = resprd.data;
			this.page = this.paged.pages || 1;
			this.skip = (this.page - 1 )*this.paged.limit;
			this.$http.get(`/api/products/admin/${this.page}`)
			.then(resprd => {
				this.skulist = resprd.data;
			});
		});
		if (this.$stateParams.id) {
			this.$http.get(`/api/products/${this.$stateParams.id}`)
			.then(res => {
				this.newSku = res.data;
				// console.log(this.newSku.images);
				this.textattributes = this.newSku.textattributes;
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
		 this.userlike = Math.floor(Math.random()*(300-90+1)+90);
		 var textattributes = [];
		 angular.forEach(this.textattributes,function(value,key){
			 if(value.value!=="")
			 textattributes.push(value);
		 },textattributes);
		 this.textattributes = textattributes;
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
				hsncode: this.newSku.hsncode,
				gst: this.newSku.gst,
				lengh: this.newSku.lengh,
				weight: this.newSku.weight,
				care: this.newSku.care,
				rtnship: this.newSku.rtnship,
				deliverytime: this.newSku.deliverytime,
				active: this.newSku.active,
				istopseller: this.newSku.istopseller,
				isexclusive: this.newSku.isexclusive,
				userlike: this.userlike,
				textattributes: this.textattributes,
			};
			this.sku.maincats = this.newSku.maincats? this.newSku.maincats._id: null;
			this.sku.subcates = this.newSku.subcates? this.newSku.subcates._id: null;
			this.sku.itemcats = this.newSku.itemcats? this.newSku.itemcats._id: null;
			this.sku.itemsubcats = this.newSku.itemsubcats?this.newSku.itemsubcats._id: null;
			this.sku.typecats = this.newSku.typecats? this.newSku.typecats._id :null;
			this.sku.size = this.newSku.size?this.newSku.size._id : null;
			this.sku.color = this.newSku.color?this.newSku.color._id : null;
			this.sku.dimension = this.newSku.dimension? this.newSku.dimension._id: null;
			this.sku.mop = this.newSku.mop? this.newSku.mop._id: null;
			this.sku.material = this.newSku.material?this.newSku.material._id : null;
			this.sku.brands = this.newSku.brands ? this.newSku.brands._id : null;
			this.sku.vendors = this.newSku.vendors?this.newSku.vendors._id : null;


			// console.log(this.sku);
			if (this.newSku._id) {
				this.$http.put(`/api/products/${this.newSku._id}`,this.sku)
				.then(res => {
				//	this.$state.go('skulist');
				this.$state.go('skusearch',{itemgroupcode:res.data.itemgroupcode, itemcode: res.data.itemcode});
				});
			} else {
				this.$http.post(`/api/products/`,this.sku)
				.then(res => {
					//this.$state.go('skulist');
					this.$state.go('skusearch',{itemgroupcode:res.data.itemgroupcode, itemcode: res.data.itemcode});
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
			var fileupload = this.Upload.upload({
      //   url: '/api/products/'+this.newSku._id+'/upload',
				url: '/api/uploads/products/'+this.newSku._id,
        file: file,
				data: {handle: 'products',childof: this.newSku._id,imagename:this.newSku.itemname.split(' ').join('-')+'-'+this.newSku.color.name, order: this.newSku.order}
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
					if(this.newSku.images.length!=0){
						angular.forEach(this.newSku.images,function(value,key){
							images.push(value._id);
						},images);
					}
					images.push(resp.data._id);
					this.newSku.images=images;
					// console.log('after push image',this.newSku);
					this.$http.put(`/api/products/${this.newSku._id}`, this.newSku)
					.then(respro => {
					//	console.log('recoreded images relations with upload table',respro.data.images);
						this.$state.reload();
					});
				});
    }
	}
addImages(form){
	this.submitted = true;
	if(form.$valid){
		if (form.file.$valid && this.newSku.file) {
			this.uploadHandler(this.newSku.file,this.newSku._id);
		 } else {
			 // console.log(this.newSku.file);
		 }
	}
}
updateOrder(imgId,pOrder){
//	console.log('--order form pp ', imgId + '--'+pOrder);
	if(pOrder != undefined || pOrder != null){

		this.$http.put(`/api/uploads/${imgId}`,{order: pOrder})
		.then(res => {
			console.log('res.data==',res.data);
			var resData = res.data;
			this.$http.get(`/api/products/${resData.childof}`)
			.then(res => {

					this.newSku = [];
					this.newSku = res.data;
					this.successMessage = 'Modification has been done!';
			});
		});
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
	calculateDiscount(){
	this.newSku.discount = Math.round((this.newSku.mrp - this.newSku.saleprice)/this.newSku.mrp *100);
//	console.log(this.newSku.discount);
	}
	calculateSalesprice(){
	this.newSku.saleprice = Math.round(this.newSku.mrp * (100-this.newSku.discount)/100);
//	console.log(this.newSku.discount);
	}
	openModal(){
//console.log('open modal');
	this.$uibModal.open({component:'adminmenu'});
	}
	addMoreTextattributes(){
	//	console.log(this.newSku);
		this.textattributes.push({label: '', value: ''});
	}
	changePage(){
		this.skulist = {};
		//this.page = page;
		this.skip = (this.page - 1 )*this.paged.limit;
		this.$http.get(`/api/products/admin/${this.page}`)
		.then(resprd => {
			this.skulist = resprd.data;
		});

	}
  delete(sku) {
		this.$http.delete(`/api/products/${sku._id}`)
		.then(res => {
			this.$state.go('skulist');
		});
  }

}
