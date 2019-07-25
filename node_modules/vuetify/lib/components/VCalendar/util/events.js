import { parseTimestamp, getDayIdentifier, getTimestampIdentifier } from './timestamp';
export function parseEvent(input, index, startProperty, endProperty) {
  if (!(startProperty in input)) {
    throw new Error('The ' + startProperty + ' property is required on all events to be a valid timestamp in the format YYYY-MM-DD or YYYY-MM-DD hh:mm');
  }

  const start = parseTimestamp(input[startProperty]);
  const end = input[endProperty] ? parseTimestamp(input[endProperty]) : start;
  const startIdentifier = getDayIdentifier(start);
  const startTimestampIdentifier = getTimestampIdentifier(start);
  const endIdentifier = getDayIdentifier(end);
  const endTimestampIdentifier = getTimestampIdentifier(end);
  const allDay = !start.hasTime;
  return {
    input,
    start,
    startIdentifier,
    startTimestampIdentifier,
    end,
    endIdentifier,
    endTimestampIdentifier,
    allDay,
    index
  };
}
export function isEventOn(event, dayIdentifier) {
  return dayIdentifier >= event.startIdentifier && dayIdentifier <= event.endIdentifier;
}
export function isEventOverlapping(event, startIdentifier, endIdentifier) {
  return startIdentifier <= event.endIdentifier && endIdentifier >= event.startIdentifier;
}
//# sourceMappingURL=events.js.map