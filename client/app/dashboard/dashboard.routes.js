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

   /* }).state('gotopage', {
    url: '/gotopage/:from/:to',
    template: require('./catlist/addrootcatlist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'*/

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

  }).state('addtypecategory', {
    url: '/addtypecategory/:catid',
    template: require('./catlist/addtypecategory.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('typecategorylist', {
    url: '/typecategorylist/',
    template: require('./catlist/typecategorylist.html'),
    controller: 'CatlistController',
    controllerAs: 'catlist',
    authenticate: 'admin'

  }).state('mastersetting', {
    url: '/mastersetting/',
    template: require('./masters/mastersetting.html'),
    controller: 'MastersettingsController',
    controllerAs: 'ms',
    authenticate: 'admin'

  }).state('mastersetting-add', {
    url: '/mastersetting-add/',
    template: require('./masters/mastersetting-add.html'),
    controller: 'MastersettingsController',
    controllerAs: 'ms',
    authenticate: 'admin'

  }).state('orderslist', {
    url: '/orderslist/',
    template: require('./orders/order.html'),
    controller: 'OrderController',
    controllerAs: 'ord',
    authenticate: 'admin'
  }).state('vendorlist',{
    url:  '/vendorslist/',
    template: require('./vendors/vendorlist.html'),
    controller: 'VendorController',
    controllerAs:'vendor',
    authenticate:'admin'
  }).state('vendorsetting-add',{
    url:  '/vendorsetting-add/:id',
    template: require('./vendors/vendorsetting-add.html'),
    controller: 'VendorController',
    controllerAs:'vendor',
    authenticate:'admin'
  }).state('vendordocupload', {
    url: '/vendordocupload/:id',
    template: require('./vendors/vendordocupload.html'),
    controller: 'VendorController',
    controllerAs: 'vendor',
    authenticate: 'admin'
  }).state('adddoc1images',{
    url:  '/adddoc1images/:vendorid',
    template: require('./vendors/document/adddoc1images.html'),
    controller: 'Doc1Controller',
    controllerAs:'doc1',
    authenticate:'admin'
  }).state('adddoc2images',{
    url:  '/adddoc2images/:vendorid',
    template: require('./vendors/document/adddoc2images.html'),
    controller: 'Doc2Controller',
    controllerAs:'doc2',
    authenticate:'admin'
  }).state('adddoc3images',{
    url:  '/adddoc3images/:vendorid',
    template: require('./vendors/document/adddoc3images.html'),
    controller: 'Doc3Controller',
    controllerAs:'doc3',
    authenticate:'admin'
  }).state('adddoc4images',{
    url:  '/adddoc4images/:vendorid',
    template: require('./vendors/document/adddoc4images.html'),
    controller: 'Doc4Controller',
    controllerAs:'doc4',
    authenticate:'admin'
  }).state('adddoc5images',{
    url:  '/adddoc5images/:vendorid',
    template: require('./vendors/document/adddoc5images.html'),
    controller: 'Doc5Controller',
    controllerAs:'doc5',
    authenticate:'admin'
  }).state('adddoc6images',{
    url:  '/adddoc6images/:vendorid',
    template: require('./vendors/document/adddoc6images.html'),
    controller: 'Doc6Controller',
    controllerAs:'doc6',
    authenticate:'admin'
  }).state('adddoc7images',{
    url:  '/adddoc7images/:vendorid',
    template: require('./vendors/document/adddoc7images.html'),
    controller: 'Doc7Controller',
    controllerAs:'doc7',
    authenticate:'admin'
  }).state('adddoc8images',{
    url:  '/adddoc8images/:vendorid',
    template: require('./vendors/document/adddoc8images.html'),
    controller: 'Doc8Controller',
    controllerAs:'doc8',
    authenticate:'admin'
  }).state('addbrand',{
    url:  '/addbrand/:id',
    template: require('./brands/addbrand.html'),
    controller: 'BrandController',
    controllerAs:'brand',
    authenticate:'admin'
  }).state('brandlist',{
    url:  '/brandlist/',
    template: require('./brands/brandlist.html'),
    controller: 'BrandController',
    controllerAs:'brand',
    authenticate:'admin'
  }).state('addsku',{
    url:  '/addsku/:id',
    template: require('./skus/addsku.html'),
    controller: 'SkuController',
    controllerAs:'sku',
    authenticate:'admin'
  }).state('skulist',{
    url:  '/skulist/',
    template: require('./skus/skulist.html'),
    controller: 'SkuController',
    controllerAs:'sku',
    authenticate:'admin'
  }).state('skusearch',{
    url:  '/skusearch/:itemgroupcode/:itemcode',
    template: require('./skus/skusearch.html'),
    controller: 'SkuSearchController',
    controllerAs:'sku',
    authenticate:'admin'
  }).state('addskuimages',{
    url:  '/addskuimages/:id',
    template: require('./skus/addskuimages.html'),
    controller: 'SkuController',
    controllerAs:'sku',
    authenticate:'admin'
  }).state('bulkskuupload',{
    url:  '/bulkskuupload/:id',
    template: require('./skus/bulkskuupload.html'),
    controller: 'SkuUploadController',
    controllerAs:'sku',
    authenticate:'admin'
  }).state('copysku',{
    url:  '/copysku/:id',
    template: require('./skus/copysku.html'),
    controller: 'SkuCopyController',
    controllerAs:'skucopy',
    authenticate:'admin'
  }).state('addsizechartimages',{
    url:  '/addsizechartimages/:catid',
    template: require('./catlist/sizechart/addsizechartimages.html'),
    controller: 'SizechartController',
    controllerAs:'sizechart',
    authenticate:'admin'
  }).state('addevent',{
    url:  '/addevent/:id',
    template: require('./events/addevent.html'),
    controller: 'EventController',
    controllerAs:'event',
    authenticate:'admin'
  }).state('eventlist',{
    url:  '/eventlist/',
    template: require('./events/eventlist.html'),
    controller: 'EventController',
    controllerAs:'event',
    authenticate:'admin'
  }).state('addeventimage',{
    url:  '/addeventimage/:evtid',
    template: require('./events/eventimage/addeventimage.html'),
    controller: 'EventimageController',
    controllerAs:'eventimage',
    authenticate:'admin'
  }).state('enquirylist',{
    url:  '/enquirys/',
    template: require('./enquirys/enquirylist.html'),
    controller: 'EnquiryController',
    controllerAs:'enquiry',
    authenticate:'admin'
  }).state('enquirydetails',{
    url:  '/enquirys/:id',
    template: require('./enquirys/enquirydetails.html'),
    controller: 'EnquiryController',
    controllerAs:'enquiry',
    authenticate:'admin'
  }).state('userlist',{
    url:  '/users/',
    template: require('./users/userlist.html'),
    controller: 'UserController',
    controllerAs:'user',
    authenticate:'admin'
  }).state('userdetails',{
    url:  '/users/:id',
    template: require('./users/userdetails.html'),
    controller: 'UserController',
    controllerAs:'user',
    authenticate:'admin'
  })
}
