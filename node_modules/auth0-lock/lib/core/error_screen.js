'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _index = require('./index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorScreen = function (_Screen) {
  _inherits(ErrorScreen, _Screen);

  function ErrorScreen() {
    _classCallCheck(this, ErrorScreen);

    return _possibleConstructorReturn(this, _Screen.call(this, 'error'));
  }

  ErrorScreen.prototype.render = function render() {
    return ErrorPane;
  };

  return ErrorScreen;
}(_screen2.default);

exports.default = ErrorScreen;


var ErrorPane = function ErrorPane(_ref) {
  var i18n = _ref.i18n;
  return _react2.default.createElement(
    'div',
    { className: 'auth0-lock-error-pane' },
    _react2.default.createElement(
      'p',
      null,
      i18n.html('unrecoverableError')
    )
  );
};

ErrorPane.propTypes = {
  i18n: _propTypes2.default.object.isRequired
};
