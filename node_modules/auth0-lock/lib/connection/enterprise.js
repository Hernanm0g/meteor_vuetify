'use strict';

exports.__esModule = true;
exports.STRATEGIES = undefined;
exports.initEnterprise = initEnterprise;
exports.defaultEnterpriseConnection = defaultEnterpriseConnection;
exports.defaultEnterpriseConnectionName = defaultEnterpriseConnectionName;
exports.enterpriseActiveFlowConnection = enterpriseActiveFlowConnection;
exports.matchConnection = matchConnection;
exports.isEnterpriseDomain = isEnterpriseDomain;
exports.enterpriseDomain = enterpriseDomain;
exports.quickAuthConnection = quickAuthConnection;
exports.isADEnabled = isADEnabled;
exports.findADConnectionWithoutDomain = findADConnectionWithoutDomain;
exports.isInCorpNetwork = isInCorpNetwork;
exports.corpNetworkConnection = corpNetworkConnection;
exports.isSingleHRDConnection = isSingleHRDConnection;
exports.isHRDDomain = isHRDDomain;
exports.toggleHRD = toggleHRD;
exports.isHRDActive = isHRDActive;
exports.isHRDEmailValid = isHRDEmailValid;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _index = require('../core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../field/index');

var c = _interopRequireWildcard(_index2);

var _data_utils = require('../utils/data_utils');

var _email = require('../field/email');

var _username = require('../field/username');

var _classic = require('../engine/classic');

var _index3 = require('./database/index');

var _index4 = require('../store/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dataFns = (0, _data_utils.dataFns)(['enterprise']),
    get = _dataFns.get,
    initNS = _dataFns.initNS,
    tget = _dataFns.tget,
    tremove = _dataFns.tremove,
    tset = _dataFns.tset;

var _dataFns2 = (0, _data_utils.dataFns)(['core']),
    tremoveCore = _dataFns2.tremove,
    tsetCore = _dataFns2.tset,
    tgetCore = _dataFns2.tget;

// TODO: Android version also has "google-opendid" in the list, but we
// consider it to be a social connection. See
// https://github.com/auth0/Lock.Android/blob/98262cb7110e5d1c8a97e1129faf2621c1d8d111/lock/src/main/java/com/auth0/android/lock/utils/Strategies.java


var STRATEGIES = exports.STRATEGIES = {
  ad: 'AD / LDAP',
  adfs: 'ADFS',
  'auth0-adldap': 'AD/LDAP',
  'auth0-oidc': 'Auth0 OpenID Connect',
  custom: 'Custom Auth',
  'google-apps': 'Google Apps',
  ip: 'IP Address',
  mscrm: 'Dynamics CRM',
  office365: 'Office365',
  pingfederate: 'Ping Federate',
  samlp: 'SAML',
  sharepoint: 'SharePoint Apps',
  waad: 'Windows Azure AD',
  oidc: 'OpenID Connect'
};

function initEnterprise(m, opts) {
  return initNS(m, _immutable2.default.fromJS(processOptions(opts)));
}

function processOptions(opts) {
  var defaultEnterpriseConnection = opts.defaultEnterpriseConnection;


  if (defaultEnterpriseConnection != undefined && typeof defaultEnterpriseConnection !== 'string') {
    l.warn(opts, 'The `defaultEnterpriseConnection` option will be ignored, because it is not a string.');
    defaultEnterpriseConnection = undefined;
  }

  return defaultEnterpriseConnection === undefined ? {} : { defaultConnectionName: defaultEnterpriseConnection };
}

function defaultEnterpriseConnection(m) {
  var name = defaultEnterpriseConnectionName(m);
  return name && findADConnectionWithoutDomain(m, name);
}

function defaultEnterpriseConnectionName(m) {
  return get(m, 'defaultConnectionName');
}

function enterpriseActiveFlowConnection(m) {
  if (isHRDActive(m)) {
    // HRD is active when an email matched or there is only one
    // connection and it is enterprise
    var email = tget(m, 'hrdEmail', '');
    return matchConnection(m, email) || findActiveFlowConnection(m);
  } else {
    return defaultEnterpriseConnection(m) || findADConnectionWithoutDomain(m);
  }
}

function matchConnection(m, email) {
  var strategies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var target = (0, _email.emailDomain)(email);
  if (!target) return false;
  return l.connections.apply(l, [m, 'enterprise'].concat(strategies)).find(function (x) {
    return x.get('domains').contains(target);
  });
}

function isEnterpriseDomain(m, email) {
  var strategies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return !!matchConnection(m, email, strategies);
}

function enterpriseDomain(m) {
  return isSingleHRDConnection(m) ? l.connections(m, 'enterprise').getIn([0, 'domains', 0]) : (0, _email.emailDomain)(tget(m, 'hrdEmail'));
}

function quickAuthConnection(m) {
  return !isADEnabled(m) && l.hasOneConnection(m, 'enterprise') ? l.connections(m, 'enterprise').get(0) : null;
}

// ad / adldap
// https://github.com/auth0/Lock.Android/blob/0145b6853a8de0df5e63ef22e4e2bc40be97ad9e/lock/src/main/java/com/auth0/android/lock/utils/Strategy.java#L67

function isADEnabled(m) {
  return l.hasSomeConnections(m, 'enterprise', 'ad', 'auth0-adldap');
}

function findADConnectionWithoutDomain(m) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  return l.connections(m, 'enterprise', 'ad', 'auth0-adldap').find(function (x) {
    return x.get('domains').isEmpty() && (!name || x.get('name') === name);
  });
}

function findActiveFlowConnection(m) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  return l.connections(m, 'enterprise', 'ad', 'auth0-adldap').find(function (x) {
    return !name || x.get('name') === name;
  });
}

// kerberos

function isInCorpNetwork(m) {
  return corpNetworkConnection(m) !== undefined;
}

function corpNetworkConnection(m) {
  // Information about connection is stored in to flat properties connection and strategy.
  // If connection is present, strategy will always be present as defined by the server.
  var name = m.getIn(['sso', 'connection']);
  var strategy = m.getIn(['sso', 'strategy']);

  return name && strategy && _immutable2.default.Map({ name: name, strategy: strategy });
}

// hrd

function isSingleHRDConnection(m) {
  return isADEnabled(m) && l.connections(m).count() === 1;
}

function isHRDDomain(m, email) {
  return isEnterpriseDomain(m, email, ['ad', 'auth0-adldap']);
}

function toggleHRD(m, email) {
  if (email) {
    var username = l.defaultADUsernameFromEmailPrefix(m) ? (0, _email.emailLocalPart)(email) : email;

    m = (0, _username.setUsername)(m, username, 'username', false);
    m = tset(m, 'hrdEmail', email);
  } else {
    var hrdEmail = tget(m, 'hrdEmail');
    if (hrdEmail) {
      m = (0, _username.setUsername)(m, hrdEmail, 'email', false);
    }
    m = tremove(m, 'hrdEmail');
  }

  return tset(m, 'hrd', !!email);
}

function isHRDActive(m) {
  return tget(m, 'hrd', isSingleHRDConnection(m));
}

function isHRDEmailValid(m, str) {
  if ((0, _email.isEmail)(str) && !l.hasSomeConnections(m, 'database') && !l.hasSomeConnections(m, 'passwordless') && !findADConnectionWithoutDomain(m) && !(0, _classic.matchesEnterpriseConnection)(m, str)) {
    return false;
  }

  return true;
}
