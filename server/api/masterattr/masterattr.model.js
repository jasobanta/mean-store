'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './masterattr.events';


var MasterAttrSchema = new mongoose.Schema({
  name: String,
  sort: Number,
  value: String,
  childof: {type: mongoose.Schema.ObjectId, ref: 'Master'},
  active: Boolean
});

registerEvents(MasterAttrSchema);
export default mongoose.model('MasterAttr', MasterAttrSchema);
