"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../../../src/components/VCalendar/mixins/calendar-with-events.sass");

var _ripple = _interopRequireDefault(require("../../../directives/ripple"));

var _calendarBase = _interopRequireDefault(require("./calendar-base"));

var _helpers = require("../../../util/helpers");

var _props = _interopRequireDefault(require("../util/props"));

var _timestamp = require("../util/timestamp");

var _events = require("../util/events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* @vue/component */
var _default = _calendarBase.default.extend({
  name: 'calendar-with-events',
  directives: {
    ripple: _ripple.default
  },
  props: _props.default.events,
  computed: {
    noEvents: function noEvents() {
      return this.events.length === 0;
    },
    parsedEvents: function parsedEvents() {
      var _this = this;

      return this.events.map(function (input, index) {
        return (0, _events.parseEvent)(input, index, _this.eventStart, _this.eventEnd);
      });
    },
    eventColorFunction: function eventColorFunction() {
      var _this2 = this;

      return typeof this.eventColor === 'function' ? this.eventColor : function () {
        return _this2.eventColor;
      };
    },
    eventTextColorFunction: function eventTextColorFunction() {
      var _this3 = this;

      return typeof this.eventTextColor === 'function' ? this.eventTextColor : function () {
        return _this3.eventTextColor;
      };
    },
    eventNameFunction: function eventNameFunction() {
      var _this4 = this;

      return typeof this.eventName === 'function' ? this.eventName : function (event, timedEvent) {
        var name = (0, _helpers.escapeHTML)(event.input[_this4.eventName]);

        if (event.start.hasTime) {
          if (timedEvent) {
            var showStart = event.start.hour < 12 && event.end.hour >= 12;

            var start = _this4.formatTime(event.start, showStart);

            var end = _this4.formatTime(event.end, true);

            return "<strong>".concat(name, "</strong><br>").concat(start, " - ").concat(end);
          } else {
            var time = _this4.formatTime(event.start, true);

            return "<strong>".concat(time, "</strong> ").concat(name);
          }
        }

        return name;
      };
    }
  },
  methods: {
    formatTime: function formatTime(withTime, ampm) {
      var formatter = this.getFormatter({
        timeZone: 'UTC',
        hour: 'numeric',
        minute: withTime.minute > 0 ? 'numeric' : undefined
      });
      return formatter(withTime, true);
    },
    updateEventVisibility: function updateEventVisibility() {
      if (this.noEvents || !this.eventMore) {
        return;
      }

      var eventHeight = this.eventHeight;
      var eventsMap = this.getEventsMap();

      for (var date in eventsMap) {
        var _eventsMap$date = eventsMap[date],
            parent = _eventsMap$date.parent,
            events = _eventsMap$date.events,
            more = _eventsMap$date.more;

        if (!more) {
          break;
        }

        var parentBounds = parent.getBoundingClientRect();
        var last = events.length - 1;
        var hide = false;
        var hidden = 0;

        for (var i = 0; i <= last; i++) {
          if (!hide) {
            var eventBounds = events[i].getBoundingClientRect();
            hide = eventBounds.bottom + eventHeight > parentBounds.bottom && i !== last || events[i].style.display === 'none';
          }

          if (hide) {
            var id = events[i].getAttribute('data-event');
            this.hideEvents(id);
            hidden++;
          }
        }

        if (hide) {
          more.style.display = '';
          more.innerHTML = this.$vuetify.lang.t(this.eventMoreText, hidden);
        } else {
          more.style.display = 'none';
        }
      }
    },
    hideEvents: function hideEvents(id) {
      var elements = this.$refs.events;
      elements.forEach(function (el) {
        if (el.getAttribute('data-event') === id) {
          el.style.display = 'none';
        }
      });
    },
    getEventsMap: function getEventsMap() {
      var eventsMap = {};
      var elements = this.$refs.events;

      if (!elements || !elements.forEach) {
        return eventsMap;
      }

      elements.forEach(function (el) {
        var date = el.getAttribute('data-date');

        if (el.parentElement && date) {
          if (!(date in eventsMap)) {
            eventsMap[date] = {
              parent: el.parentElement,
              more: null,
              events: []
            };
          }

          if (el.getAttribute('data-more')) {
            eventsMap[date].more = el;
          } else {
            eventsMap[date].events.push(el);
            el.style.display = '';
          }
        }
      });
      return eventsMap;
    },
    genDayEvent: function genDayEvent(_ref, index, day) {
      var offset = _ref.offset,
          event = _ref.event;
      var eventHeight = this.eventHeight;
      var eventMarginBottom = this.eventMarginBottom;
      var relativeOffset = (offset - index) * (eventHeight + eventMarginBottom); // 1 = margin bottom

      var dayIdentifier = (0, _timestamp.getDayIdentifier)(day);
      var start = dayIdentifier === event.startIdentifier;
      var end = dayIdentifier === event.endIdentifier;
      var scope = {
        event: event.input,
        day: day,
        outside: day.outside,
        start: start,
        end: end,
        timed: false
      };
      return this.genEvent(event, scope, start || day.index === 0, false, {
        staticClass: 'v-event',
        class: {
          'v-event-start': start,
          'v-event-end': end
        },
        style: {
          height: "".concat(eventHeight, "px"),
          top: "".concat(relativeOffset, "px"),
          'margin-bottom': "".concat(eventMarginBottom, "px")
        },
        attrs: {
          'data-date': day.date,
          'data-event': event.index
        },
        key: event.index,
        ref: 'events',
        refInFor: true
      });
    },
    genTimedEvent: function genTimedEvent(_ref2, index, day) {
      var offset = _ref2.offset,
          event = _ref2.event,
          columnCount = _ref2.columnCount,
          column = _ref2.column;
      var dayIdentifier = (0, _timestamp.getDayIdentifier)(day);
      var start = event.startIdentifier >= dayIdentifier;
      var end = event.endIdentifier > dayIdentifier;
      var top = start ? day.timeToY(event.start) : 0;
      var bottom = end ? day.timeToY(1440) : day.timeToY(event.end);
      var height = Math.max(this.eventHeight, bottom - top);
      var left = columnCount === -1 ? offset * 5 : column * 100 / columnCount;
      var right = columnCount === -1 ? 0 : Math.max(0, (columnCount - column - 2) * 100 / columnCount + 10);
      var scope = {
        event: event.input,
        day: day,
        outside: day.outside,
        start: start,
        end: end,
        timed: true
      };
      return this.genEvent(event, scope, true, true, {
        staticClass: 'v-event-timed',
        style: {
          top: "".concat(top, "px"),
          height: "".concat(height, "px"),
          left: "".concat(left, "%"),
          right: "".concat(right, "%")
        }
      });
    },
    genEvent: function genEvent(event, scope, showName, timedEvent, data) {
      var slot = this.$scopedSlots.event;
      var text = this.eventTextColorFunction(event.input);
      var background = this.eventColorFunction(event.input);
      return this.$createElement('div', this.setTextColor(text, this.setBackgroundColor(background, _objectSpread({
        on: this.getDefaultMouseEventHandlers(':event', function (nativeEvent) {
          return _objectSpread({}, scope, {
            nativeEvent: nativeEvent
          });
        }),
        directives: [{
          name: 'ripple',
          value: this.eventRipple != null ? this.eventRipple : true
        }]
      }, data))), slot ? slot(scope) : showName ? [this.genName(event, timedEvent)] : undefined);
    },
    genName: function genName(event, timedEvent) {
      return this.$createElement('div', {
        staticClass: 'pl-1',
        domProps: {
          innerHTML: this.eventNameFunction(event, timedEvent)
        }
      });
    },
    genMore: function genMore(day) {
      var _this5 = this;

      return this.$createElement('div', {
        staticClass: 'v-event-more pl-1',
        attrs: {
          'data-date': day.date,
          'data-more': 1
        },
        directives: [{
          name: 'ripple',
          value: this.eventRipple != null ? this.eventRipple : true
        }],
        on: {
          click: function click() {
            return _this5.$emit('click:more', day);
          }
        },
        style: {
          display: 'none'
        },
        ref: 'events',
        refInFor: true
      });
    },
    getEventsForDay: function getEventsForDay(day) {
      var identifier = (0, _timestamp.getDayIdentifier)(day);
      return this.parsedEvents.filter(function (event) {
        return (0, _events.isEventOn)(event, identifier);
      });
    },
    getEventsForDayAll: function getEventsForDayAll(day) {
      var identifier = (0, _timestamp.getDayIdentifier)(day);
      return this.parsedEvents.filter(function (event) {
        return event.allDay && (0, _events.isEventOn)(event, identifier);
      });
    },
    getEventsForDayTimed: function getEventsForDayTimed(day) {
      var identifier = (0, _timestamp.getDayIdentifier)(day);
      return this.parsedEvents.filter(function (event) {
        return !event.allDay && (0, _events.isEventOn)(event, identifier);
      });
    },
    isSameColumn: function isSameColumn(a, b) {
      var astart = (0, _timestamp.parseTime)(a.event.start);
      var bstart = (0, _timestamp.parseTime)(b.event.start);
      var diff = astart - bstart;
      var abs = diff < 0 ? -diff : diff;
      return abs < this.eventOverlapThreshold;
    },
    isOverlapping: function isOverlapping(a, b) {
      var astart = (0, _timestamp.parseTime)(a.event.start);
      var bstart = (0, _timestamp.parseTime)(b.event.start);

      if (a.offset < b.offset && bstart < astart) {
        var aend = astart + this.eventOverlapThreshold;
        var bend = (0, _timestamp.parseTime)(b.event.end);
        return !(astart >= bend || aend <= bstart);
      }

      return false;
    },
    getScopedSlots: function getScopedSlots() {
      var _this6 = this;

      if (this.noEvents) {
        return this.$scopedSlots;
      }
      /**
       * Over the span of a week (for example) we want to maintain an event in the same row (for weekly and monthly views).
       * We keep track of those rows by indexToOffset. If the value in that array is -1, then we can place an event at that spot.
       * For a daily view with timed events we arrange them based on columns and offsets. If two or more events start at around the
       * same time (eventOverlapThreshold) they go into columns. If one event starts inside another it is indented the appropriate amount.
       * If one event overlaps another after those adjustments are made those events are placed in columns together instead of any defined
       * indents.
       */


      var parsedEvents = this.parsedEvents;
      var indexToOffset = parsedEvents.map(function (event) {
        return -1;
      });
      var resetOnWeekday = this.parsedWeekdays[0];

      var checkReset = function checkReset(day) {
        if (day.weekday === resetOnWeekday) {
          for (var i = 0; i < indexToOffset.length; i++) {
            indexToOffset[i] = -1;
          }
        }
      };

      var getOffset = function getOffset(visual, visuals) {
        var offset = indexToOffset[visual.event.index];

        if (offset === -1) {
          var min = Number.MAX_SAFE_INTEGER;
          var max = -1;
          visuals.forEach(function (other) {
            var otherOffset = indexToOffset[other.event.index];

            if (otherOffset !== -1) {
              min = Math.min(min, otherOffset);
              max = Math.max(max, otherOffset);
            }
          });
          offset = min > 0 && max !== -1 ? min - 1 : max + 1;
          indexToOffset[visual.event.index] = offset;
        }

        return offset;
      };

      var getVisuals = function getVisuals(events, timed) {
        var visuals = events.map(function (event) {
          return {
            event: event,
            offset: 0,
            columnCount: -1,
            column: -1
          };
        }); // sort events by start date/time

        visuals.sort(function (a, b) {
          return a.event.startTimestampIdentifier - b.event.startTimestampIdentifier;
        });

        if (timed) {
          // timed events can be organized into columns
          visuals.forEach(function (visual) {
            if (visual.columnCount !== -1) {
              return;
            }

            var columns = [];
            visuals.forEach(function (other) {
              if (other.columnCount === -1 && _this6.isSameColumn(visual, other)) {
                columns.push(other);
              }
            });

            if (columns.length > 1) {
              columns.forEach(function (visual, visualIndex) {
                visual.column = visualIndex;
                visual.columnCount = columns.length;
              });
            }
          }); // for any not organized into columns, if they overlap another event
          // not in a column they are offset

          visuals.forEach(function (visual) {
            if (visual.columnCount === -1) {
              visuals.forEach(function (other) {
                var otherOffset = indexToOffset[other.event.index];

                if (otherOffset !== -1 && other.event.endTimestampIdentifier <= visual.event.startTimestampIdentifier) {
                  indexToOffset[other.event.index] = -1;
                }
              });
              visual.offset = getOffset(visual, visuals);
            }
          }); // for any not organized into columns, if a previous event overlaps this event
          // join them into the columns

          visuals.forEach(function (visual) {
            if (visual.columnCount === -1) {
              var columns = [visual];
              visuals.forEach(function (other) {
                if (other !== visual && other.columnCount === -1 && _this6.isOverlapping(visual, other)) {
                  columns.push(other);
                }
              });

              if (columns.length > 1) {
                columns.forEach(function (visual, visualIndex) {
                  visual.column = visualIndex;
                  visual.columnCount = columns.length;
                });
              }
            }
          });
        } else {
          visuals.forEach(function (visual) {
            visual.offset = getOffset(visual, visuals);
          });
        }

        visuals.sort(function (a, b) {
          return a.offset - b.offset || a.column - b.column;
        });
        return visuals;
      };

      var getSlotChildren = function getSlotChildren(day, getter, mapper, timed) {
        checkReset(day);
        var events = getter(day);
        return events.length === 0 ? undefined : getVisuals(events, timed).map(function (visual, index) {
          return mapper(visual, index, day);
        });
      };

      var slots = this.$scopedSlots;
      var slotDay = slots.day;
      var slotDayHeader = slots['day-header'];
      var slotDayBody = slots['day-body'];
      return _objectSpread({}, slots, {
        day: function day(_day) {
          var children = getSlotChildren(_day, _this6.getEventsForDay, _this6.genDayEvent, false);

          if (children && children.length > 0 && _this6.eventMore) {
            children.push(_this6.genMore(_day));
          }

          if (slotDay) {
            var slot = slotDay(_day);

            if (slot) {
              children = children ? children.concat(slot) : slot;
            }
          }

          return children;
        },
        'day-header': function dayHeader(day) {
          var children = getSlotChildren(day, _this6.getEventsForDayAll, _this6.genDayEvent, false);

          if (slotDayHeader) {
            var slot = slotDayHeader(day);

            if (slot) {
              children = children ? children.concat(slot) : slot;
            }
          }

          return children;
        },
        'day-body': function dayBody(day) {
          var events = getSlotChildren(day, _this6.getEventsForDayTimed, _this6.genTimedEvent, true);
          var children = [_this6.$createElement('div', {
            staticClass: 'v-event-timed-container'
          }, events)];

          if (slotDayBody) {
            var slot = slotDayBody(day);

            if (slot) {
              children = children.concat(slot);
            }
          }

          return children;
        }
      });
    }
  }
});

exports.default = _default;
//# sourceMappingURL=calendar-with-events.js.map