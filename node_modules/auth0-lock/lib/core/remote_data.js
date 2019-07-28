'use strict';

exports.__esModule = true;
exports.syncRemoteData = syncRemoteData;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _settings = require('./client/settings');

var _settings2 = require('./tenant/settings');

var _data = require('./sso/data');

var _index = require('./index');

var l = _interopRequireWildcard(_index);

var _enterprise = require('../connection/enterprise');

var _sync = require('../sync');

var _sync2 = _interopRequireDefault(_sync);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function syncRemoteData(m) {
  if (l.useTenantInfo(m)) {
    m = (0, _sync2.default)(m, 'client', {
      syncFn: function syncFn(m, cb) {
        return (0, _settings2.fetchTenantSettings)(l.tenantBaseUrl(m), cb);
      },
      successFn: function successFn(m, result) {
        return (0, _settings2.syncTenantSettingsSuccess)(m, l.clientID(m), result);
      }
    });
  } else {
    m = (0, _sync2.default)(m, 'client', {
      syncFn: function syncFn(m, cb) {
        return (0, _settings.fetchClientSettings)(l.clientID(m), l.clientBaseUrl(m), cb);
      },
      successFn: _settings.syncClientSettingsSuccess
    });
  }

  m = (0, _sync2.default)(m, 'sso', {
    conditionFn: function conditionFn(m) {
      return l.auth.sso(m) && l.ui.rememberLastLogin(m);
    },
    waitFn: function waitFn(m) {
      return (0, _sync.isSuccess)(m, 'client');
    },
    syncFn: function syncFn(m, cb) {
      return (0, _data.fetchSSOData)(l.id(m), (0, _enterprise.isADEnabled)(m), cb);
    },
    successFn: function successFn(m, result) {
      return m.mergeIn(['sso'], _immutable2.default.fromJS(result));
    },
    errorFn: function errorFn(m, error) {
      if (error.error === 'consent_required') {
        l.warn(m, error.error_description);
      } else {
        // location.origin is not supported in all browsers
        var origin = location.protocol + '//' + location.hostname;
        if (location.port) {
          origin += ':' + location.port;
        }

        var appSettingsUrl = 'https://manage.auth0.com/#/applications/' + l.clientID(m) + '/settings';

        l.warn(m, 'There was an error fetching the SSO data. This is expected - and not a problem - if the tenant has Seamless SSO enabled. If the tenant doesn\'t have Seamless SSO enabled, this could simply mean that there was a problem with the network. But, if a "Origin" error has been logged before this warning, please add "' + origin + '" to the "Allowed Web Origins" list in the Auth0 dashboard: ' + appSettingsUrl);
      }
    }
  });

  return m;
} // shouldn't depend on this
