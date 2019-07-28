'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthButton = function AuthButton(props) {
  var disabled = props.disabled,
      label = props.label,
      onClick = props.onClick,
      strategy = props.strategy,
      icon = props.icon,
      primaryColor = props.primaryColor,
      foregroundColor = props.foregroundColor;


  var backgroundStyle = primaryColor ? { backgroundColor: primaryColor } : {};
  var foregroundStyle = foregroundColor ? { color: foregroundColor } : {};
  var iconStyle = icon ? { backgroundImage: 'url(\'' + icon + '\')' } : {};

  return _react2.default.createElement(
    'button',
    {
      className: 'auth0-lock-social-button auth0-lock-social-big-button',
      'data-provider': strategy,
      disabled: disabled,
      onClick: onClick,
      style: backgroundStyle,
      type: 'button'
    },
    _react2.default.createElement('div', { className: 'auth0-lock-social-button-icon', style: iconStyle }),
    _react2.default.createElement(
      'div',
      { className: 'auth0-lock-social-button-text', style: foregroundStyle },
      label
    )
  );
};

AuthButton.propTypes = {
  disabled: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  strategy: _propTypes2.default.string.isRequired,
  icon: _propTypes2.default.string,
  primaryColor: _propTypes2.default.string,
  foregroundColor: _propTypes2.default.string
};

AuthButton.defaultProps = {
  disabled: false
};

exports.default = AuthButton;
