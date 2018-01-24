'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var EventSchema = new mongoose.Schema({
  name: String,
  eventfrom: String,
  eventupto: String,
  skuids:String,
  topmenusort:Number,
  sort:Number,
  eventimage:{type: ObjectId, ref: 'Upload'},
  showintopmenu: {type: Boolean, default: false},
  showinupcomingcalendar: {type: Boolean, default: false},
  active: {type: Boolean, default: true}
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
