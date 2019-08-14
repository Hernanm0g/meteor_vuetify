"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateNumber = validateNumber;
exports.default = void 0;

var _timestamp = require("./timestamp");

var _default2 = {
  base: {
    start: {
      type: String,
      validate: _timestamp.validateTimestamp,
      default: function _default() {
        return (0, _timestamp.parseDate)(new Date()).date;
      }
    },
    end: {
      type: String,
      validate: _timestamp.validateTimestamp
    },
    weekdays: {
      type: Array,
      default: function _default() {
        return [0, 1, 2, 3, 4, 5, 6];
      }
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    shortWeekdays: {
      type: Boolean,
      default: true
    },
    weekdayFormat: {
      type: Function,
      default: null
    },
    dayFormat: {
      type: Function,
      default: null
    }
  },
  intervals: {
    maxDays: {
      type: Number,
      default: 7
    },
    shortIntervals: {
      type: Boolean,
      default: true
    },
    intervalHeight: {
      type: [Number, String],
      default: 40,
      validate: validateNumber
    },
    intervalMinutes: {
      type: [Number, String],
      default: 60,
      validate: validateNumber
    },
    firstInterval: {
      type: [Number, String],
      default: 0,
      validate: validateNumber
    },
    intervalCount: {
      type: [Number, String],
      default: 24,
      validate: validateNumber
    },
    intervalFormat: {
      type: Function,
      default: null
    },
    intervalStyle: {
      type: Function,
      default: null
    },
    showIntervalLabel: {
      type: Function,
      default: null
    }
  },
  weeks: {
    minWeeks: {
      validate: validateNumber,
      default: 1
    },
    shortMonths: {
      type: Boolean,
      default: true
    },
    showMonthOnFirst: {
      type: Boolean,
      default: true
    },
    monthFormat: {
      type: Function,
      default: null
    }
  },
  calendar: {
    type: {
      type: String,
      default: 'month'
    },
    value: {
      type: String,
      validate: _timestamp.validateTimestamp
    }
  },
  events: {
    events: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    eventStart: {
      type: String,
      default: 'start'
    },
    eventEnd: {
      type: String,
      default: 'end'
    },
    eventHeight: {
      type: Number,
      default: 20
    },
    eventColor: {
      type: [String, Function],
      default: 'secondary'
    },
    eventTextColor: {
      type: [String, Function],
      default: 'white'
    },
    eventName: {
      type: [String, Function],
      default: 'name'
    },
    eventOverlapThreshold: {
      type: Number,
      default: 60
    },
    eventMore: {
      type: Boolean,
      default: true
    },
    eventMoreText: {
      type: String,
      default: '$vuetify.calendar.moreEvents'
    },
    eventRipple: {
      type: [Boolean, Object],
      default: null
    },
    eventMarginBottom: {
      type: Number,
      default: 1
    }
  }
};
exports.default = _default2;

function validateNumber(input) {
  return isFinite(parseInt(input));
}
//# sourceMappingURL=props.js.map