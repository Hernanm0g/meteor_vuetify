'use strict';

exports.__esModule = true;
exports.setMFACode = setMFACode;
exports.getMFACodeValidation = getMFACodeValidation;

var _index = require('./index');

var _email = require('./email');

var _database = require('../connection/database');

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_VALIDATION = { mfa_code: { length: 6 } };
var regExp = /^[0-9]+$/;

function validateMFACode(str) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_VALIDATION.mfa_code;

  var value = (0, _trim2.default)(str);

  // check min value matched
  if (value.length < settings.length) {
    return false;
  }

  // check max value matched
  if (value.length > settings.length) {
    return false;
  }

  // check allowed characters matched
  var result = regExp.exec(value);
  return result && result[0];
}

function setMFACode(m, str) {
  return (0, _index.setField)(m, 'mfa_code', str, validateMFACode);
}

function getMFACodeValidation(m) {
  return DEFAULT_VALIDATION.mfa_code;
}
