'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _hrd_pane = require('./hrd_pane');

var _hrd_pane2 = _interopRequireDefault(_hrd_pane);

var _actions = require('./actions');

var _enterprise = require('../enterprise');

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var domain = (0, _enterprise.enterpriseDomain)(model);

  var headerText;

  if (domain != null) {
    headerText = i18n.html('enterpriseActiveLoginInstructions', domain);
  } else {
    headerText = i18n.html('enterpriseLoginIntructions');
  }

  headerText = headerText || null;

  var header = headerText && _react2.default.createElement(
    'p',
    null,
    headerText
  );

  return _react2.default.createElement(_hrd_pane2.default, {
    header: header,
    i18n: i18n,
    model: model,
    passwordInputPlaceholder: i18n.str('passwordInputPlaceholder'),
    usernameInputPlaceholder: i18n.str('usernameInputPlaceholder')
  });
};

var HRDScreen = function (_Screen) {
  _inherits(HRDScreen, _Screen);

  function HRDScreen() {
    _classCallCheck(this, HRDScreen);

    return _possibleConstructorReturn(this, _Screen.call(this, 'hrd'));
  }

  HRDScreen.prototype.backHandler = function backHandler(model) {
    return (0, _enterprise.isSingleHRDConnection)(model) ? null : _actions.cancelHRD;
  };

  HRDScreen.prototype.submitButtonLabel = function submitButtonLabel(m) {
    return i18n.str(m, ['loginSubmitLabel']);
  };

  HRDScreen.prototype.submitHandler = function submitHandler(model) {
    return _actions.logIn;
  };

  HRDScreen.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(model) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(model);
  };

  HRDScreen.prototype.render = function render() {
    return Component;
  };

  return HRDScreen;
}(_screen2.default);

exports.default = HRDScreen;
