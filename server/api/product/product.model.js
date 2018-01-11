'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './product.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ProductSchema = new mongoose.Schema({
  itemname: String,
  itemdescription: String,
  itemcode: {type: String, require: true},
  itemgroupcode: {type: String, require: true},
  maincats: {type: ObjectId, ref: 'Category'},
  subcates: {type: ObjectId, ref: 'Category'},
  itemcats: {type: ObjectId, ref: 'Category'},
  itemsubcats: {type: ObjectId, ref: 'Category'},
  typecats: {type: ObjectId, ref: 'Category'},
  size: {type: ObjectId, ref: 'MasterAttr'},
  color: {type: ObjectId, ref: 'MasterAttr'},
  material: {type: ObjectId, ref: 'MasterAttr'},
  brands: {type: ObjectId, ref: 'Brand'},
  vendors: {type: ObjectId, ref: 'Vendor'},
  vendorscode: String,
  stock: {type: Number, default: 0},
  costprice: {type: Number, default: 0},
  mrp: {type: Number, default: 0},
  discount: {type: Number, default: 0},
  saleprice: {type: Number, default: 0},
  wsp: {type: Number, default: 0},
  romq: {type: Number, default: 0},
  womq: {type: Number, default: 0},
  st: {type: Number, default: 0},
  lengh: {type: Number, default: 0},
  dimension: {type: ObjectId, ref: 'MasterAttr'},
  weight: {type: String},
  mop: {type: String},
  care: {type: String},
  rtnship: {type: String},
  deliverytime: {type: String},
  active: {type: Boolean, default: true},
  istopseller: {type: Boolean, default: false},
  isexclusive: {type: Boolean, default: false},
  images:{type:Array, default: null},
  userlike: {type: Number, default: 0}

});

registerEvents(ProductSchema);
export default mongoose.model('Product', ProductSchema);
