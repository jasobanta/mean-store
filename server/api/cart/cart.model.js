'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './cart.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CartSchema = new mongoose.Schema({
  userid: {type: ObjectId, ref: 'User'},
  product: {type: ObjectId, ref: 'Product'},
  qty: Number
});

registerEvents(CartSchema);
export default mongoose.model('Cart', CartSchema);
