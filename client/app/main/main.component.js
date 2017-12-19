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
  home =[];
  favouritedestination = [];
  peoplesay = [];

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
        {name:'Dresses under',img:'/assets/images/bannerimages/dress.jpg',rs:' 699',url:''},
        {name:'Dresses under',img:'/assets/images/bannerimages/dress.jpg',rs:' 699',url:''},
        {name:'Dresses under',img:'/assets/images/bannerimages/dress.jpg',rs:' 699',url:''},
        {name:'Dresses under',img:'/assets/images/bannerimages/dress.jpg',rs:' 699',url:''},
        {name:'Dresses under',img:'/assets/images/bannerimages/dress.jpg',rs:' 699',url:''},
        {name:'Dresses under',img:'/assets/images/bannerimages/dress.jpg',rs:' 699',url:''},
        
      ];
      this.featuredwestern = [
        {name:'Tops and Tunics under ',rs:' 499',img:'/assets/images/bannerimages/top.jpg',url:'#'},
        {name:'Tops and Tunics under ',rs:' 499',img:'/assets/images/bannerimages/top.jpg',url:'#'},
        {name:'Tops and Tunics under ',rs:' 499',img:'/assets/images/bannerimages/top.jpg',url:'#'},
        {name:'Tops and Tunics under ',rs:' 499',img:'/assets/images/bannerimages/top.jpg',url:'#'},
      ];
      this.featuredethnic = [
        {name:'Bags under ',rs:'789',img:'/assets/images/bannerimages/bottom.jpg',url:''},
        {name:'Bags under ',rs:'789',img:'/assets/images/bannerimages/bottom.jpg',url:''},
        {name:'Bags under ',rs:'789',img:'/assets/images/bannerimages/bottom.jpg',url:''},
        {name:'Bags under ',rs:'789',img:'/assets/images/bannerimages/bottom.jpg',url:''},
      ];
      this.featuredlingerie = [
        {name:'Jewellery under ',rs:'568',img:'/assets/images/bannerimages/top3.jpg',url:''},
        {name:'Jewellery under ',rs:'568',img:'/assets/images/bannerimages/top3.jpg',url:''},
        {name:'Jewellery under ',rs:'568',img:'/assets/images/bannerimages/top3.jpg',url:''},
        {name:'Jewellery under ',rs:'568',img:'/assets/images/bannerimages/top3.jpg',url:''}
      ];
      this.featuredfashion = [
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg',url:''},
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg',url:''},
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg',url:''},

        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg',url:''},
        
      ];
      this.home = [
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg"',url:''},
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg"',url:''},
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg"',url:''},
        {name:'Dresses under  ',rs:'568',img:'/assets/images/bannerimages/dress.jpg"',url:''},
      ];
      this.favouritedestination = [
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
        {name:'Kurta and Kurti  ',img:'/assets/images/stilestreet-printed-blue-georgette--dress-ss16515b_blue-220-330-1.jpg',url:''},
      ];
      this.peoplesay = [
        {name:'Divya Janardhan  ',img:'/assets/images/bannerimages/guest1.jpg',url:'',comment:'Its really amazing I must say perfect fitting and comfort too..very very satisfied.. promising delivery thank you so much..wanna purchase more..'},
        {name:'Divya Janardhan  ',img:'/assets/images/270x270.png',url:'',comment:'Its really amazing I must say perfect fitting and comfort too..very very satisfied.. promising delivery thank you so much..wanna purchase more..'},
        {name:'Divya Janardhan  ',img:'/assets/images/270x270.png',url:'',comment:'Its really amazing I must say perfect fitting and comfort too..very very satisfied.. promising delivery thank you so much..wanna purchase more..'},
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
