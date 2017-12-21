'use strict';

export default function routes($stateProvider,$urlRouterProvider) {
  'ngInject';

  $stateProvider.state('becomeaseller', {
    url: '/becomeaseller',
    template: require('./becomeaseller/becomeaseller.html'),
    controller: 'BecomeasellerController',
    controllerAs: 'becomeaseller',
    authenticate: false
  }).state('termsandconditions', {
    url: '/termsandconditions',
    template: require('./termsandcondition.html')
  }).state('contactus', {
    url: '/contactus',
    template: require('./contactus/contactus.html'),
    controller: 'BecomeasellerController',
    controllerAs: 'contactus',
    authenticate: false
  });
}
