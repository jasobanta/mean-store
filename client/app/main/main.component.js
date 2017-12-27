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
        {name: 'Western Dress under', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress1-dorbby.jpg', url:'#'},
        {name: 'Western Dress under', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress2-dorbby.jpg', url:'#'},
        {name: 'Western Dress under', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress3-dorbby.jpg', url:'#'},
        {name: 'Western Dress under', rs:' 499', img: '/assets/images/bannerimages/western-wardrobe-dress4-dorbby.jpg', url:'#'},
      ];
      this.featuredethnic = [
        {name: 'Ethinic under ',rs: '789', img: '/assets/images/bannerimages/ethinic-dress1-dorbby.jpg', url: ''},
        {name: 'Ethinic under ',rs: '789', img: '/assets/images/bannerimages/ethinic-dress2-dorbby.jpg', url: ''},
        {name: 'Ethinic under ',rs: '789', img: '/assets/images/bannerimages/ethinic-dress3-dorbby.jpg', url: ''},
        {name: 'Ethinic under ',rs: '789', img: '/assets/images/bannerimages/ethinic-dress4-dorbby.jpg', url: ''},
      ];
      this.featuredlingerie = [
        {name: 'Linirie under ', rs: '568',img: '/assets/images/bannerimages/Banner-lingerie1-Dorbby.jpg', url: ''},
        {name: 'Linirie under ', rs: '568',img: '/assets/images/bannerimages/Banner-lingerie2-Dorbby.jpg', url: ''},
        {name: 'Linirie under ', rs: '568',img: '/assets/images/bannerimages/Banner-lingerie3-Dorbby.jpg', url: ''},
        {name: 'Linirie under ', rs: '568',img: '/assets/images/bannerimages/Banner-lingerie4-Dorbby.jpg', url: ''}
      ];
      this.featuredfashion = [
        {name: 'Dresses under  ', rs:'568', img: '/assets/images/bannerimages/dress.jpg', url: ''},
        {name: 'Dresses under  ', rs:'568', img: '/assets/images/bannerimages/dress.jpg', url: ''},
        {name: 'Dresses under  ', rs:'568', img: '/assets/images/bannerimages/dress.jpg', url: ''},
        {name: 'Dresses under  ', rs:'568', img: '/assets/images/bannerimages/dress.jpg', url: ''},
      ];
      this.newarrivalslider = [
        {img:'/assets/images/bannerimages/denim-1-jan-2018-dorbby.jpg',url:'#', class:'item active'},
        {img:'/assets/images/bannerimages/scarf-1-jan-2018-dorbby.jpg',url:'#',class:'item '},
        {img:'/assets/images/bannerimages/saree-1-jan-2018-dorbby.jpg',url:'#',class:'item '},
      ];
      this.homeslider = [
        {img:'/assets/images/bannerimages/dorbby-ethics-baner.jpg',url:'#',class:'item active'},
        {img:'/assets/images/bannerimages/dorbby-western-banner.jpg',url:'#',class:'item '},
        {img:'/assets/images/bannerimages/dorbby-tops-banner.jpg',url:'#',class:'item '},
        {img:'/assets/images/bannerimages/dorbby-denim-banner.jpg',url:'#',class:'item'},
      ];
      this.peoplesay = [

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
