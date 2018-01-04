'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vendor.events';

var VendorSchema = new mongoose.Schema({
  name: String,
  info: String,
  childs: {type: Array, ref: 'Brand'},
  active: {type: Boolean, default: true}
});

registerEvents(VendorSchema);
export default mongoose.model('Vendor', VendorSchema);
