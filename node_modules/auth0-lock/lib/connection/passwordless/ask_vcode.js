'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _vcode_pane = require('../../field/vcode/vcode_pane');

var _vcode_pane2 = _interopRequireDefault(_vcode_pane);

var _index = require('./index');

var _actions = require('./actions');

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _index2 = require('../../field/index');

var _phone_number = require('../../field/phone_number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var instructions = (0, _index.isEmail)(model) ? i18n.html('passwordlessEmailCodeInstructions', (0, _index2.getFieldValue)(model, 'email')) : i18n.html('passwordlessSMSCodeInstructions', (0, _phone_number.humanPhoneNumberWithDiallingCode)(model));

  return _react2.default.createElement(_vcode_pane2.default, {
    instructions: instructions,
    lock: model,
    placeholder: i18n.str('codeInputPlaceholder'),
    resendLabel: i18n.str('resendCodeAction'),
    onRestart: _actions.restart
  });
};

var VcodeScreen = function (_Screen) {
  _inherits(VcodeScreen, _Screen);

  function VcodeScreen() {
    _classCallCheck(this, VcodeScreen);

    return _possibleConstructorReturn(this, _Screen.call(this, 'vcode'));
  }

  VcodeScreen.prototype.backHandler = function backHandler() {
    return _actions.restart;
  };

  VcodeScreen.prototype.submitHandler = function submitHandler() {
    return _actions.logIn;
  };

  VcodeScreen.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock);
  };

  VcodeScreen.prototype.render = function render() {
    return Component;
  };

  return VcodeScreen;
}(_screen2.default);

exports.default = VcodeScreen;
