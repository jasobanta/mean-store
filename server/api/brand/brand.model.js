'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './brand.events';


var BrandSchema = new mongoose.Schema({
  name: String,
  childof: {type: mongoose.Schema.ObjectId, ref: 'Brand'},
  active: Boolean
});

registerEvents(BrandSchema);
export default mongoose.model('Brand', BrandSchema);
