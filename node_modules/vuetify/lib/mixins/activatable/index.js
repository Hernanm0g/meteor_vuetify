// Mixins
import Delayable from '../delayable';
import Toggleable from '../toggleable'; // Utilities

import mixins from '../../util/mixins';
import { getSlot, getSlotType } from '../../util/helpers';
import { consoleError } from '../../util/console';
const baseMixins = mixins(Delayable, Toggleable);
/* @vue/component */

export default baseMixins.extend({
  name: 'activatable',
  props: {
    activator: {
      default: null,
      validator: val => {
        return ['string', 'object'].includes(typeof val);
      }
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean
  },
  data: () => ({
    activatorElement: null,
    activatorNode: [],
    events: ['click', 'mouseenter', 'mouseleave'],
    listeners: {}
  }),
  watch: {
    activator: 'resetActivator',

    activatorElement(val) {
      if (!val) return;
      this.addActivatorEvents();
    },

    openOnHover: 'resetActivator'
  },

  mounted() {
    const slotType = getSlotType(this, 'activator', true);

    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      consoleError(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`, this);
    }

    this.getActivator();
  },

  beforeDestroy() {
    this.removeActivatorEvents();
  },

  methods: {
    addActivatorEvents() {
      if (!this.activator || this.disabled || !this.activatorElement) return;
      this.listeners = this.genActivatorListeners();
      const keys = Object.keys(this.listeners);

      for (const key of keys) {
        this.activatorElement.addEventListener(key, this.listeners[key]);
      }
    },

    genActivator() {
      const node = getSlot(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes()
      })) || [];
      this.activatorNode = node;
      return node;
    },

    genActivatorAttributes() {
      return {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },

    genActivatorListeners() {
      if (this.disabled) return {};
      const listeners = {};

      if (this.openOnHover) {
        listeners.mouseenter = e => {
          this.getActivator(e);
          this.runDelay('open');
        };

        listeners.mouseleave = e => {
          this.getActivator(e);
          this.runDelay('close');
        };
      } else {
        listeners.click = e => {
          if (this.activatorElement) this.activatorElement.focus();
          this.isActive = !this.isActive;
        };
      }

      return listeners;
    },

    getActivator(e) {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement;
      let activator = null;

      if (this.activator) {
        const target = this.internalActivator ? this.$el : document; // Selector

        if (typeof this.activator === 'string') {
          activator = target.querySelector(this.activator); // VNode
        } else if (this.activator.$el) {
          activator = this.activator.$el; // HTMLElement | Element
        } else {
          activator = this.activator;
        }
      } else if (e) {
        activator = e.currentTarget || e.target;
      } else if (this.activatorNode.length) {
        activator = this.activatorNode[0].elm;
      }

      this.activatorElement = activator;
      return this.activatorElement;
    },

    getContentSlot() {
      return getSlot(this, 'default', this.getValueProxy(), true);
    },

    getValueProxy() {
      const self = this;
      return {
        get value() {
          return self.isActive;
        },

        set value(isActive) {
          self.isActive = isActive;
        }

      };
    },

    removeActivatorEvents() {
      if (!this.activator || !this.activatorElement) return;
      const keys = Object.keys(this.listeners);

      for (const key of keys) {
        this.activatorElement.removeEventListener(key, this.listeners[key]);
      }

      this.listeners = {};
    },

    resetActivator() {
      this.activatorElement = null;
      this.getActivator();
    }

  }
});
//# sourceMappingURL=index.js.map