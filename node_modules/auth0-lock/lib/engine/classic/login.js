'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _social_buttons_pane = require('../../field/social/social_buttons_pane');

var _social_buttons_pane2 = _interopRequireDefault(_social_buttons_pane);

var _login_pane = require('../../connection/database/login_pane');

var _login_pane2 = _interopRequireDefault(_login_pane);

var _pane_separator = require('../../core/pane_separator');

var _pane_separator2 = _interopRequireDefault(_pane_separator);

var _index = require('../../connection/database/index');

var _actions = require('../../connection/database/actions');

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _login_sign_up_tabs = require('../../connection/database/login_sign_up_tabs');

var _login_sign_up_tabs2 = _interopRequireDefault(_login_sign_up_tabs);

var _index2 = require('../../core/index');

var l = _interopRequireWildcard(_index2);

var _actions2 = require('../../connection/enterprise/actions');

var _enterprise = require('../../connection/enterprise');

var _single_sign_on_notice = require('../../connection/enterprise/single_sign_on_notice');

var _single_sign_on_notice2 = _interopRequireDefault(_single_sign_on_notice);

var _classic = require('../classic');

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function shouldRenderTabs(m) {
  if ((0, _classic.isSSOEnabled)(m)) return false;
  if (l.hasSomeConnections(m, 'database')) return (0, _index.hasScreen)(m, 'signUp');
  if (l.hasSomeConnections(m, 'social') && (0, _index.hasInitialScreen)(m, 'signUp')) return (0, _index.hasScreen)(m, 'signUp');
}

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var sso = (0, _classic.isSSOEnabled)(model);
  var onlySocial = (0, _classic.hasOnlyClassicConnections)(model, 'social');

  var tabs = shouldRenderTabs(model) && _react2.default.createElement(_login_sign_up_tabs2.default, {
    key: 'loginsignup',
    lock: model,
    loginLabel: i18n.str('loginLabel'),
    signUpLink: (0, _index.signUpLink)(model),
    signUpLabel: i18n.str('signUpLabel')
  });

  var social = l.hasSomeConnections(model, 'social') && _react2.default.createElement(_social_buttons_pane2.default, {
    instructions: i18n.html('socialLoginInstructions'),
    labelFn: i18n.str,
    lock: model,
    showLoading: onlySocial,
    signUp: false
  });

  var showPassword = !sso && (l.hasSomeConnections(model, 'database') || !!(0, _enterprise.findADConnectionWithoutDomain)(model));

  var showForgotPasswordLink = showPassword && l.hasSomeConnections(model, 'database');

  var loginInstructionsKey = social ? 'databaseEnterpriseAlternativeLoginInstructions' : 'databaseEnterpriseLoginInstructions';

  var usernameInputPlaceholderKey = (0, _index.databaseUsernameStyle)(model) === 'any' || l.countConnections(model, 'enterprise') > 1 ? 'usernameOrEmailInputPlaceholder' : 'usernameInputPlaceholder';

  var usernameStyle = (0, _index.databaseUsernameStyle)(model);

  var login = (sso || l.hasSomeConnections(model, 'database') || l.hasSomeConnections(model, 'enterprise')) && _react2.default.createElement(_login_pane2.default, {
    emailInputPlaceholder: i18n.str('emailInputPlaceholder'),
    forgotPasswordAction: i18n.str('forgotPasswordAction'),
    i18n: i18n,
    instructions: i18n.html(loginInstructionsKey),
    lock: model,
    passwordInputPlaceholder: i18n.str('passwordInputPlaceholder'),
    showForgotPasswordLink: showForgotPasswordLink,
    showPassword: showPassword,
    usernameInputPlaceholder: i18n.str(usernameInputPlaceholderKey),
    usernameStyle: usernameStyle
  });

  var ssoNotice = sso && _react2.default.createElement(
    _single_sign_on_notice2.default,
    null,
    i18n.str('ssoEnabled')
  );

  var separator = social && login && _react2.default.createElement(_pane_separator2.default, null);

  return _react2.default.createElement(
    'div',
    null,
    ssoNotice,
    tabs,
    _react2.default.createElement(
      'div',
      null,
      social,
      separator,
      login
    )
  );
};

var Login = function (_Screen) {
  _inherits(Login, _Screen);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, _Screen.call(this, 'main.login'));
  }

  Login.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock);
  };

  Login.prototype.renderTabs = function renderTabs(model) {
    return shouldRenderTabs(model);
  };

  Login.prototype.submitButtonLabel = function submitButtonLabel(m) {
    return i18n.str(m, ['loginSubmitLabel']);
  };

  Login.prototype.isSubmitDisabled = function isSubmitDisabled(m) {
    // it should disable the submit button if there is any connection that
    // requires username/password and there is no enterprise with domain
    // that matches with the email domain entered for HRD
    return !l.hasSomeConnections(m, 'database') && // no database connection
    !(0, _enterprise.findADConnectionWithoutDomain)(m) && // no enterprise without domain
    !(0, _classic.isSSOEnabled)(m); // no matching domain
  };

  Login.prototype.submitHandler = function submitHandler(model) {
    if ((0, _classic.hasOnlyClassicConnections)(model, 'social')) {
      return null;
    }

    if ((0, _enterprise.isHRDDomain)(model, (0, _index.databaseUsernameValue)(model))) {
      return function (id) {
        return (0, _actions2.startHRD)(id, (0, _index.databaseUsernameValue)(model));
      };
    }

    var useDatabaseConnection = !(0, _classic.isSSOEnabled)(model) && (0, _index.databaseConnection)(model) && ((0, _index.defaultDatabaseConnection)(model) || !(0, _enterprise.defaultEnterpriseConnection)(model));

    return useDatabaseConnection ? _actions.logIn : _actions2.logIn;
  };

  Login.prototype.render = function render() {
    return Component;
  };

  return Login;
}(_screen2.default);

exports.default = Login;
