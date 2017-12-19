'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './product.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ProductSchema = new mongoose.Schema({
  name: String,
  info: String,
  productsname: String,
  productsimg: String,
  productsurl: String,
  productsdiscount:Number,
  products_discount_percent: Number,
  productsprice: Number,
  productattribute: {},
  active: Boolean,
  sort: Number,
  stock: Number,
  category: ObjectId,
});

registerEvents(ProductSchema);
export default mongoose.model('Product', ProductSchema);
