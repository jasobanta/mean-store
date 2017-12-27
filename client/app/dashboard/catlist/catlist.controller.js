'use strict';

export default class CatlistController {
  categories: Object[];
  $state;
  $http;
  catid;
  $stateParams;
  category:Object[];


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

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
