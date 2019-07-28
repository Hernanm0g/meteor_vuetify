'use strict';

exports.__esModule = true;
exports.displayName = displayName;
exports.url = url;

var _blueimpMd = require('blueimp-md5');

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

var _jsonp_utils = require('../utils/jsonp_utils');

var _jsonp_utils2 = _interopRequireDefault(_jsonp_utils);

var _email = require('../field/email');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5 = _blueimpMd2.default.md5 || _blueimpMd2.default;

function normalize(str) {
  return typeof str === 'string' ? (0, _trim2.default)(str.toLowerCase()) : '';
}

function displayName(email, cb) {
  email = normalize(email);
  if (!(0, _email.validateEmail)(email)) return cb({});

  var url = 'https://secure.gravatar.com/' + md5(email) + '.json';
  _jsonp_utils2.default.get(url, function (error, result) {
    if (!error && result && result.entry && result.entry[0]) {
      cb(null, result.entry[0].displayName);
    } else {
      cb({});
    }
  });
}

function url(email, cb) {
  email = normalize(email);
  if (!(0, _email.validateEmail)(email)) return cb({});

  cb(null, 'https://secure.gravatar.com/avatar/' + md5(email) + '?d=404&s=160');
}
