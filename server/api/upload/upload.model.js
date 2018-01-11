'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './upload.events';

var UploadSchema = new mongoose.Schema({
  name: String,
  handle: String,
  fileaddress: String,
  logs: Array,
  uploadedon: {type: Date, default: Date.now()},
  updatedon: {type: Date, default: Date.now()},
  active: Boolean
});

registerEvents(UploadSchema);
export default mongoose.model('Upload', UploadSchema);
