'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './jobprocess.events';

var JobprocessSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(JobprocessSchema);
export default mongoose.model('Jobprocess', JobprocessSchema);
