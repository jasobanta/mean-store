'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './upload.events';

var UploadSchema = new mongoose.Schema({
  name: String,
  handle: String,
  childof: {type: mongoose.Schema.ObjectId, default: null},
  fileaddress: String,
  logs: {type: mongoose.Schema.Types.Mixed, default: null},
  uploadedon: {type: Date, default: Date.now()},
  updatedon: {type: Date, default: Date.now()},
  active: {type: Boolean, default: true},
  order: {type: Number, default: 0},
  field1: String,
  field2: String,
  field3: String,
  field4: String,
});

registerEvents(UploadSchema);
export default mongoose.model('Upload', UploadSchema);
