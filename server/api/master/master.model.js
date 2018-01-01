'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './master.events';

var MasterSchema = new mongoose.Schema({
  name: String,
  info: String,
  childs: [],
  active: Boolean
});

registerEvents(MasterSchema);
export default mongoose.model('Master', MasterSchema);
