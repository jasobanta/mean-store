'use strict';

import mongoose from 'mongoose';
//import {registerEvents} from './order.events';
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var OrderDetailsSchema = new mongoose.Schema({
  orderid: {type: ObjectId, ref: 'Order'},
  productid: {type: ObjectId, ref: 'Product'}
  created: {type: Date, default: Date.now },
  updated: {type: Date, default: Date.now }
});

registerEvents(OrderDetailsSchema);
export default mongoose.model('OrderDetails', OrderDetailsSchema);
