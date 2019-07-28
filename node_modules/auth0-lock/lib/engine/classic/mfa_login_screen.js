'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _mfa_pane = require('../../connection/database/mfa_pane');

var _mfa_pane2 = _interopRequireDefault(_mfa_pane);

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

var _actions = require('../../connection/database/actions');

var _index = require('../../connection/database/index');

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  return _react2.default.createElement(_mfa_pane2.default, {
    mfaInputPlaceholder: i18n.str('mfaInputPlaceholder'),
    i18n: i18n,
    instructions: i18n.str('mfaLoginInstructions'),
    lock: model,
    title: i18n.str('mfaLoginTitle')
  });
};

var MFALoginScreen = function (_Screen) {
  _inherits(MFALoginScreen, _Screen);

  function MFALoginScreen() {
    _classCallCheck(this, MFALoginScreen);

    return _possibleConstructorReturn(this, _Screen.call(this, 'mfa.mfaCode'));
  }

  MFALoginScreen.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock);
  };

  MFALoginScreen.prototype.submitButtonLabel = function submitButtonLabel(m) {
    return i18n.str(m, ['mfaSubmitLabel']);
  };

  MFALoginScreen.prototype.submitHandler = function submitHandler(m) {
    return function (id) {
      return (0, _actions.logIn)(id, true);
    };
  };

  MFALoginScreen.prototype.render = function render() {
    return Component;
  };

  MFALoginScreen.prototype.backHandler = function backHandler(m) {
    return (0, _index.hasScreen)(m, 'login') ? _actions.cancelMFALogin : undefined;
  };

  return MFALoginScreen;
}(_screen2.default);

exports.default = MFALoginScreen;
