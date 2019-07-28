'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _email_pane = require('../../field/email/email_pane');

var _email_pane2 = _interopRequireDefault(_email_pane);

var _password_pane = require('../../field/password/password_pane');

var _password_pane2 = _interopRequireDefault(_password_pane);

var _username_pane = require('../../field/username/username_pane');

var _username_pane2 = _interopRequireDefault(_username_pane);

var _custom_input = require('../../field/custom_input');

var _custom_input2 = _interopRequireDefault(_custom_input);

var _index = require('../../connection/database/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUpPane = function (_React$Component) {
  _inherits(SignUpPane, _React$Component);

  function SignUpPane() {
    _classCallCheck(this, SignUpPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SignUpPane.prototype.render = function render() {
    var _props = this.props,
        emailInputPlaceholder = _props.emailInputPlaceholder,
        instructions = _props.instructions,
        i18n = _props.i18n,
        model = _props.model,
        onlyEmail = _props.onlyEmail,
        passwordInputPlaceholder = _props.passwordInputPlaceholder,
        passwordStrengthMessages = _props.passwordStrengthMessages,
        usernameInputPlaceholder = _props.usernameInputPlaceholder;


    var headerText = instructions || null;
    var header = headerText && _react2.default.createElement(
      'p',
      null,
      headerText
    );

    var usernamePane = !onlyEmail && (0, _index.databaseConnectionRequiresUsername)(model) ? _react2.default.createElement(_username_pane2.default, {
      i18n: i18n,
      lock: model,
      placeholder: usernameInputPlaceholder,
      validateFormat: true
    }) : null;

    var fields = !onlyEmail && (0, _index.additionalSignUpFields)(model).map(function (x) {
      return _react2.default.createElement(_custom_input2.default, {
        iconUrl: x.get('icon'),
        key: x.get('name'),
        model: model,
        name: x.get('name'),
        ariaLabel: x.get('ariaLabel'),
        options: x.get('options'),
        placeholder: x.get('placeholder'),
        type: x.get('type'),
        validator: x.get('validator'),
        value: x.get('value')
      });
    });

    var passwordPane = !onlyEmail && _react2.default.createElement(_password_pane2.default, {
      i18n: i18n,
      lock: model,
      placeholder: passwordInputPlaceholder,
      policy: (0, _index.passwordStrengthPolicy)(model),
      strengthMessages: passwordStrengthMessages
    });

    return _react2.default.createElement(
      'div',
      null,
      header,
      _react2.default.createElement(_email_pane2.default, { i18n: i18n, lock: model, placeholder: emailInputPlaceholder }),
      usernamePane,
      passwordPane,
      fields
    );
  };

  return SignUpPane;
}(_react2.default.Component);

exports.default = SignUpPane;
