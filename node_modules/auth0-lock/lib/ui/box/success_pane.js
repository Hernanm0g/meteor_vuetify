'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _confirmation_pane = require('./confirmation_pane');

var _confirmation_pane2 = _interopRequireDefault(_confirmation_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var svg = '<svg focusable="false" width="56px" height="56px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="checkmark"> <circle cx="26" cy="26" r="25" fill="none" class="checkmark__circle"></circle> <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" class="checkmark__check"></path> </svg>';

var SuccessPane = function SuccessPane(props) {
  return _react2.default.createElement(_confirmation_pane2.default, _extends({ svg: svg }, props));
};

exports.default = SuccessPane;
