'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: require('./dashboard.html'),
    controller: 'DashboardController',
    controllerAs: 'dashboard',
    authenticate: 'admin'
  }).state('catlist', {
    url: '/catlist/:catid',
    template: require('./catlist/catlist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('addrootcat', {
    url: '/addrootcat/',
    template: require('./catlist/addrootcat.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('addrootcatlist', {
    url: '/addrootcatlist/',
    template: require('./catlist/addrootcatlist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  });
}
