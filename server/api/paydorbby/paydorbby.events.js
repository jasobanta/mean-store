/**
 * Paydorbby model events
 */

'use strict';

import {EventEmitter} from 'events';
var PaydorbbyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PaydorbbyEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Paydorbby) {
  for(var e in events) {
    let event = events[e];
    Paydorbby.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PaydorbbyEvents.emit(event + ':' + doc._id, doc);
    PaydorbbyEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PaydorbbyEvents;
