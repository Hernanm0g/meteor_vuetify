'use strict';

exports.__esModule = true;
exports.icon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('./input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

var _password_strength = require('./password/password_strength');

var _password_strength2 = _interopRequireDefault(_password_strength);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var icon = exports.icon = '<svg aria-hidden="true" focusable="false" width="11px" height="14px" viewBox="0 0 13 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="auth0-lock-icon auth0-lock-icon-box"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-288.000000, -1508.000000)" fill="#888888"><path d="M299,1523.998 L290,1523.998 C288.896,1523.998 288,1523.102 288,1521.999 L288,1515.999 C288,1514.895 288.896,1513.998 290,1513.998 L290,1513.998 L290,1512.499 C290,1510.015 292.015,1507.999 294.5,1507.999 C296.985,1507.999 299,1510.015 299,1512.499 L299,1513.999 C300.104,1513.999 301,1514.895 301,1515.999 L301,1521.999 C301,1523.103 300.104,1523.998 299,1523.998 L299,1523.998 Z M298,1512.499 C298,1510.566 296.433,1508.999 294.5,1508.999 C292.567,1508.999 291,1510.566 291,1512.499 L291,1513.998 L298,1513.998 L298,1512.499 L298,1512.499 Z M300,1515.999 C300,1515.446 299.552,1514.998 299,1514.998 L290,1514.998 C289.447,1514.998 289,1515.446 289,1515.999 L289,1521.999 C289,1522.551 289.447,1522.998 290,1522.998 L299,1522.998 C299.552,1522.998 300,1522.551 300,1521.999 L300,1515.999 L300,1515.999 Z M294.5,1520.998 C294.224,1520.998 294,1520.774 294,1520.498 L294,1517.498 C294,1517.223 294.224,1516.999 294.5,1516.999 C294.776,1516.999 295,1517.223 295,1517.498 L295,1520.498 C295,1520.774 294.776,1520.998 294.5,1520.998 L294.5,1520.998 Z"></path></g></g></svg>';

var PasswordInput = function (_React$Component) {
  _inherits(PasswordInput, _React$Component);

  function PasswordInput(props) {
    _classCallCheck(this, PasswordInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  PasswordInput.prototype.focus = function focus() {
    this.refs.input && this.refs.input.focus();
  };

  PasswordInput.prototype.hasFocus = function hasFocus() {
    return this.state.focused;
  };

  PasswordInput.prototype.render = function render() {
    var _props = this.props,
        invalidHint = _props.invalidHint,
        showPasswordStrengthMessage = _props.showPasswordStrengthMessage,
        isValid = _props.isValid,
        onChange = _props.onChange,
        policy = _props.policy,
        strengthMessages = _props.strengthMessages,
        value = _props.value,
        showPassword = _props.showPassword,
        lock = _props.lock,
        props = _objectWithoutProperties(_props, ['invalidHint', 'showPasswordStrengthMessage', 'isValid', 'onChange', 'policy', 'strengthMessages', 'value', 'showPassword', 'lock']);

    var _state = this.state,
        focused = _state.focused,
        changing = _state.changing;


    var allowPasswordAutocomplete = l.ui.allowPasswordAutocomplete(lock);

    var passwordStrength = policy && focused && changing && showPasswordStrengthMessage ? _react2.default.createElement(_password_strength2.default, { messages: strengthMessages, password: value, policy: policy }) : null;

    return _react2.default.createElement(
      _input_wrap2.default,
      {
        after: passwordStrength,
        focused: focused,
        invalidHint: policy ? undefined : invalidHint,
        isValid: isValid,
        name: 'password',
        icon: icon
      },
      _react2.default.createElement('input', _extends({
        ref: 'input',
        type: showPassword ? 'text' : 'password',
        name: 'password',
        className: 'auth0-lock-input',
        autoComplete: allowPasswordAutocomplete ? 'on' : 'off',
        autoCapitalize: 'off',
        onChange: this.handleOnChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        value: value,
        'aria-label': 'Password',
        'aria-invalid': !isValid,
        'aria-describedby': !isValid && !policy && invalidHint ? 'auth0-lock-error-msg-password' : undefined
      }, props))
    );
  };

  PasswordInput.prototype.handleOnChange = function handleOnChange(e) {
    var state = this.state;
    state.changing = true;
    this.setState(state);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  PasswordInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  PasswordInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return PasswordInput;
}(_react2.default.Component);

PasswordInput.propTypes = {
  invalidHint: _propTypes2.default.string.isRequired,
  showPasswordStrengthMessage: _propTypes2.default.bool.isRequired,
  isValid: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  policy: _propTypes2.default.object,
  strengthMessages: _propTypes2.default.object,
  value: _propTypes2.default.string.isRequired,
  showPassword: _propTypes2.default.bool.isRequired,
  lock: _propTypes2.default.object.isRequired
};
exports.default = PasswordInput;
