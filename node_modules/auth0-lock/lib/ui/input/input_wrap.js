'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputWrap = function (_React$Component) {
  _inherits(InputWrap, _React$Component);

  function InputWrap() {
    _classCallCheck(this, InputWrap);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  InputWrap.prototype.render = function render() {
    var _props = this.props,
        after = _props.after,
        focused = _props.focused,
        invalidHint = _props.invalidHint,
        isValid = _props.isValid,
        name = _props.name,
        icon = _props.icon;

    var blockClassName = 'auth0-lock-input-block auth0-lock-input-' + name;
    if (!isValid) {
      blockClassName += ' auth0-lock-error';
    }

    var wrapClassName = 'auth0-lock-input-wrap';
    if (focused && isValid) {
      wrapClassName += ' auth0-lock-focused';
    }

    // NOTE: Ugly hack until we upgrade to React 15 which has better
    // support for SVG.
    var iconElement = null;

    if (typeof icon === 'string') {
      iconElement = _react2.default.createElement('span', { 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: icon } });
    } else if (icon) {
      iconElement = icon;
    }

    if (iconElement) {
      wrapClassName += ' auth0-lock-input-wrap-with-icon';
    }

    var errorTooltip = !isValid && invalidHint ? _react2.default.createElement(
      'div',
      { role: 'alert', id: 'auth0-lock-error-msg-' + name, className: 'auth0-lock-error-msg' },
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-error-invalid-hint' },
        invalidHint
      )
    ) : null;

    return _react2.default.createElement(
      'div',
      { className: blockClassName },
      _react2.default.createElement(
        'div',
        { className: wrapClassName },
        iconElement,
        this.props.children
      ),
      after,
      errorTooltip
    );
  };

  return InputWrap;
}(_react2.default.Component);

exports.default = InputWrap;


InputWrap.propTypes = {
  after: _propTypes2.default.element,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element.isRequired, _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired]),
  focused: _propTypes2.default.bool,
  invalidHint: _propTypes2.default.node,
  isValid: _propTypes2.default.bool.isRequired,
  name: _propTypes2.default.string.isRequired,
  svg: _propTypes2.default.string
};
