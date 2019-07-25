// Styles
import "../../../src/components/VExpansionPanel/VExpansionPanel.sass"; // Components

import { BaseItemGroup } from '../VItemGroup/VItemGroup'; // Utilities

import { breaking } from '../../util/console';
/* @vue/component */

export default BaseItemGroup.extend({
  name: 'v-expansion-panels',

  provide() {
    return {
      expansionPanels: this
    };
  },

  props: {
    accordion: Boolean,
    disabled: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean,
    readonly: Boolean
  },
  computed: {
    classes() {
      return { ...BaseItemGroup.options.computed.classes.call(this),
        'v-expansion-panels': true,
        'v-expansion-panels--accordion': this.accordion,
        'v-expansion-panels--focusable': this.focusable,
        'v-expansion-panels--inset': this.inset,
        'v-expansion-panels--popout': this.popout
      };
    }

  },

  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('expand')) {
      breaking('expand', 'multiple', this);
    }
    /* istanbul ignore next */


    if (Array.isArray(this.value) && this.value.length > 0 && typeof this.value[0] === 'boolean') {
      breaking(':value="[true, false, true]"', ':value="[0, 2]"', this);
    }
  },

  methods: {
    updateItem(item, index) {
      const value = this.getValue(item, index);
      const nextValue = this.getValue(item, index + 1);
      item.isActive = this.toggleMethod(value);
      item.nextIsActive = this.toggleMethod(nextValue);
    }

  }
});
//# sourceMappingURL=VExpansionPanels.js.map