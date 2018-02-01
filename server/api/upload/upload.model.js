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
});

registerEvents(UploadSchema);
export default mongoose.model('Upload', UploadSchema);
