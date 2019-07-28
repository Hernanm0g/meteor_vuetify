'use strict';

exports.__esModule = true;
exports.fetchClientSettings = fetchClientSettings;
exports.syncClientSettingsSuccess = syncClientSettingsSuccess;

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _cdn_utils = require('../../utils/cdn_utils');

var _index = require('../index');

var l = _interopRequireWildcard(_index);

var _index2 = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchClientSettings(clientID, clientBaseUrl, cb) {
  (0, _cdn_utils.load)({
    method: 'setClient',
    url: (0, _urlJoin2.default)(clientBaseUrl, 'client', clientID + '.js?t' + +new Date()),
    check: function check(o) {
      return o && o.id === clientID;
    },
    cb: cb
  });
}

function syncClientSettingsSuccess(m, result) {
  m = (0, _index2.initClient)(m, result);
  m = l.filterConnections(m);
  m = l.runHook(m, 'didReceiveClientSettings');
  return m;
}
