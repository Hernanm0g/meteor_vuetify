// Types
import Vue from 'vue'; // Utils

import { getObjectValueByPath } from '../../util/helpers';
export default Vue.extend({
  name: 'row',
  functional: true,
  props: {
    headers: Array,
    item: Object,
    rtl: Boolean
  },

  render(h, {
    props,
    slots,
    data
  }) {
    const computedSlots = slots();
    const columns = props.headers.map(header => {
      const children = [];
      const value = getObjectValueByPath(props.item, header.value);
      const slotName = header.value;
      const scopedSlot = data.scopedSlots && data.scopedSlots[slotName];
      const regularSlot = computedSlots[slotName];

      if (scopedSlot) {
        children.push(scopedSlot({
          item: props.item,
          header,
          value
        }));
      } else if (regularSlot) {
        children.push(regularSlot);
      } else {
        children.push(value);
      }

      return h('td', {
        class: `text-${header.align || 'start'}`
      }, children);
    });
    return h('tr', data, columns);
  }

});
//# sourceMappingURL=Row.js.map