/**
 * Jobprocess model events
 */

'use strict';

import {EventEmitter} from 'events';
var JobprocessEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JobprocessEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Jobprocess) {
  for(var e in events) {
    let event = events[e];
    Jobprocess.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    JobprocessEvents.emit(event + ':' + doc._id, doc);
    JobprocessEvents.emit(event, doc);
  };
}

export {registerEvents};
export default JobprocessEvents;
