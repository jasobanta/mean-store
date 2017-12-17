'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './product.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ProductSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  category: ObjectId,
  sort: Number,
  stock: Number
});

registerEvents(ProductSchema);
export default mongoose.model('Product', ProductSchema);
