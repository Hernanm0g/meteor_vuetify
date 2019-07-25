"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEvent = parseEvent;
exports.isEventOn = isEventOn;
exports.isEventOverlapping = isEventOverlapping;

var _timestamp = require("./timestamp");

function parseEvent(input, index, startProperty, endProperty) {
  if (!(startProperty in input)) {
    throw new Error('The ' + startProperty + ' property is required on all events to be a valid timestamp in the format YYYY-MM-DD or YYYY-MM-DD hh:mm');
  }

  var start = (0, _timestamp.parseTimestamp)(input[startProperty]);
  var end = input[endProperty] ? (0, _timestamp.parseTimestamp)(input[endProperty]) : start;
  var startIdentifier = (0, _timestamp.getDayIdentifier)(start);
  var startTimestampIdentifier = (0, _timestamp.getTimestampIdentifier)(start);
  var endIdentifier = (0, _timestamp.getDayIdentifier)(end);
  var endTimestampIdentifier = (0, _timestamp.getTimestampIdentifier)(end);
  var allDay = !start.hasTime;
  return {
    input: input,
    start: start,
    startIdentifier: startIdentifier,
    startTimestampIdentifier: startTimestampIdentifier,
    end: end,
    endIdentifier: endIdentifier,
    endTimestampIdentifier: endTimestampIdentifier,
    allDay: allDay,
    index: index
  };
}

function isEventOn(event, dayIdentifier) {
  return dayIdentifier >= event.startIdentifier && dayIdentifier <= event.endIdentifier;
}

function isEventOverlapping(event, startIdentifier, endIdentifier) {
  return startIdentifier <= event.endIdentifier && endIdentifier >= event.startIdentifier;
}
//# sourceMappingURL=events.js.map