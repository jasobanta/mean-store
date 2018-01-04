/**
 * Brand model events
 */

'use strict';

import {EventEmitter} from 'events';
var BrandEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BrandEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Brand) {
  for(var e in events) {
    let event = events[e];
    Brand.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    BrandEvents.emit(`${event}:${doc._id}`, doc);
    BrandEvents.emit(event, doc);
  };
}

export {registerEvents};
export default BrandEvents;
