'use strict';

exports.__esModule = true;
exports.validatePassword = validatePassword;
exports.setPassword = setPassword;
exports.setShowPassword = setShowPassword;

var _policy = require('password-sheriff/lib/policy');

var _policy2 = _interopRequireDefault(_policy);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validatePassword(password, policy) {
  if (!password) {
    return false;
  }
  if (!policy) {
    return true;
  }
  return new _policy2.default(policy.toJS()).check(password);
}

function setPassword(m, password, policy) {
  return (0, _index.setField)(m, 'password', password, validatePassword, policy);
}

function setShowPassword(m, checked) {
  return (0, _index.setField)(m, 'showPassword', checked, function () {
    return true;
  });
}
