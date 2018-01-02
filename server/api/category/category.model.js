'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './category.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CategorySchema = new mongoose.Schema({
  name: String,
  info: String,
  catimage: String,
  sizechart: String,
  active: Boolean,
  isparent: {type: Boolean, default: false},
  issubcat: {type: Boolean, default: false},
  isitemcat: {type: Boolean, default: false},
  isitemsubcat: {type: Boolean, default: false},
  sort: Number,
  ischildof: {type: ObjectId, ref: 'Category', default: null},
  childs:[]
});

registerEvents(CategorySchema);
export default mongoose.model('Category', CategorySchema);
