"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../../src/components/VBadge/VBadge.sass");

var _colorable = _interopRequireDefault(require("../../mixins/colorable"));

var _toggleable = _interopRequireDefault(require("../../mixins/toggleable"));

var _positionable = require("../../mixins/positionable");

var _transitionable = _interopRequireDefault(require("../../mixins/transitionable"));

var _mixins = _interopRequireDefault(require("../../util/mixins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles
// Mixins
var _default = (0, _mixins.default)(_colorable.default, _toggleable.default, (0, _positionable.factory)(['left', 'bottom']), _transitionable.default
/* @vue/component */
).extend({
  name: 'v-badge',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    overlap: Boolean,
    transition: {
      type: String,
      default: 'fab-transition'
    },
    value: {
      default: true
    }
  },
  computed: {
    classes: function classes() {
      return {
        'v-badge--bottom': this.bottom,
        'v-badge--left': this.left,
        'v-badge--overlap': this.overlap
      };
    }
  },
  render: function render(h) {
    var badge = this.$slots.badge && [h('span', this.setBackgroundColor(this.color, {
      staticClass: 'v-badge__badge',
      attrs: this.$attrs,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }), this.$slots.badge)];
    return h('span', {
      staticClass: 'v-badge',
      class: this.classes
    }, [this.$slots.default, this.transition ? h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, badge) : badge]);
  }
});

exports.default = _default;
//# sourceMappingURL=VBadge.js.map