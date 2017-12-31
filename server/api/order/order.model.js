'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './order.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var OrderSchema = new mongoose.Schema({
  userid: {type: ObjectId, ref: 'User'},
  products: {},
  created: {type: Date, default: Date.now},
  lastupdate: {type: Date, default: Date.now}
});

registerEvents(OrderSchema);
export default mongoose.model('Order', OrderSchema);
