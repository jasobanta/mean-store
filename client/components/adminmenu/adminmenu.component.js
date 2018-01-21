'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class AdminMenuComponent {
  menu = [{
    title: 'Admin Settings',
    state: 'admin',
    class: 'fa fa-cog',
    submenu: [
      {title: 'Add Masters', state: 'mastersetting-add'},
      {title: 'Master Configuration List', state: 'mastersetting'}
  ]
},
{
  title: 'Category Management',
  state: 'category',
  class: 'fa fa-folder',
  submenu: [
    {title: 'Add New Main Categories', state: 'addrootcat'},
    {title: 'List All Main Categories', state: 'rootcatlist'},
    {title: 'Add New Sub Categories', state: 'addsubcategory'},
    {title: 'List All Sub Categories', state: 'subcategorylist'},
    {title: 'Add New Item Categories', state: 'additemcategory'},
    {title: 'List All Item Categories', state: 'itemcategorylist'},
    {title: 'Add New Item Sub Categories', state: 'additemsubcategory'},
    {title: 'List All Item Sub Categories', state: 'itemsubcategorylist'},
    {title: 'Add New Type Categories', state: 'addtypecategory'},
    {title: 'List All Type Categories', state: 'typecategorylist'}
]
},
{
  title: 'Order Management',
  state: 'order',
  class: 'fa fa-file',
  submenu: [
    {title: 'List of Orders', state: 'orderslist'},
  ]
},
{
  title: 'Vendor Management',
  state: 'vendor',
  class: 'fa fa-fw fa-user-plus',
  submenu: [
    {title: 'Add New Vendor' ,state:'vendorsetting-add'},
    {title: 'List All Vendors',state:'vendorlist'},
  ]
},
{
  title: 'Brand Management',
  state: 'brand',
  class: 'fa fa-fw fa-shopping-bag',
  submenu: [
    {title: 'Add New Brand' ,state:'addbrand'},
    {title: 'List All Brands',state:'brandlist'},
  ]
},
{
  title: 'Product Management',
  state: 'sku',
  class: 'fa fa-fw fa-diamond',
  submenu: [
    {title: 'Add New Product' ,state:'addsku'},
    {title: 'List All Products',state:'skulist'},
    {title: 'Bulk Product Upload',state:'bulkskuupload'},
  ]
},
{
  title: 'Event Management',
  state: 'event',
  class: 'fa fa-fw fa-calendar',
  submenu: [
    {title: 'Add New Event' ,state:'addevent'},
    {title: 'List All Events',state:'eventlist'},
  ]
}

];
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;
  $state;
  $currentstate;
  menustate = '';

  constructor(Auth, $state) {
    'ngInject';
    this.$state = $state;
    this.currentstate = this.$state.current.name;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    //console.log();

  }
  $onInit(){
    var currentstate = this.currentstate;
    var menustate = '';
    angular.forEach(this.menu,function(values,keys){
      var submenu = values.submenu;
      var valuestate = values.state;
      //console.log('currentstate'+currentstate);
      //console.log(values);
      angular.forEach(submenu, function(value, key){
      //  console.log('currentstate'+currentstate);
      //  console.log(value);
        if (currentstate === value.state) {
          menustate = values.state;
        }
      });
    });
    this.menustate = menustate;
  }

}

export default angular.module('directives.adminmenu', [])
  .component('adminmenu', {
    template: require('./admin.html'),
    controller: AdminMenuComponent
  })
  .name;
