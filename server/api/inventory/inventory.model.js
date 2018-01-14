'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './inventory.events';

var InventorySchema = new mongoose.Schema({
  name: String,
  itype: {type: String, default: 'simple'},
  childof:{type: mongoose.Schema.ObjectId, default: null},
  childs: {},
  masters: {},
  mastersattrs: {},
  info: String,
  active: Boolean
});

registerEvents(InventorySchema);
export default mongoose.model('Inventory', InventorySchema);
