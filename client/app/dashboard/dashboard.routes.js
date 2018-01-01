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
    url: '/addrootcat/:catid',
    template: require('./catlist/addrootcat.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('rootcatlist', {
    url: '/rootcatlist/',
    template: require('./catlist/addrootcatlist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('allorders', {
    url: '/allorders/',
    template: require('./catlist/allorders.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('addsubcategory', {
    url: '/addsubcategory/:catid',
    template: require('./catlist/addsubcategory.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('subcategorylist', {
    url: '/subcategorylist/',
    template: require('./catlist/addsubcategorylist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('additemcategory', {
    url: '/additemcategory/:catid',
    template: require('./catlist/additemcategory.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('itemcategorylist', {
    url: '/itemcategorylist/',
    template: require('./catlist/itemcategorylist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('additemsubcategory', {
    url: '/additemsubcategory/:catid',
    template: require('./catlist/additemsubcategory.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('itemsubcategorylist', {
    url: '/itemsubcategorylist/',
    template: require('./catlist/itemsubcategorylist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('mastersetting', {
    url: '/mastersetting/',
    template: require('./masters/mastersetting.html'),
    controller: 'MastersettingsController',
    controllerAs: 'ms',
    authenticate: 'admin'

  });
}
