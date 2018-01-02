'use strict';

export default class CatlistController {
  categories: Object[];
  listsubcat: Object[];
  listitemcats: Object[];
  listitemsubcats: ObjectId[];
  $state;
  $http;
  catid;
  $stateParams;
  category:Object[];
  submitted = false;
  newcategory: Object[];
  rootcatsubmitted = false;
  rootcat: Object[];
  rootcatMessage = '';
  orders: Object[];
  index = '';
  /*@ngInject*/
  constructor($state, $http,  $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  $onInit(){
    this.$http.get('/api/orders/')
    .then(response => {
      this.orders = response.data;
    });
    this.$http.get('/api/categories/pcats/asc')
    .then(response => {
      this.categories = response.data;
    });
    this.$http.get('/api/categories/list/issubcat')
    .then(response => {
      this.listsubcat = response.data;
    });
    this.$http.get('/api/categories/list/isitemcat')
    .then(response => {
      this.listitemcats = response.data;
    });
    this.$http.get('/api/categories/list/isitemsubcat')
    .then(response => {
      this.listitemsubcats = response.data;
    });
    if(this.$stateParams.catid){
      this.$http.get('/api/categories/'+this.$stateParams.catid)
      .then(response => {
        this.category = response.data;
        this.rootcat = response.data;
      });
    }else{
      //
      this.rootcat = {name: '', isparent: true, sort: '', active: false};
    }
  }
  createCategory(form){
    this.submitted = true;
    if(form.$valid){
      if(this.category._id) {
        if(this.category.isparent){
          this.category.ischildof=null;
        }
        this.$http.put('/api/categories/'+this.category._id, this.category)
        .then(res=> {
          this.newcategory = res.data;
          if(this.newcategory.ischildof){
            console.log('go for new relation with childs');
            this.$http.get('/api/categories/'+this.newcategory.ischildof)
            .then(result=> {
              var catedata = result.data;
              if(catedata.childs.indexOf(this.newcategory._id) === -1) {
                catedata.childs.push(this.newcategory._id);
              }
              this.$http.put('/api/categories/'+catedata._id,catedata)
              .then(fres =>{
                this.$state.reload();
              });
            });
          }
        });
        //update category here
      }else{
        // create new
        if(this.category.isparent){
          this.category.ischildof=null;
        }
        this.$http.post('/api/categories',this.category)
        .then(res => {
          this.newcategory = res.data;
          if(this.newcategory.ischildof){
            console.log('go for new relation with childs');
            this.$http.get('/api/categories/'+this.newcategory.ischildof)
            .then(result=> {
              var catedata = result.data;
              if(catedata.childs.indexOf(this.newcategory._id) === -1) {
                catedata.childs.push(this.newcategory._id);
              }
              this.$http.put('/api/categories/'+catedata._id,catedata)
              .then(fres =>{
                this.$state.reload();
              });
            });
          }
        });
      }
      //   console.log('create update category');
    }else{
    //   console.log('do inform about invalide message');
    }
  }
createRootCat(form){
this.rootcatsubmitted = true;

  if(form.$valid) {
    if(this.rootcat._id) {
      this.rootcat.isparent = true;
      this.rootcat.ischildof = null;
      this.$http.put('/api/categories/'+this.rootcat._id,this.rootcat)
      .then(cat => {
        this.rootcatMessage = 'A new main category '+cat.data.name+' has been updated.';
        this.rootcatsubmitted = false;
        this.$state.go('rootcatlist');
      });
    }
    else {
      this.rootcat.isparent = true;
      this.rootcat.ischildof = null;
      this.$http.post('/api/categories/',this.rootcat)
      .then(cat => {
        this.rootcatMessage = 'A new main category '+cat.data.name+' has been created.';
        this.rootcat = {name: '', isparent: true, sort: '', active: false, ischildof: ''};
        this.rootcatsubmitted = false;
        this.$state.go('rootcatlist');
      });
    }
    console.log('root cate data valid proceed for save');
  }else {
    console.log('root cate data not valid proceed for save');
    // form has error
  }
}
createSubCategory(form){
this.submitted = true;
  if(form.$valid) {
    if(this.category._id) {
      this.category.isparent = false;
      this.category.issubcat = true;
      this.$http.put('/api/categories/'+this.category._id, this.category)
      .then(res=> {
        this.newcategory = res.data;
        if(this.newcategory.ischildof){
          console.log('go for new relation with childs');
          this.$http.get('/api/categories/'+this.newcategory.ischildof)
          .then(result=> {
            var catedata = result.data;
            if(catedata.childs.indexOf(this.newcategory._id) === -1) {
              catedata.childs.push(this.newcategory._id);
            }
            this.$http.put('/api/categories/'+catedata._id,catedata)
            .then(fres =>{
              this.$state.go('subcategorylist');
              //console.log(fres);
            });
          });
        }
      });
    }
    else {
      this.category.isparent = false;
      this.category.issubcat = true;
      this.$http.post('/api/categories',this.category)
      .then(res => {
        this.newcategory = res.data;
        if(this.newcategory.ischildof){
          console.log('go for new relation with childs');
          this.$http.get('/api/categories/'+this.newcategory.ischildof)
          .then(result=> {
            var catedata = result.data;
            if(catedata.childs.indexOf(this.newcategory._id) === -1) {
              catedata.childs.push(this.newcategory._id);
            }
            this.$http.put('/api/categories/'+catedata._id,catedata)
            .then(fres =>{
              this.$state.go('subcategorylist');
              //console.log(fres);
            });
          });
        }
      });
    }
    console.log(this.category);
  }else {
    console.log(this.category);
  }
}
createItemCategory(form){
this.submitted = true;
  if(form.$valid) {
    if(this.category._id) {
      this.category.isparent = false;
      this.category.isitemcat = true;
      this.$http.put('/api/categories/'+this.category._id, this.category)
      .then(res=> {
        this.newcategory = res.data;
        if(this.newcategory.ischildof){
          console.log('go for new relation with childs');
          this.$http.get('/api/categories/'+this.newcategory.ischildof)
          .then(result=> {
            var catedata = result.data;
            if(catedata.childs.indexOf(this.newcategory._id) === -1) {
              catedata.childs.push(this.newcategory._id);
            }
            this.$http.put('/api/categories/'+catedata._id,catedata)
            .then(fres =>{
              this.$state.go('itemcategorylist');
              //console.log(fres);
            });
          });
        }
      });
      console.log('update category with data',this.category);
    }
    else {
      this.category.isparent = false;
      this.category.isitemcat = true;
      this.$http.post('/api/categories',this.category)
      .then(res => {
        this.newcategory = res.data;
        if(this.newcategory.ischildof){
          console.log('go for new relation with childs');
          this.$http.get('/api/categories/'+this.newcategory.ischildof)
          .then(result=> {
            var catedata = result.data;
            if(catedata.childs.indexOf(this.newcategory._id) === -1) {
              catedata.childs.push(this.newcategory._id);
            }
            this.$http.put('/api/categories/'+catedata._id,catedata)
            .then(fres =>{
              this.$state.go('itemcategorylist');
              //console.log(fres);
            });
          });
        }
      });
      console.log('create category with data',this.category);
    }
    // console.log(this.index);
  }else {
     console.log('problem',this.category);
  }
}
createItemSubCategory(form){
this.submitted = true;
  if(form.$valid) {
    if(this.category._id) {
      this.category.isitemsubcat = true;
      this.$http.put('/api/categories/'+this.category._id, this.category)
      .then(res=> {
        this.newcategory = res.data;
        if(this.newcategory.ischildof){
          console.log('go for new relation with childs');
          this.$http.get('/api/categories/'+this.newcategory.ischildof)
          .then(result=> {
            var catedata = result.data;
            if(catedata.childs.indexOf(this.newcategory._id) === -1) {
              catedata.childs.push(this.newcategory._id);
            }
            this.$http.put('/api/categories/'+catedata._id,catedata)
            .then(fres =>{
              this.$state.go('itemsubcategorylist');
              //console.log(fres);
            });
          });
        }
      });
      console.log('update category with data',this.category);
    }
    else {
      this.category.isitemsubcat = true;
      this.$http.post('/api/categories',this.category)
      .then(res => {
        this.newcategory = res.data;
        if(this.newcategory.ischildof){
          console.log('go for new relation with childs');
          this.$http.get('/api/categories/'+this.newcategory.ischildof)
          .then(result=> {
            var catedata = result.data;
            if(catedata.childs.indexOf(this.newcategory._id) === -1) {
              catedata.childs.push(this.newcategory._id);
            }
            this.$http.put('/api/categories/'+catedata._id,catedata)
            .then(fres =>{
              this.$state.go('itemsubcategorylist');
              //console.log(fres);
            });
          });
        }
      });
      console.log('create category with data',this.category);
    }
    // console.log(this.index);
  }else {
     console.log('problem',this.category);
  }
}
deleteCategory(category,goto) {
  this.$http.delete(`/api/categories/${category._id}`)
  .then(delres => {
    this.$state.go(goto);
  });
}
goto(pgoto){
  this.$state.go(pgoto);

}

}
