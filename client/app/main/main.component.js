import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';
  newwardrobe = [];
  featuredwestern = [];
  featuredethnic = [];
  featuredlingerie = [];
  featuredfashion = [];
  newarrivalslider = [];
  homeslider = [];
  peoplesay = [];
  favouritedestination = [];
  homedecor = [];


  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {

    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
      this.newwardrobe = [
        {name: 'Dresses under', img: '/assets/images/bannerimages/dress-new-arrival-dorbby.jpg', rs:' 699', url: ''},
        {name: 'Dresses under', img: '/assets/images/bannerimages/lingirie-new-arrival-dorbby.jpg', rs:' 699', url: ''},
        {name: 'Dresses under', img: '/assets/images/bannerimages/earrings-new-arrival-dorbby.jpg', rs:' 699', url: ''},
        {name: 'Dresses under', img: '/assets/images/bannerimages/denim-new-arrival-dorbby.jpg', rs:' 699', url: ''},
        {name: 'Dresses under', img: '/assets/images/bannerimages/tops-new-arrival-dorbby.jpg', rs:' 699', url: ''},
        {name: 'Dresses under', img: '/assets/images/bannerimages/ethini-new-arrival-dorbby.jpg', rs:' 699', url: ''},

      ];
      this.featuredwestern = [
        {name: 'Western under ', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress1-dorbby.jpg', url:'#'},
        {name: 'Western under ', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress2-dorbby.jpg', url:'#'},
        {name: 'Western under ', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress3-dorbby.jpg', url:'#'},
        {name: 'Western under ', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress4-dorbby.jpg', url:'#'},
      ];
      this.featuredethnic = [
        {name: 'Ethinic under ',rs: ' 789', img: '/assets/images/bannerimages/ethinic-dress1-dorbby.jpg', url: ''},
        {name: 'Ethinic under ',rs: ' 789', img: '/assets/images/bannerimages/ethinic-dress2-dorbby.jpg', url: ''},
        {name: 'Ethinic under ',rs: ' 789', img: '/assets/images/bannerimages/ethinic-dress3-dorbby.jpg', url: ''},
        {name: 'Ethinic under ',rs: ' 789', img: '/assets/images/bannerimages/ethinic-dress4-dorbby.jpg', url: ''},
      ];
      this.featuredlingerie = [
        {name: 'Linirie under ', rs: ' 568',img: '/assets/images/bannerimages/Banner-lingerie1-Dorbby.jpg', url: ''},
        {name: 'Linirie under ', rs: ' 568',img: '/assets/images/bannerimages/Banner-lingerie2-Dorbby.jpg', url: ''},
        {name: 'Linirie under ', rs: ' 568',img: '/assets/images/bannerimages/Banner-lingerie3-Dorbby.jpg', url: ''},
        {name: 'Linirie under ', rs: ' 568',img: '/assets/images/bannerimages/Banner-lingerie4-Dorbby.jpg', url: ''}
      ];
      this.featuredfashion = [
        {name: 'Bags under ', rs:' 568', img: '/assets/images/bannerimages/Banner-Bag-Dorbby.jpg', url: ''},
        {name: 'Bags under ', rs:' 568', img: '/assets/images/bannerimages/Banner-Bag1-Dorbby.jpg', url: ''},
        {name: 'Jewellery under ', rs:' 568', img: '/assets/images/bannerimages/Banner-Jewellrey-Earrings-Dorbby.jpg', url: ''},
        {name: 'Jewellery under ', rs:' 568', img: '/assets/images/bannerimages/Banner-Earrings-Jewellrey-Dorbby.jpg', url: ''},
      ];
      this.newarrivalslider = [
        {img:'/assets/images/bannerimages/denim-dorbby.jpg',url:'#', class:'item active'},
        {img:'/assets/images/bannerimages/scarf-dorbby.jpg',url:'#',class:'item '},
        {img:'/assets/images/bannerimages/saree-dorbby.jpg',url:'#',class:'item '},
      ];
      this.homeslider = [
        {img:'/assets/images/bannerimages/dorbby-ethics-baner.jpg',url:'#',class:'item active'},
        {img:'/assets/images/bannerimages/dorbby-western-banner.jpg',url:'#',class:'item '},
        {img:'/assets/images/bannerimages/dorbby-tops-banner.jpg',url:'#',class:'item '},
        {img:'/assets/images/bannerimages/dorbby-denim-banner.jpg',url:'#',class:'item'},
      ];
      this.peoplesay = [
      {name:'Divya Janardhan',comment:'It`s really amazing I must say perfect fitting and comfort too..very very satisfied.. promising delivery thank you so much..wanna purchase more..',img:'/assets/images/guest1.jpg',url:'#'},
      {name:'Guest',comment:'This online shopping site is mainly deals in branded cloths; they never provide any non branded cloths. I ordered my trouser from this site, there services are good as they deliver this product within 6 days and they also..',
        img:'/assets/images/guest-2.jpg',url:'#'},
      {name:'Guest',comment:'It is such a nice site for trendy and fashionable products. Everything you want and need you will get it here. Most of the best brands with multiple designs are available here. It is India`s no. 1 clothing website.',img:'/assets/images/guest-3.jpg',url:'#'}

      ];
      this.homedecor =[
        {name:'Items under',path:'/assets/images/bannerimages/Banner-Homedecor4-Dorbby.jpg',url:'#',rs:' 299'},
        {name:'Items under',path:'/assets/images/bannerimages/Banner-Homedecor2-Dorbby.jpg',url:'#',rs:' 199'},
        {name:'Items under',path:'/assets/images/bannerimages/Banner-Homedecor3-Dorbby.jpg',url:'#',rs:' 399'},
        {name:'Items under',path:'/assets/images/bannerimages/Banner-Homedecor1-Dorbby.jpg',url:'#',rs:' 99'},
      ];
 }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

}

export default angular.module('dorbbyfullstackApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
