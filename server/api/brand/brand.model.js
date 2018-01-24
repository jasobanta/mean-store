'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './brand.events';


var BrandSchema = new mongoose.Schema({
  name: String,
  vendors: {type: Array, ref: 'Vendor'},
  vendorsid: {type: Array, ref: 'Vendor'},
  shortdesc: String,
  longdesc: String,
  logo: String,
  isexclusive: {type: Boolean, default: false},
  active: {type: Boolean, default: true}
});

registerEvents(BrandSchema);
export default mongoose.model('Brand', BrandSchema);
