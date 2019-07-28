'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _quick_auth_pane = require('../../ui/pane/quick_auth_pane');

var _quick_auth_pane2 = _interopRequireDefault(_quick_auth_pane);

var _actions = require('../../quick-auth/actions');

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _enterprise = require('../enterprise');

var _index2 = require('../../connection/social/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: handle this from CSS
function icon(strategy) {
  if (strategy === 'google-apps') return strategy;
  if (~['adfs', 'office365', 'waad'].indexOf(strategy)) return 'windows';
  return 'auth0';
}

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var headerText = i18n.html('enterpriseLoginIntructions') || null;
  var header = headerText && _react2.default.createElement(
    'p',
    null,
    headerText
  );

  var theme = (0, _index2.authButtonsTheme)(model);

  var connection = (0, _enterprise.quickAuthConnection)(model);
  var connectionName = connection.getIn(['name']);
  var connectionDomain = connection.getIn(['domains', 0]);

  var buttonTheme = theme.get(connection.get('name'));

  var buttonLabel = buttonTheme && buttonTheme.get('displayName') || connectionDomain && i18n.str('loginAtLabel', connectionDomain) || i18n.str('loginAtLabel', connectionName);

  var primaryColor = buttonTheme && buttonTheme.get('primaryColor');
  var foregroundColor = buttonTheme && buttonTheme.get('foregroundColor');
  var buttonIcon = buttonTheme && buttonTheme.get('icon');

  return _react2.default.createElement(_quick_auth_pane2.default, {
    buttonLabel: buttonLabel,
    buttonClickHandler: function buttonClickHandler(e) {
      return (0, _actions.logIn)(l.id(model), (0, _enterprise.quickAuthConnection)(model));
    },
    header: header,
    buttonIcon: buttonIcon,
    primaryColor: primaryColor,
    foregroundColor: foregroundColor,
    strategy: icon((0, _enterprise.quickAuthConnection)(model).get('strategy'))
  });
};

var QuickAuthScreen = function (_Screen) {
  _inherits(QuickAuthScreen, _Screen);

  function QuickAuthScreen() {
    _classCallCheck(this, QuickAuthScreen);

    return _possibleConstructorReturn(this, _Screen.call(this, 'enterpriseQuickAuth'));
  }

  QuickAuthScreen.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock);
  };

  QuickAuthScreen.prototype.render = function render() {
    return Component;
  };

  return QuickAuthScreen;
}(_screen2.default);

exports.default = QuickAuthScreen;
