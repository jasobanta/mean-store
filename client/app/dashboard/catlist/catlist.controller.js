'use strict';

export default class CatlistController {
  categories: Object[];
  $state;
  $http;
  catid;
  $stateParams;
  category:Object[];
  submitted = false;
  newcategory: Object[];

  /*@ngInject*/
  constructor($state, $http,  $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  $onInit(){
    this.$http.get('/api/categories/pcats/asc')
    .then(response => {
      this.categories = response.data;
    });
    if(this.$stateParams.catid){
      this.$http.get('/api/categories/'+this.$stateParams.catid)
      .then(response => {
        this.category = response.data;
      });
    }
  }
  createCategory(form){
    this.submitted = true;
    if(form.$valid){
      if(this.category._id){
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
        .then(res =>{
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
}
