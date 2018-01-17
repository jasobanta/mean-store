'use strict';

export default class SkuCopyController {
  $http;
  $state;
  $timeout;
  $stateParams;
  submitted = false;
  oldSku;
  newSku;
  userlike;
  sky;
  setsubcats:Function;
  errorMessage = '';
  /*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
    this.$http = $http;
    this.$state = $state;
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


  }
  $onInit(){
    if(this.$stateParams.id){
      this.$http.get(`/api/products/${this.$stateParams.id}`)
      .then(res => {
        this.oldSku = res.data;
        this.newSku = this.oldSku;
        Reflect.deleteProperty(this.newSku, '_id');
        //console.log(this.newSku);
        if (this.newSku.maincats) {
          this.setsubcats(this.newSku.maincats,'subcates');
          this.setsubcats(this.newSku.subcates,'itemcats');
          this.setsubcats(this.newSku.itemcats,'itemsubcats');
          this.setsubcats(this.newSku.itemsubcats,'typecats');
        }
        //this.newSku
      });
    }
  }
  creatCopySku(form){
    this.submitted = true;
    if (form.$valid) {
    //	console.log(this.newSku);
     this.userlike = Math.floor(Math.random()*(300-90+1)+90);
     var textattributes = [];
     angular.forEach(this.newSku.textattributes,function(value,key){
       if(value.value!=="")
       textattributes.push(value);
     },textattributes);
     this.newSku.textattributes = textattributes;

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
        care: this.newSku.care,
        rtnship: this.newSku.rtnship,
        deliverytime: this.newSku.deliverytime,
        active: this.newSku.active,
        istopseller: this.newSku.istopseller,
        isexclusive: this.newSku.isexclusive,
        userlike:this.userlike,
        textattributes: this.newSku.textattributes,

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

        this.$http.post(`/api/products/`,this.sku)
        .then(res => {
          this.$state.go('skulist');
        });

    } else {
    //	console.log('dfasdfsa');
      // do not do anything
    }
  }
  addMoreTextattributes(){
  //	console.log(this.newSku);
    this.newSku.textattributes.push({label: '', value: ''});
  }
  setActive(attr) {
    if (attr==='size') {
      if (this.newSku.size.name === this.oldSku.size.name) {
        this.newSku.active = false;
      }
    }else {
      this.newSku.active = true;
    }
    console.log(this.newSku.active);
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

}
