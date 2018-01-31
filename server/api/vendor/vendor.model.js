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
  brands: {type: Array, ref: 'Brand'},
  registeredaddress: {type: String, required: true},
  registeredcity: {type: String, required: true},
  registeredstate: {type: String, required: true},
  registeredpincode: {type: String, required: true},

  pickupaddress: {type: String, required: true},
  pickupcity: {type: String, required: true},
  pickupstate: {type: String, required: true},
  pickuppincode: {type: String, required: true},

  marginsellingprice: {type: String, required: false},

  marginphotoshootby: {type: String, default: 'vendor'},
  marginservicetax:   {type: String, default: 'vendor'},
  marginvat: 		  {type: String, default: 'vendor'},
  marginothertaxes:   {type: String, default: 'vendor'},

  margincourriercharges: {type: String, required: false},
  marginmop: {type: mongoose.Schema.ObjectId, ref: 'MasterAttrs'},
  margireconcilationdays: {type: String, required: false},

  doc1: {type: mongoose.Schema.ObjectId, ref: 'Upload'},

});

registerEvents(VendorSchema);
export default mongoose.model('Vendor', VendorSchema);
