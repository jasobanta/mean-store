'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vendor.events';

var VendorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  vtype: {type: mongoose.Schema.ObjectId, ref: 'MasterAttrs'},
  active: {type: Boolean, default: true},
  isapproved: {type: Boolean, default: false},
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
  marginvat: 		      {type: String, default: 'vendor'},
  marginothertaxes:   {type: String, default: 'vendor'},

  margincourriercharges: {type: String, required: false},
  marginmop: {type: mongoose.Schema.ObjectId, ref: 'MasterAttrs'},
  margireconcilationdays: {type: String, required: false},

  tpphotoshootby: {type:String, required: false},
  tpservicetax:   {type:String, required: false},
  tpvat:          {type:String, required: false},
  tpothertaxes:   {type:String, required: false},
  tpsourcinghead: {type:String, required: false},
  tpmerchandiser: {type:String, required: false},
  tppkginventory: {type:Number},

  
  fincontactperson: {type:String, required: false},
  finemailid: {type:String, required: false},
  fincontactno: {type:String, required: false},

  bankbenifname: {type:String, required: false},
  bankname: {type:String, required: false},
  bankbranchname: {type:String, required: false},
  bankbranchaddress: {type:String, required: false},
  bankacno: {type:String, required: false},
  bankifsccode: {type:String, required: false},

  gst:            {type:String, required: false},
  gstnotes:       {type:String, required: false},
  canceledcheque: {type:String, required: false},
  canceledchequenotes: {type:String, required: false},
  tin: {type:String, required: false},
  tinnotes: {type:String, required: false},

  pan: {type:String, required: false},
  pannotes: {type:String, required: false},
  tan: {type:String, required: false},
  tannotes: {type:String, required: false},
  brandtrademark: {type:String, required: false},
  brandtrademarknotes: {type:String, required: false},
 
  doc1: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc2: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc3: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc4: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc5: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc6: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc7: {type: mongoose.Schema.ObjectId, ref: 'Upload'},
  doc8: {type: mongoose.Schema.ObjectId, ref: 'Upload'},

  doc7Field1: {type:String, required: false},
  doc7Field2: {type:String, required: false},
  doc8Field1: {type:String, required: false},
  doc8Field2: {type:String, required: false},

});

registerEvents(VendorSchema);
export default mongoose.model('Vendor', VendorSchema);
