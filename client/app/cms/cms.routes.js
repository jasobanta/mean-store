'use strict';

export default function routes($stateProvider,$urlRouterProvider) {
  'ngInject';

  $stateProvider.state('becomeaseller', {
    url: '/becomeaseller',
    template: require('./becomeaseller/becomeaseller.html'),
    controller: 'BecomeasellerController',
    controllerAs: 'becomeaseller',
    authenticate: false
  }).state('termsandcondition', {
    url: '/termsandcondition',
    template: require('./termsandcondition.html')
  }).state('contactus', {
    url: '/contactus',
    template: require('./contactus/contactus.html'),
    controller: 'ContactusController',
    controllerAs: 'contactus',
    authenticate: false
  }).state('shippingpolicy', {
    url: '/shippingpolicy',
    template: require('./shippingpolicy.html')
  }).state('security', {
    url: '/security',
    template: require('./security.html')
  }).state('pressrelease', {
    url: '/pressrelease',
    template: require('./pressrelease.html')
  }).state('orderingandtracking', {
    url: '/orderingandtracking',
    template: require('./orderingandtracking.html')
  }).state('cancellationpolicy', {
    url: '/cancellationpolicy',
    template: require('./cancellationpolicy.html')
  }).state('career',{
    url:'/career',
    template: require('./career.html')
  }).state('faqs',{
    url:'/faqs',
    template: require('./faqs.html')
  }).state('aboutus',{url:'/aboutus',template: require('./aboutus.html')
});
}
