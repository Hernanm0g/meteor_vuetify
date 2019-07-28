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

var CheckboxInput = function (_React$Component) {
  _inherits(CheckboxInput, _React$Component);

  function CheckboxInput() {
    _classCallCheck(this, CheckboxInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CheckboxInput.prototype.render = function render() {
    var _props = this.props,
        lockId = _props.lockId,
        name = _props.name,
        ariaLabel = _props.ariaLabel,
        placeholder = _props.placeholder,
        checked = _props.checked;

    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-input-checkbox' },
      _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement('input', {
          id: lockId + '-' + name,
          type: 'checkbox',
          checked: checked === 'true',
          onChange: this.handleOnChange.bind(this),
          name: name,
          'aria-label': ariaLabel || name
        }),
        _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: placeholder } })
      )
    );
  };

  CheckboxInput.prototype.handleOnChange = function handleOnChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  return CheckboxInput;
}(_react2.default.Component);

exports.default = CheckboxInput;
