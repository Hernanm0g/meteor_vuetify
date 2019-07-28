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

var svg = '<svg aria-hidden="true" focusable="false" width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" class="auth0-lock-icon auth0-lock-icon-mobile"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Lock" transform="translate(-204.000000, -3459.000000)" fill="#888888"><g id="SMS" transform="translate(153.000000, 3207.000000)"><g transform="translate(35.000000, 239.000000)"><path d="M24.1,15.625 L16.9,15.625 L16.9,14.75 C16.9,14.264375 17.30275,13.875 17.8,13.875 L23.2,13.875 C23.6968,13.875 24.1,14.264375 24.1,14.75 L24.1,15.625 L24.1,15.625 Z M16.9,16.5 L24.1,16.5 L24.1,21.75 L16.9,21.75 L16.9,16.5 Z M24.1,25.25 C24.1,25.73125 23.6968,26.125 23.2,26.125 L17.8,26.125 C17.30275,26.125 16.9,25.73125 16.9,25.25 L16.9,22.625 L24.1,22.625 L24.1,25.25 L24.1,25.25 Z M23.2,13 L17.8,13 C16.80595,13 16,13.783125 16,14.75 L16,25.25 C16,26.216875 16.80595,27 17.8,27 L23.2,27 C24.19405,27 25,26.216875 25,25.25 L25,14.75 C25,13.783125 24.19405,13 23.2,13 L23.2,13 Z M20.5,25.25 C20.9968,25.25 21.4,24.85625 21.4,24.375 C21.4,23.889375 20.9968,23.5 20.5,23.5 C20.00275,23.5 19.6,23.889375 19.6,24.375 C19.6,24.85625 20.00275,25.25 20.5,25.25 L20.5,25.25 Z"></path></g></g></g></g></svg>';

var PhoneNumberInput = function (_React$Component) {
  _inherits(PhoneNumberInput, _React$Component);

  function PhoneNumberInput(props) {
    _classCallCheck(this, PhoneNumberInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  PhoneNumberInput.prototype.render = function render() {
    var _props = this.props,
        isValid = _props.isValid,
        props = _objectWithoutProperties(_props, ['isValid']);

    var focused = this.state.focused;


    return _react2.default.createElement(
      _input_wrap2.default,
      { focused: focused, isValid: isValid, name: 'phone-number', icon: svg },
      _react2.default.createElement('input', _extends({
        ref: 'input',
        type: 'tel',
        name: 'phoneNumber',
        className: 'auth0-lock-input auth0-lock-input-number',
        autoComplete: 'off',
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        'aria-label': 'Telephone number',
        'aria-invalid': !isValid
      }, props))
    );
  };

  PhoneNumberInput.prototype.focus = function focus() {
    if (!this.refs.input) return;

    this.refs.input.focus();
    this.handleFocus();
  };

  PhoneNumberInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  PhoneNumberInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return PhoneNumberInput;
}(_react2.default.Component);

// TODO: specify propTypes


exports.default = PhoneNumberInput;
