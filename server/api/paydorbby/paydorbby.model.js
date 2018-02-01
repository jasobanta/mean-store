'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './paydorbby.events';

var PaydorbbySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(PaydorbbySchema);
export default mongoose.model('Paydorbby', PaydorbbySchema);
