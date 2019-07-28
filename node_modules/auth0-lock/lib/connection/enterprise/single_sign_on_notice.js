'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _password_input = require('../../ui/input/password_input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'auth0-sso-notice-container' },
    _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: _password_input.icon } }),
    ' ',
    ' ',
    _react2.default.createElement(
      'span',
      { className: 'auth0-sso-notice' },
      children
    )
  );
};
