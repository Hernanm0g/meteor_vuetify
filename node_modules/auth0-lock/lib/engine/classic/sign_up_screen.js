'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _index = require('../../connection/database/index');

var _actions = require('../../connection/database/actions');

var _classic = require('../classic');

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _signed_up_confirmation = require('../../connection/database/signed_up_confirmation');

var _index2 = require('../../field/index');

var _actions2 = require('../../connection/enterprise/actions');

var _enterprise = require('../../connection/enterprise');

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

var _sign_up_pane = require('./sign_up_pane');

var _sign_up_pane2 = _interopRequireDefault(_sign_up_pane);

var _pane_separator = require('../../core/pane_separator');

var _pane_separator2 = _interopRequireDefault(_pane_separator);

var _sign_up_terms = require('../../connection/database/sign_up_terms');

var _sign_up_terms2 = _interopRequireDefault(_sign_up_terms);

var _social_buttons_pane = require('../../field/social/social_buttons_pane');

var _social_buttons_pane2 = _interopRequireDefault(_social_buttons_pane);

var _login_sign_up_tabs = require('../../connection/database/login_sign_up_tabs');

var _login_sign_up_tabs2 = _interopRequireDefault(_login_sign_up_tabs);

var _single_sign_on_notice = require('../../connection/enterprise/single_sign_on_notice');

var _single_sign_on_notice2 = _interopRequireDefault(_single_sign_on_notice);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var sso = (0, _classic.isSSOEnabled)(model, { emailFirst: true }) && (0, _index.hasScreen)(model, 'login');
  var ssoNotice = sso && _react2.default.createElement(
    _single_sign_on_notice2.default,
    null,
    i18n.str('ssoEnabled')
  );

  var tabs = !sso && (0, _index.hasScreen)(model, 'login') && _react2.default.createElement(_login_sign_up_tabs2.default, {
    key: 'loginsignup',
    lock: model,
    loginLabel: i18n.str('loginLabel'),
    signUpLabel: i18n.str('signUpLabel')
  });

  var social = l.hasSomeConnections(model, 'social') && _react2.default.createElement(_social_buttons_pane2.default, {
    instructions: i18n.html('socialSignUpInstructions'),
    labelFn: i18n.str,
    lock: model,
    signUp: true,
    disabled: !(0, _index.termsAccepted)(model)
  });

  var signUpInstructionsKey = social ? 'databaseAlternativeSignUpInstructions' : 'databaseSignUpInstructions';

  var db = (l.hasSomeConnections(model, 'database') || l.hasSomeConnections(model, 'enterprise')) && _react2.default.createElement(_sign_up_pane2.default, {
    emailInputPlaceholder: i18n.str('emailInputPlaceholder'),
    i18n: i18n,
    instructions: i18n.html(signUpInstructionsKey),
    model: model,
    onlyEmail: sso,
    passwordInputPlaceholder: i18n.str('passwordInputPlaceholder'),
    passwordStrengthMessages: i18n.group('passwordStrength'),
    usernameInputPlaceholder: i18n.str('usernameInputPlaceholder')
  });

  var separator = social && db && _react2.default.createElement(_pane_separator2.default, null);

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
      db
    )
  );
};

var SignUp = function (_Screen) {
  _inherits(SignUp, _Screen);

  function SignUp() {
    _classCallCheck(this, SignUp);

    return _possibleConstructorReturn(this, _Screen.call(this, 'main.signUp'));
  }

  SignUp.prototype.submitButtonLabel = function submitButtonLabel(m) {
    return i18n.str(m, ['signUpSubmitLabel']);
  };

  SignUp.prototype.submitHandler = function submitHandler(m) {
    if ((0, _classic.hasOnlyClassicConnections)(m, 'social')) return null;
    var username = (0, _index.databaseUsernameValue)(m, { emailFirst: true });
    if ((0, _enterprise.isHRDDomain)(m, username)) {
      return function (id) {
        return (0, _actions2.startHRD)(id, username);
      };
    }
    if ((0, _classic.isSSOEnabled)(m, { emailFirst: true })) return _actions2.logIn;
    return _actions.signUp;
  };

  SignUp.prototype.isSubmitDisabled = function isSubmitDisabled(m) {
    return !(0, _index.termsAccepted)(m);
  };

  SignUp.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock) || (0, _signed_up_confirmation.renderSignedUpConfirmation)(lock) || (0, _index2.renderOptionSelection)(lock);
  };

  SignUp.prototype.renderTabs = function renderTabs() {
    return true;
  };

  SignUp.prototype.getScreenTitle = function getScreenTitle(m) {
    // signupTitle is inconsistent with the rest of the codebase
    // but, since changing this would be a breaking change, we'll
    // still support it until the next major version
    return i18n.str(m, 'signUpTitle') || i18n.str(m, 'signupTitle');
  };

  SignUp.prototype.renderTerms = function renderTerms(m, terms) {
    var checkHandler = (0, _index.mustAcceptTerms)(m) ? function () {
      return (0, _actions.toggleTermsAcceptance)(l.id(m));
    } : undefined;
    return terms && (0, _index.showTerms)(m) ? _react2.default.createElement(
      _sign_up_terms2.default,
      {
        showCheckbox: (0, _index.mustAcceptTerms)(m),
        checkHandler: checkHandler,
        checked: (0, _index.termsAccepted)(m)
      },
      terms
    ) : null;
  };

  SignUp.prototype.render = function render() {
    return Component;
  };

  return SignUp;
}(_screen2.default);

exports.default = SignUp;
