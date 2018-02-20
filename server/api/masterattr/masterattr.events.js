/**
 * MasterAttr model events
 */

'use strict';

import {EventEmitter} from 'events';
var MasterAttrEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MasterAttrEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(MasterAttr) {
  for(var e in events) {
    let event = events[e];
    MasterAttr.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MasterAttrEvents.emit(`${event}:${doc._id}`, doc);
    MasterAttrEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MasterAttrEvents;
