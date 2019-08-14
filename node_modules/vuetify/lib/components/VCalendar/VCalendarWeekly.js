// Styles
import "../../../src/components/VCalendar/VCalendarWeekly.sass"; // Components

import VBtn from '../VBtn'; // Mixins

import CalendarBase from './mixins/calendar-base'; // Util

import props from './util/props';
import { createDayList, getDayIdentifier, createNativeLocaleFormatter } from './util/timestamp';
/* @vue/component */

export default CalendarBase.extend({
  name: 'v-calendar-weekly',
  props: props.weeks,
  computed: {
    staticClass() {
      return 'v-calendar-weekly';
    },

    classes() {
      return this.themeClasses;
    },

    parsedMinWeeks() {
      return parseInt(this.minWeeks);
    },

    days() {
      const minDays = this.parsedMinWeeks * this.weekdays.length;
      const start = this.getStartOfWeek(this.parsedStart);
      const end = this.getEndOfWeek(this.parsedEnd);
      return createDayList(start, end, this.times.today, this.weekdaySkips, Number.MAX_SAFE_INTEGER, minDays);
    },

    todayWeek() {
      const today = this.times.today;
      const start = this.getStartOfWeek(today);
      const end = this.getEndOfWeek(today);
      return createDayList(start, end, today, this.weekdaySkips, this.weekdays.length, this.weekdays.length);
    },

    monthFormatter() {
      if (this.monthFormat) {
        return this.monthFormat;
      }

      const longOptions = {
        timeZone: 'UTC',
        month: 'long'
      };
      const shortOptions = {
        timeZone: 'UTC',
        month: 'short'
      };
      return createNativeLocaleFormatter(this.currentLocale, (_tms, short) => short ? shortOptions : longOptions);
    }

  },
  methods: {
    isOutside(day) {
      const dayIdentifier = getDayIdentifier(day);
      return dayIdentifier < getDayIdentifier(this.parsedStart) || dayIdentifier > getDayIdentifier(this.parsedEnd);
    },

    genHead() {
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__head'
      }, this.genHeadDays());
    },

    genHeadDays() {
      return this.todayWeek.map(this.genHeadDay);
    },

    genHeadDay(day, index) {
      const outside = this.isOutside(this.days[index]);
      const color = day.present ? this.color : undefined;
      return this.$createElement('div', this.setTextColor(color, {
        key: day.date,
        staticClass: 'v-calendar-weekly__head-weekday',
        class: this.getRelativeClasses(day, outside)
      }), this.weekdayFormatter(day, this.shortWeekdays));
    },

    genWeeks() {
      const days = this.days;
      const weekDays = this.weekdays.length;
      const weeks = [];

      for (let i = 0; i < days.length; i += weekDays) {
        weeks.push(this.genWeek(days.slice(i, i + weekDays)));
      }

      return weeks;
    },

    genWeek(week) {
      return this.$createElement('div', {
        key: week[0].date,
        staticClass: 'v-calendar-weekly__week'
      }, week.map(this.genDay));
    },

    genDay(day, index) {
      const outside = this.isOutside(day);
      const slot = this.$scopedSlots.day;
      const scope = {
        outside,
        index,
        ...day
      };
      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-weekly__day',
        class: this.getRelativeClasses(day, outside),
        on: this.getDefaultMouseEventHandlers(':day', _e => day)
      }, [this.genDayLabel(day), slot ? slot(scope) : '']);
    },

    genDayLabel(day) {
      const slot = this.$scopedSlots['day-label'];
      return this.$createElement('div', {
        staticClass: 'v-calendar-weekly__day-label'
      }, [slot ? slot(day) : this.genDayLabelButton(day)]);
    },

    genDayLabelButton(day) {
      const color = day.present ? this.color : 'transparent';
      const hasMonth = day.day === 1 && this.showMonthOnFirst;
      return this.$createElement(VBtn, {
        props: {
          color,
          fab: true,
          depressed: true,
          small: true
        },
        on: this.getMouseEventHandlers({
          'click:date': {
            event: 'click',
            stop: true
          },
          'contextmenu:date': {
            event: 'contextmenu',
            stop: true,
            prevent: true,
            result: false
          }
        }, _e => day)
      }, hasMonth ? this.monthFormatter(day, this.shortMonths) + ' ' + this.dayFormatter(day, false) : this.dayFormatter(day, false));
    },

    genDayMonth(day) {
      const color = day.present ? this.color : undefined;
      const slot = this.$scopedSlots['day-month'];
      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-weekly__day-month'
      }), slot ? slot(day) : this.monthFormatter(day, this.shortMonths));
    }

  },

  render(h) {
    return h('div', {
      staticClass: this.staticClass,
      class: this.classes,
      nativeOn: {
        dragstart: e => {
          e.preventDefault();
        }
      }
    }, [!this.hideHeader ? this.genHead() : '', ...this.genWeeks()]);
  }

});
//# sourceMappingURL=VCalendarWeekly.js.map