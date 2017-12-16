'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './category.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CategorySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  isparent: Boolean,
  sort: Number,
  ischildof: ObjectId
});

registerEvents(CategorySchema);
export default mongoose.model('Category', CategorySchema);
