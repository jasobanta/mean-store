'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vendor.events';

var VendorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  vtype: {type: mongoose.Schema.ObjectId, ref: 'MasterAttrs'},
  active: {type: Boolean, default: true},
  contactperson: {type: String, required: true},
  contactnumber: {type: String, required: true},
  contactdesignation: {type: String, required: true},
  contactemailid: {type: String, required: true},
  created: {type: Date, default: Date.now},
  brands: {type: Array, ref: 'Brand'}
});

registerEvents(VendorSchema);
export default mongoose.model('Vendor', VendorSchema);
