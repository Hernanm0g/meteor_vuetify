"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lang = void 0;

var _service = require("../service");

var _en = _interopRequireDefault(require("../../locale/en"));

var _helpers = require("../../util/helpers");

var _console = require("../../util/console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LANG_PREFIX = '$vuetify.';
var fallback = Symbol('Lang fallback');

function getTranslation(locale, key) {
  var usingFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var shortKey = key.replace(LANG_PREFIX, '');
  var translation = (0, _helpers.getObjectValueByPath)(locale, shortKey, fallback);

  if (translation === fallback) {
    if (usingFallback) {
      (0, _console.consoleError)("Translation key \"".concat(shortKey, "\" not found in fallback"));
      translation = key;
    } else {
      (0, _console.consoleWarn)("Translation key \"".concat(shortKey, "\" not found, falling back to default"));
      translation = getTranslation(_en.default, key, true);
    }
  }

  return translation;
}

var Lang =
/*#__PURE__*/
function (_Service) {
  _inherits(Lang, _Service);

  function Lang() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Lang);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Lang).call(this));
    _this.current = options.current || 'en';
    _this.locales = Object.assign({
      en: _en.default
    }, options.locales);
    _this.translator = options.t;
    return _this;
  }

  _createClass(Lang, [{
    key: "t",
    value: function t(key) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (!key.startsWith(LANG_PREFIX)) return this.replace(key, params);
      if (this.translator) return this.translator.apply(this, [key].concat(params));
      var translation = getTranslation(this.locales[this.current], key);
      return this.replace(translation, params);
    }
  }, {
    key: "replace",
    value: function replace(str, params) {
      return str.replace(/\{(\d+)\}/g, function (match, index) {
        /* istanbul ignore next */
        return String(params[+index]);
      });
    }
  }]);

  return Lang;
}(_service.Service);

exports.Lang = Lang;
Lang.property = 'lang';
//# sourceMappingURL=index.js.map