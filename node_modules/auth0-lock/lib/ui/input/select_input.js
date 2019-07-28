'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('./input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrowSvg = '<svg aria-hidden="true" focusable="false" width="5px" height="10px" viewBox="0 0 5 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" class="auth0-lock-icon-arrow"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Lock" transform="translate(-396.000000, -3521.000000)" fill="#000000" opacity="0.539999962"><g id="SMS" transform="translate(153.000000, 3207.000000)"><g transform="translate(35.000000, 299.000000)"><g transform="translate(210.000000, 20.000000) rotate(-90.000000) translate(-210.000000, -20.000000) translate(198.000000, 8.000000)"><path id="Shape" d="M7,10 L12,15 L17,10 L7,10 Z"></path></g></g></g></g></g></svg>';

var SelectInput = function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  function SelectInput(props) {
    _classCallCheck(this, SelectInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  SelectInput.prototype.render = function render() {
    var _props = this.props,
        lockId = _props.lockId,
        iconUrl = _props.iconUrl,
        isValid = _props.isValid,
        label = _props.label,
        ariaLabel = _props.ariaLabel,
        name = _props.name,
        onClick = _props.onClick,
        placeholder = _props.placeholder;
    var icon = this.props.icon;
    var focused = this.state.focused;


    var limitedValue = label || placeholder;
    if (limitedValue.length > 23) {
      limitedValue = limitedValue.substr(0, 20) + '...';
    }

    if (!icon && typeof iconUrl === 'string' && iconUrl) {
      icon = _react2.default.createElement('img', { className: 'auth0-lock-custom-icon', alt: ariaLabel || name, src: iconUrl });
    }

    var className = 'auth0-lock-input auth0-lock-input-location';
    if (!label) className += ' auth0-lock-input-with-placeholder';

    return _react2.default.createElement(
      _input_wrap2.default,
      { focused: focused, isValid: isValid, name: 'location', icon: icon },
      _react2.default.createElement('input', {
        id: lockId + '-' + name,
        type: 'button',
        name: name,
        className: className,
        value: limitedValue,
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        onKeyDown: this.handleKeyDown.bind(this),
        onClick: onClick,
        'aria-label': ariaLabel || name,
        'aria-invalid': !isValid
      }),
      _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: arrowSvg } })
    );
  };

  SelectInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  SelectInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  SelectInput.prototype.handleKeyDown = function handleKeyDown(e) {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }

    if (e.key === 'ArrowDown') {
      return this.props.onClick();
    }

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      return this.props.onClick(String.fromCharCode(e.keyCode).toLowerCase());
    }
  };

  return SelectInput;
}(_react2.default.Component);

// TODO: specify propTypes


exports.default = SelectInput;
