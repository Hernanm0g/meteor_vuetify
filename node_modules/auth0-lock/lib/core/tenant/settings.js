'use strict';

exports.__esModule = true;
exports.fetchTenantSettings = fetchTenantSettings;
exports.syncTenantSettingsSuccess = syncTenantSettingsSuccess;

var _cdn_utils = require('../../utils/cdn_utils');

var _index = require('../index');

var l = _interopRequireWildcard(_index);

var _index2 = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function fetchTenantSettings(tenantBaseUrl, cb) {
  (0, _cdn_utils.load)({
    method: 'setTenant',
    url: tenantBaseUrl + '?t' + +new Date(),
    check: function check() {
      return true;
    },
    cb: cb
  });
}

function syncTenantSettingsSuccess(m, client_id, result) {
  m = (0, _index2.initTenant)(m, client_id, result);
  m = l.filterConnections(m);
  m = l.runHook(m, 'didReceiveClientSettings');
  return m;
}
