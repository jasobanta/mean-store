'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './orderdetail.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var OrderdetailSchema = new mongoose.Schema({
  orderid: {type: ObjectId, ref: 'Order'},
  productid: {type: ObjectId, ref: 'Product'},
  images: {type: ObjectId, ref: 'Upload'},
  status: {type: String, default: 'Pending'},
  quantity: Number,
  mrp: Number,
  saleprice: Number,
  discount: Number,
  created: {type: Date, default: Date.now },
  updated: {type: Date, default: Date.now }
});

registerEvents(OrderdetailSchema);
export default mongoose.model('Orderdetail', OrderdetailSchema);
