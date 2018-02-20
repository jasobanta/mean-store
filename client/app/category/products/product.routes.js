'use strict';

export default function routes($stateProvider,$urlRouterProvider) {
  'ngInject';

  $stateProvider.state('relproduct', {
    url: '/product/:purl',
    template: require('./product.html'),
    controller: 'ProductController',
    controllerAs: 'product',
    authenticate: false
  });

}
