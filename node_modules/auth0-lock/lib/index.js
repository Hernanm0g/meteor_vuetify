'use strict';

exports.__esModule = true;
exports.Auth0Lock = exports.Auth0LockPasswordless = undefined;

var _lock = require('./lock');

var _lock2 = _interopRequireDefault(_lock);

var _passwordless = require('./passwordless');

var _passwordless2 = _interopRequireDefault(_passwordless);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth0LockPasswordless = exports.Auth0LockPasswordless = _passwordless2.default;
var Auth0Lock = exports.Auth0Lock = _lock2.default;
exports.default = _lock2.default;
