"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _themeable = _interopRequireDefault(require("../mixins/themeable"));

var _mixins = _interopRequireDefault(require("./mixins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
var _default = (0, _mixins.default)(_themeable.default).extend({
  name: 'theme-provider',
  props: {
    root: Boolean
  },
  computed: {
    isDark: function isDark() {
      return this.root ? this.rootIsDark : _themeable.default.options.computed.isDark.call(this);
    }
  },
  render: function render() {
    return this.$slots.default && this.$slots.default.find(function (node) {
      return !node.isComment && node.text !== ' ';
    });
  }
});

exports.default = _default;
//# sourceMappingURL=ThemeProvider.js.map