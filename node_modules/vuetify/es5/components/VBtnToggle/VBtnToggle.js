"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../../src/components/VBtnToggle/VBtnToggle.sass");

var _buttonGroup = _interopRequireDefault(require("../../mixins/button-group"));

var _colorable = _interopRequireDefault(require("../../mixins/colorable"));

var _mixins = _interopRequireDefault(require("../../util/mixins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* @vue/component */
var _default = (0, _mixins.default)(_buttonGroup.default, _colorable.default).extend({
  name: 'v-btn-toggle',
  props: {
    rounded: Boolean
  },
  computed: {
    classes: function classes() {
      return _objectSpread({}, _buttonGroup.default.options.computed.classes.call(this), {
        'v-btn-toggle': true,
        'v-btn-toggle--rounded': this.rounded
      }, this.themeClasses);
    }
  },
  methods: {
    genData: function genData() {
      return this.setTextColor(this.color, _objectSpread({}, _buttonGroup.default.options.methods.genData.call(this)));
    }
  }
});

exports.default = _default;
//# sourceMappingURL=VBtnToggle.js.map