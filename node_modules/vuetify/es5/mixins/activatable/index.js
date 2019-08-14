"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _delayable = _interopRequireDefault(require("../delayable"));

var _toggleable = _interopRequireDefault(require("../toggleable"));

var _mixins = _interopRequireDefault(require("../../util/mixins"));

var _helpers = require("../../util/helpers");

var _console = require("../../util/console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var baseMixins = (0, _mixins.default)(_delayable.default, _toggleable.default);
/* @vue/component */

var _default = baseMixins.extend({
  name: 'activatable',
  props: {
    activator: {
      default: null,
      validator: function validator(val) {
        return ['string', 'object'].includes(_typeof(val));
      }
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean
  },
  data: function data() {
    return {
      activatorElement: null,
      activatorNode: [],
      events: ['click', 'mouseenter', 'mouseleave'],
      listeners: {}
    };
  },
  watch: {
    activator: 'resetActivator',
    activatorElement: function activatorElement(val) {
      if (!val) return;
      this.addActivatorEvents();
    },
    openOnHover: 'resetActivator'
  },
  mounted: function mounted() {
    var slotType = (0, _helpers.getSlotType)(this, 'activator', true);

    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      (0, _console.consoleError)("The activator slot must be bound, try '<template v-slot:activator=\"{ on }\"><v-btn v-on=\"on\">'", this);
    }

    this.getActivator();
  },
  beforeDestroy: function beforeDestroy() {
    this.removeActivatorEvents();
  },
  methods: {
    addActivatorEvents: function addActivatorEvents() {
      if (!this.activator || this.disabled || !this.activatorElement) return;
      this.listeners = this.genActivatorListeners();
      var keys = Object.keys(this.listeners);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        this.activatorElement.addEventListener(key, this.listeners[key]);
      }
    },
    genActivator: function genActivator() {
      var node = (0, _helpers.getSlot)(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes()
      })) || [];
      this.activatorNode = node;
      return node;
    },
    genActivatorAttributes: function genActivatorAttributes() {
      return {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },
    genActivatorListeners: function genActivatorListeners() {
      var _this = this;

      if (this.disabled) return {};
      var listeners = {};

      if (this.openOnHover) {
        listeners.mouseenter = function (e) {
          _this.getActivator(e);

          _this.runDelay('open');
        };

        listeners.mouseleave = function (e) {
          _this.getActivator(e);

          _this.runDelay('close');
        };
      } else {
        listeners.click = function (e) {
          if (_this.activatorElement) _this.activatorElement.focus();
          _this.isActive = !_this.isActive;
        };
      }

      return listeners;
    },
    getActivator: function getActivator(e) {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement;
      var activator = null;

      if (this.activator) {
        var target = this.internalActivator ? this.$el : document; // Selector

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
    getContentSlot: function getContentSlot() {
      return (0, _helpers.getSlot)(this, 'default', this.getValueProxy(), true);
    },
    getValueProxy: function getValueProxy() {
      var self = this;
      return {
        get value() {
          return self.isActive;
        },

        set value(isActive) {
          self.isActive = isActive;
        }

      };
    },
    removeActivatorEvents: function removeActivatorEvents() {
      if (!this.activator || !this.activatorElement) return;
      var keys = Object.keys(this.listeners);

      for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
        var key = _keys2[_i2];
        this.activatorElement.removeEventListener(key, this.listeners[key]);
      }

      this.listeners = {};
    },
    resetActivator: function resetActivator() {
      this.activatorElement = null;
      this.getActivator();
    }
  }
});

exports.default = _default;
//# sourceMappingURL=index.js.map