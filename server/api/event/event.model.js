'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';


var EventSchema = new mongoose.Schema({
  name: String,
  eventfrom: String,
  eventupto: String,
  skuids:String,
  sort:Number,
  showintopmenu: {type: Boolean, default: false},
  active: {type: Boolean, default: true}
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
