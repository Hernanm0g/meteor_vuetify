'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _email_pane = require('../../field/email/email_pane');

var _email_pane2 = _interopRequireDefault(_email_pane);

var _username_pane = require('../../field/username/username_pane');

var _username_pane2 = _interopRequireDefault(_username_pane);

var _password_pane = require('../../field/password/password_pane');

var _password_pane2 = _interopRequireDefault(_password_pane);

var _actions = require('./actions');

var _index = require('./index');

var _index2 = require('../../core/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPane = function (_React$Component) {
  _inherits(LoginPane, _React$Component);

  function LoginPane() {
    _classCallCheck(this, LoginPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  LoginPane.prototype.handleDontRememberPasswordClick = function handleDontRememberPasswordClick(e) {
    e.preventDefault();
    (0, _actions.showResetPasswordActivity)(l.id(this.props.lock));
  };

  LoginPane.prototype.render = function render() {
    var _props = this.props,
        emailInputPlaceholder = _props.emailInputPlaceholder,
        forgotPasswordAction = _props.forgotPasswordAction,
        i18n = _props.i18n,
        instructions = _props.instructions,
        lock = _props.lock,
        passwordInputPlaceholder = _props.passwordInputPlaceholder,
        showForgotPasswordLink = _props.showForgotPasswordLink,
        showPassword = _props.showPassword,
        usernameInputPlaceholder = _props.usernameInputPlaceholder,
        usernameStyle = _props.usernameStyle;


    var headerText = instructions || null;
    var header = headerText && _react2.default.createElement(
      'p',
      null,
      headerText
    );

    // Should never validate format on login because of custom db connection and import mode
    var fieldPane = usernameStyle === 'email' ? _react2.default.createElement(_email_pane2.default, {
      i18n: i18n,
      lock: lock,
      forceInvalidVisibility: !showPassword,
      placeholder: emailInputPlaceholder
    }) : _react2.default.createElement(_username_pane2.default, {
      i18n: i18n,
      lock: lock,
      placeholder: usernameInputPlaceholder,
      usernameStyle: usernameStyle,
      validateFormat: false
    });

    var dontRememberPassword = showForgotPasswordLink && (0, _index.hasScreen)(lock, 'forgotPassword') ? _react2.default.createElement(
      'p',
      { className: 'auth0-lock-alternative' },
      _react2.default.createElement(
        'a',
        {
          className: 'auth0-lock-alternative-link',
          href: (0, _index.forgotPasswordLink)(lock, 'javascript:void(0)'),
          onClick: (0, _index.forgotPasswordLink)(lock) ? undefined : this.handleDontRememberPasswordClick.bind(this)
        },
        forgotPasswordAction
      )
    ) : null;

    return _react2.default.createElement(
      'div',
      null,
      header,
      fieldPane,
      _react2.default.createElement(_password_pane2.default, {
        i18n: i18n,
        lock: lock,
        placeholder: passwordInputPlaceholder,
        hidden: !showPassword
      }),
      dontRememberPassword
    );
  };

  return LoginPane;
}(_react2.default.Component);

exports.default = LoginPane;


LoginPane.propTypes = {
  emailInputPlaceholder: _propTypes2.default.string.isRequired,
  forgotPasswordAction: _propTypes2.default.string.isRequired,
  i18n: _propTypes2.default.object.isRequired,
  instructions: _propTypes2.default.any,
  lock: _propTypes2.default.object.isRequired,
  passwordInputPlaceholder: _propTypes2.default.string.isRequired,
  showForgotPasswordLink: _propTypes2.default.bool.isRequired,
  showPassword: _propTypes2.default.bool.isRequired,
  usernameInputPlaceholder: _propTypes2.default.string.isRequired,
  usernameStyle: _propTypes2.default.oneOf(['any', 'email', 'username'])
};
