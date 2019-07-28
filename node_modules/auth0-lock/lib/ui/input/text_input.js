'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('./input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  TextInput.prototype.hasFocus = function hasFocus() {
    return this.state.focused;
  };

  TextInput.prototype.render = function render() {
    var _props = this.props,
        lockId = _props.lockId,
        iconUrl = _props.iconUrl,
        invalidHint = _props.invalidHint,
        isValid = _props.isValid,
        name = _props.name,
        ariaLabel = _props.ariaLabel,
        onChange = _props.onChange,
        value = _props.value,
        props = _objectWithoutProperties(_props, ['lockId', 'iconUrl', 'invalidHint', 'isValid', 'name', 'ariaLabel', 'onChange', 'value']);

    var icon = this.props.icon;
    var focused = this.state.focused;


    if (!icon && typeof iconUrl === 'string' && iconUrl) {
      icon = _react2.default.createElement('img', { className: 'auth0-lock-custom-icon', alt: ariaLabel || name, src: iconUrl });
    }

    return _react2.default.createElement(
      _input_wrap2.default,
      {
        focused: focused,
        invalidHint: invalidHint,
        isValid: isValid,
        name: name,
        icon: icon
      },
      _react2.default.createElement('input', _extends({
        id: lockId + '-' + name,
        ref: 'input',
        type: 'text',
        name: name,
        className: 'auth0-lock-input',
        autoComplete: 'off',
        autoCapitalize: 'off',
        onChange: this.handleOnChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        value: value,
        'aria-label': ariaLabel || name,
        'aria-invalid': !isValid,
        'aria-describedby': !isValid && invalidHint ? 'auth0-lock-error-msg-' + name : undefined
      }, props))
    );
  };

  TextInput.prototype.handleOnChange = function handleOnChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  TextInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  TextInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return TextInput;
}(_react2.default.Component);

exports.default = TextInput;
