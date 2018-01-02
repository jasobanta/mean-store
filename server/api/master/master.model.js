'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './master.events';

var MasterSchema = new mongoose.Schema({
  name: String,
  info: String,
  childs: {type: Array, ref: 'MastersAttr'},
  active: {type: Boolean, default: true}
});

registerEvents(MasterSchema);
export default mongoose.model('Master', MasterSchema);
