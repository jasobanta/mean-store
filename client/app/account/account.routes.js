'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('login', {
    url: '/login?referrer',
    template: require('./login/login.html'),
    controller: 'LoginController',
    controllerAs: 'vm'
  })
    .state('logout', {
      url: '/logout?referrer',
      referrer: 'main',
      template: '',
      controller($state, Auth) {
        'ngInject';
        var referrer = $state.params.referrer || $state.current.referrer || 'main';
        Auth.logout();
        $state.go(referrer);
      }
    })
    .state('signup', {
      url: '/signup',
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm'
    })
    .state('settings', {
      url: '/settings',
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('cart', {
      url: '/cart',
      template: require('./cart/cart.html'),
      controller: 'CartsController',
      controllerAs: 'ct',
      authenticate: true
    })
    .state('finishedorder', {
      url: '/finishedorder',
      template: require('./cart/finishedorder.html'),
      controller: 'CartsController',
      controllerAs: 'ct',
      authenticate: true
    })
    .state('paymentgateway', {
      url: '/paymentgateway/:orderid',
      template: require('./cart/payment.html'),
      controller: 'PaymentsController',
      controllerAs: 'payment',
      authenticate: true
    })
     .state('response', {
      url: '/response',
      template: require('./cart/finishedorder.html'),
      controller: 'PaymentsController',
      controllerAs: 'payment',
      authenticate: true
    })
    ;
}
