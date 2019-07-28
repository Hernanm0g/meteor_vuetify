'use strict';

exports.__esModule = true;
exports.initLocation = initLocation;
exports.validatePhoneNumber = validatePhoneNumber;
exports.setPhoneNumber = setPhoneNumber;
exports.phoneNumberWithDiallingCode = phoneNumberWithDiallingCode;
exports.humanPhoneNumberWithDiallingCode = humanPhoneNumberWithDiallingCode;
exports.humanLocation = humanLocation;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _index = require('./index');

var _locations = require('./phone-number/locations');

var _locations2 = _interopRequireDefault(_locations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationOptions = _immutable2.default.fromJS(_locations2.default.map(function (x) {
  return {
    country: x[0],
    diallingCode: x[2],
    isoCode: x[1],
    label: x[2] + ' ' + x[1] + ' ' + x[0],
    value: x[2] + ' ' + x[1]
  };
}));

function findLocation(isoCode) {
  return locationOptions.find(function (x) {
    return x.get('isoCode') === isoCode;
  });
}

function initLocation(m, isoCode) {
  var location = findLocation(isoCode) || findLocation('US');
  return (0, _index.registerOptionField)(m, 'location', locationOptions, location.get('value'));
}

function validatePhoneNumber(str) {
  var regExp = /^[0-9]([0-9 -])*[0-9]$/;
  return regExp.test(str);
}

function setPhoneNumber(m, str) {
  return (0, _index.setField)(m, 'phoneNumber', str, validatePhoneNumber);
}

function phoneNumberWithDiallingCode(m) {
  return humanPhoneNumberWithDiallingCode(m).replace(/[\s-]+/g, '');
}

function humanPhoneNumberWithDiallingCode(m) {
  var location = (0, _index.getField)(m, 'location');
  var code = location.get('diallingCode', '');
  var number = (0, _index.getFieldValue)(m, 'phoneNumber', '');
  return code ? code + ' ' + number : number;
}

function humanLocation(m) {
  var location = (0, _index.getField)(m, 'location');
  return location.get('diallingCode') + ' ' + location.get('country');
}
