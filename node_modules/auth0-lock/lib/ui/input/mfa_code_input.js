'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('./input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

var _password_input = require('./password_input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MFACodeInput = function (_React$Component) {
  _inherits(MFACodeInput, _React$Component);

  function MFACodeInput(props) {
    _classCallCheck(this, MFACodeInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  MFACodeInput.prototype.focus = function focus() {
    this.refs.input && this.refs.input.focus();
  };

  MFACodeInput.prototype.hasFocus = function hasFocus() {
    return this.state.focused;
  };

  MFACodeInput.prototype.render = function render() {
    var _props = this.props,
        lockId = _props.lockId,
        invalidHint = _props.invalidHint,
        isValid = _props.isValid,
        onChange = _props.onChange,
        value = _props.value,
        props = _objectWithoutProperties(_props, ['lockId', 'invalidHint', 'isValid', 'onChange', 'value']);

    var focused = this.state.focused;


    return _react2.default.createElement(
      _input_wrap2.default,
      {
        focused: focused,
        invalidHint: invalidHint,
        isValid: isValid,
        name: 'mfa_code',
        icon: _password_input.icon
      },
      _react2.default.createElement('input', _extends({
        id: lockId + '-mfa_code',
        ref: 'input',
        type: 'text',
        name: 'mfa_code',
        className: 'auth0-lock-input',
        autoComplete: 'off',
        autoCapitalize: 'off',
        onChange: this.handleOnChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        value: value,
        'aria-label': 'Multi factor authentication code',
        'aria-invalid': !isValid,
        'aria-describedby': !isValid && invalidHint ? 'auth0-lock-error-msg-mfa_code' : undefined
      }, props))
    );
  };

  MFACodeInput.prototype.handleOnChange = function handleOnChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  MFACodeInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  MFACodeInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return MFACodeInput;
}(_react2.default.Component);

MFACodeInput.propTypes = {
  invalidHint: _propTypes2.default.string.isRequired,
  isValid: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string.isRequired
};
exports.default = MFACodeInput;
