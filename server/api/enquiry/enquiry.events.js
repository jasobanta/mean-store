/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var EnquiryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EnquiryEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Enquiry) {
  for(var e in events) {
    let event = events[e];
    Enquiry.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    EnquiryEvents.emit(`${event}:${doc._id}`, doc);
    EnquiryEvents.emit(event, doc);
  };
}

export {registerEvents};
export default EnquiryEvents;
