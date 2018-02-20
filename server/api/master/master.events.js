/**
 * Master model events
 */

'use strict';

import {EventEmitter} from 'events';
var MasterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MasterEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Master) {
  for(var e in events) {
    let event = events[e];
    Master.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MasterEvents.emit(`${event}:${doc._id}`, doc);
    MasterEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MasterEvents;
