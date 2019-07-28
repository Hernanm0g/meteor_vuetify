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

var svg = '<svg aria-hidden="true" focusable="false" width="14px" height="13px" viewBox="0 0 32 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" class="auth0-lock-icon auth0-lock-icon-box"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="32px" sketch:type="MSLayerGroup" transform="translate(-2155.000000, -2317.000000)" fill="#373A39"><g id="Group-856" transform="translate(1.000000, 1.000000)" sketch:type="MSShapeGroup"><path id="Fill-419" d="M2184,2339 C2184,2339.55 2183.55,2340 2183,2340 L2157,2340 C2156.45,2340 2156,2339.55 2156,2339 L2156,2319 C2156,2318.45 2156.45,2318 2157,2318 L2183,2318 C2183.55,2318 2184,2318.45 2184,2319 L2184,2339 L2184,2339 Z M2184,2316 L2156,2316 C2154.89,2316 2154,2316.89 2154,2318 L2154,2340 C2154,2341.1 2154.89,2342 2156,2342 L2184,2342 C2185.1,2342 2186,2341.1 2186,2340 L2186,2318 C2186,2316.89 2185.1,2316 2184,2316 L2184,2316 Z M2176,2322 L2180,2322 L2180,2326 L2176,2326 L2176,2322 Z M2174,2328 L2182,2328 L2182,2320 L2174,2320 L2174,2328 Z M2158,2332 L2172,2332 L2172,2330 L2158,2330 L2158,2332 Z M2158,2336 L2172,2336 L2172,2334 L2158,2334 L2158,2336 Z"></path></g></g></g></svg>';

var EmailInput = function (_React$Component) {
  _inherits(EmailInput, _React$Component);

  function EmailInput(props) {
    _classCallCheck(this, EmailInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  EmailInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var _props = this.props,
        invalidHint = _props.invalidHint,
        isValid = _props.isValid,
        value = _props.value,
        onChange = _props.onChange;
    var focused = this.state.focused;


    return invalidHint != nextProps.invalidHint || isValid != nextProps.isValid || value != nextProps.value || focused != nextState.focused;
  };

  EmailInput.prototype.render = function render() {
    var _props2 = this.props,
        lockId = _props2.lockId,
        invalidHint = _props2.invalidHint,
        isValid = _props2.isValid,
        autoComplete = _props2.autoComplete,
        props = _objectWithoutProperties(_props2, ['lockId', 'invalidHint', 'isValid', 'autoComplete']);

    var focused = this.state.focused;


    return _react2.default.createElement(
      _input_wrap2.default,
      {
        focused: focused,
        invalidHint: invalidHint,
        isValid: isValid,
        name: 'email',
        icon: svg
      },
      _react2.default.createElement('input', _extends({
        id: lockId + '-email',
        ref: 'input',
        type: 'email',
        name: 'email',
        className: 'auth0-lock-input',
        placeholder: 'yours@example.com',
        autoComplete: autoComplete ? 'on' : 'off',
        autoCapitalize: 'off',
        onChange: this.handleOnChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        'aria-label': 'Email',
        'aria-invalid': !isValid,
        'aria-describedby': !isValid && invalidHint ? 'auth0-lock-error-msg-email' : undefined
      }, props))
    );
  };

  EmailInput.prototype.handleOnChange = function handleOnChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  EmailInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  EmailInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return EmailInput;
}(_react2.default.Component);

// TODO: specify propTypes


exports.default = EmailInput;
