'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './cart.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CartSchema = new mongoose.Schema({
  userid: ObjectId,
  product: ObjectId,
  qty: Number
});

registerEvents(CartSchema);
export default mongoose.model('Cart', CartSchema);
