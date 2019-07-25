// Mixins
import mixins from '../../../util/mixins';
import Colorable from '../../../mixins/colorable';
import Localable from '../../../mixins/localable';
import Mouse from './mouse';
import Themeable from '../../../mixins/themeable';
import Times from './times'; // Directives

import Resize from '../../../directives/resize'; // Util

import props from '../util/props';
import { parseTimestamp, getWeekdaySkips, createDayList, createNativeLocaleFormatter, getStartOfWeek, getEndOfWeek } from '../util/timestamp';
export default mixins(Colorable, Localable, Mouse, Themeable, Times
/* @vue/component */
).extend({
  name: 'calendar-base',
  directives: {
    Resize
  },
  props: props.base,
  computed: {
    weekdaySkips() {
      return getWeekdaySkips(this.weekdays);
    },

    weekdaySkipsReverse() {
      const reversed = this.weekdaySkips.slice();
      reversed.reverse();
      return reversed;
    },

    parsedStart() {
      return parseTimestamp(this.start);
    },

    parsedEnd() {
      return this.end ? parseTimestamp(this.end) : this.parsedStart;
    },

    days() {
      return createDayList(this.parsedStart, this.parsedEnd, this.times.today, this.weekdaySkips);
    },

    dayFormatter() {
      if (this.dayFormat) {
        return this.dayFormat;
      }

      const options = {
        timeZone: 'UTC',
        day: 'numeric'
      };
      return createNativeLocaleFormatter(this.currentLocale, (_tms, _short) => options);
    },

    weekdayFormatter() {
      if (this.weekdayFormat) {
        return this.weekdayFormat;
      }

      const longOptions = {
        timeZone: 'UTC',
        weekday: 'long'
      };
      const shortOptions = {
        timeZone: 'UTC',
        weekday: 'short'
      };
      return createNativeLocaleFormatter(this.currentLocale, (_tms, short) => short ? shortOptions : longOptions);
    }

  },
  methods: {
    getRelativeClasses(timestamp, outside = false) {
      return {
        'v-present': timestamp.present,
        'v-past': timestamp.past,
        'v-future': timestamp.future,
        'v-outside': outside
      };
    },

    getStartOfWeek(timestamp) {
      return getStartOfWeek(timestamp, this.weekdays, this.times.today);
    },

    getEndOfWeek(timestamp) {
      return getEndOfWeek(timestamp, this.weekdays, this.times.today);
    },

    getFormatter(options) {
      return createNativeLocaleFormatter(this.locale, (_tms, _short) => options);
    }

  }
});
//# sourceMappingURL=calendar-base.js.map