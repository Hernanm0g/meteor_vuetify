'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _reset_password_pane = require('./reset_password_pane');

var _reset_password_pane2 = _interopRequireDefault(_reset_password_pane);

var _index = require('./index');

var _actions = require('./actions');

var _password_reset_confirmation = require('./password_reset_confirmation');

var _index2 = require('../../connection/database/index');

var _enterprise = require('../../connection/enterprise');

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _index4 = require('../../store/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var headerText = i18n.html('forgotPasswordInstructions') || null;
  var header = headerText && _react2.default.createElement(
    'p',
    null,
    headerText
  );

  return _react2.default.createElement(_reset_password_pane2.default, {
    emailInputPlaceholder: i18n.str('emailInputPlaceholder'),
    header: header,
    i18n: i18n,
    lock: model
  });
};

var ResetPassword = function (_Screen) {
  _inherits(ResetPassword, _Screen);

  function ResetPassword() {
    _classCallCheck(this, ResetPassword);

    return _possibleConstructorReturn(this, _Screen.call(this, 'forgotPassword'));
  }

  ResetPassword.prototype.backHandler = function backHandler(m) {
    return (0, _index.hasScreen)(m, 'login') ? _actions.cancelResetPassword : undefined;
  };

  ResetPassword.prototype.submitButtonLabel = function submitButtonLabel(m) {
    return i18n.str(m, ['forgotPasswordSubmitLabel']);
  };

  ResetPassword.prototype.getScreenTitle = function getScreenTitle(m) {
    return i18n.str(m, 'forgotPasswordTitle');
  };

  ResetPassword.prototype.isSubmitDisabled = function isSubmitDisabled(m) {
    var tryingToResetPasswordWithEnterpriseEmail = (0, _enterprise.isEnterpriseDomain)(m, (0, _index2.databaseUsernameValue)(m, { emailFirst: true }));
    if (tryingToResetPasswordWithEnterpriseEmail) {
      setTimeout(function () {
        (0, _index4.swap)(_index4.updateEntity, 'lock', l.id(m), l.setGlobalError, i18n.str(m, ['error', 'forgotPassword', 'enterprise_email']));
      }, 50);
    } else {
      (0, _index4.swap)(_index4.updateEntity, 'lock', l.id(m), l.clearGlobalError);
    }
    return tryingToResetPasswordWithEnterpriseEmail;
  };

  ResetPassword.prototype.submitHandler = function submitHandler() {
    return _actions.resetPassword;
  };

  ResetPassword.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(m) {
    return (0, _password_reset_confirmation.renderPasswordResetConfirmation)(m);
  };

  ResetPassword.prototype.render = function render() {
    return Component;
  };

  return ResetPassword;
}(_screen2.default);

exports.default = ResetPassword;
