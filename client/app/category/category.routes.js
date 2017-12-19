'use strict';

export default function routes($stateProvider,$urlRouterProvider) {
  'ngInject';

  $stateProvider.state('category', {
    url: '/category/:catename',
    template: require('./category.html'),
    controller: 'CategoryController',
    controllerAs: 'category',
    authenticate: false
  }).state('product', {
    url: '/product/:purl',
    template: require('./products/product.html'),
    controller: 'ProductController',
    controllerAs: 'product',
    authenticate: false
  });
}
