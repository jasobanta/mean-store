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
	itemsubcats: ObjectId[];
	typecats: ObjectId[];
	sizes;
	colors;
	materials;
	sku;
	skulist;
	setsubcates:Function;



	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
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
			  dimension: '',
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
			console.log(this.newSku);
			this.sku = {
				itemname: this.newSku.itemname,
				itemdescription: this.newSku.itemdescription,
				itemcode: this.newSku.itemcode,
				itemgroupcode: this.newSku.itemgroupcode,
				maincats: this.newSku.maincats._id,
				subcates: this.newSku.subcates._id,
				itemcats: this.newSku.itemcats._id,
				itemsubcats: this.newSku.itemsubcats._id,
				typecats: this.newSku.typecats._id,
				size: this.newSku.size._id,
				color: this.newSku.color._id,
				material:this.newSku.material._id,
				brands: this.newSku.brands._id,
				vendors: this.newSku.vendors._id,
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
				dimension: this.newSku.dimension,
				weight: this.newSku.weight,
				mop: this.newSku.mop,
				care: this.newSku.care,
				rtnship: this.newSku.rtnship,
				deliverytime: this.newSku.deliverytime,
				active: this.newSku.active,
				istopseller: this.newSku.istopseller
			};
			console.log(this.sku);
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
	setsubcats(cats,which){
		console.log(cats);
		var which = which;
		if (cats !== undefined && cats !== null) {
			this.$http.get(`/api/categories/listchildof/${cats._id}`)
			.then(subdata => {
				this[which] = subdata.data;
			});
		}
	}
  delete(sku) {
		this.$http.delete(`/api/products/${sku._id}`)
		.then(res => {
			this.$state.go('skulist');
		});
  }

}
