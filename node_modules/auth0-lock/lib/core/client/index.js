'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// TODO: this module should depend from social stuff


exports.hasFreeSubscription = hasFreeSubscription;
exports.connection = connection;
exports.initClient = initClient;
exports.clientConnections = clientConnections;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _auth0PasswordPolicies = require('auth0-password-policies');

var _auth0PasswordPolicies2 = _interopRequireDefault(_auth0PasswordPolicies);

var _data_utils = require('../../utils/data_utils');

var _index = require('../../connection/social/index');

var _enterprise = require('../../connection/enterprise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dataFns = (0, _data_utils.dataFns)(['client']),
    initNS = _dataFns.initNS,
    get = _dataFns.get;

var DEFAULT_CONNECTION_VALIDATION = { username: { min: 1, max: 15 } };

function hasFreeSubscription(m) {
  return ['free', 'dev'].indexOf(get(m, ['tenant', 'subscription'])) > -1;
}

function connection(m, strategyName, name) {
  // TODO: this function should take a client, not a map with a client
  // key.
  var connections = strategy(m, strategyName).get('connections', (0, _immutable.List)());
  return connections.find(withName(name)) || (0, _immutable.Map)();
}

function strategy(m, name) {
  // TODO: this function should take a client, not a map with a client
  // key.
  return m.getIn(['client', 'strategies'], (0, _immutable.List)()).find(withName(name)) || (0, _immutable.Map)();
}

function withName(name) {
  return function (x) {
    return x.get('name') === name;
  };
}

function strategyNameToConnectionType(str) {
  if (str === 'auth0') {
    return 'database';
  } else if (str === 'email' || str === 'sms') {
    return 'passwordless';
  } else if (_index.STRATEGIES[str]) {
    return 'social';
  } else if (_enterprise.STRATEGIES[str]) {
    return 'enterprise';
  } else if (['oauth1', 'oauth2'].indexOf(str) !== -1) {
    return 'social';
  } else {
    return 'unknown';
  }
}

function formatConnectionValidation() {
  var connectionValidation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (connectionValidation.username == null) {
    return null;
  }

  var validation = _extends({}, DEFAULT_CONNECTION_VALIDATION, connectionValidation);
  var defaultMin = DEFAULT_CONNECTION_VALIDATION.username.min;
  var defaultMax = DEFAULT_CONNECTION_VALIDATION.username.max;

  validation.username.min = parseInt(validation.username.min, 10) || defaultMin;
  validation.username.max = parseInt(validation.username.max, 10) || defaultMax;

  if (validation.username.min > validation.username.max) {
    validation.username.min = defaultMin;
    validation.username.max = defaultMax;
  }

  return validation;
}

var emptyConnections = _immutable2.default.fromJS({
  database: [],
  enterprise: [],
  passwordless: [],
  social: [],
  unknown: [] // TODO: should be oauth2
});

function initClient(m, client) {
  return initNS(m, formatClient(client));
}

function formatClient(o) {
  return new _immutable2.default.fromJS({
    id: o.id,
    tenant: {
      name: o.tenant,
      subscription: o.subscription
    },
    connections: formatClientConnections(o)
  });
}

function formatClientConnections(o) {
  var result = emptyConnections.toJS();

  var _loop = function _loop() {
    var _result$connectionTyp;

    var strategy = o.strategies[i];
    var connectionType = strategyNameToConnectionType(strategy.name);

    var connections = strategy.connections.map(function (connection) {
      return formatClientConnection(connectionType, strategy.name, connection);
    });
    (_result$connectionTyp = result[connectionType]).push.apply(_result$connectionTyp, connections);
  };

  for (var i = 0; i < (o.strategies || []).length; i++) {
    _loop();
  }

  return result;
}

function formatClientConnection(connectionType, strategyName, connection) {
  var result = {
    name: connection.name,
    strategy: strategyName,
    type: connectionType
  };

  if (connectionType === 'database') {
    result.passwordPolicy = _auth0PasswordPolicies2.default[connection.passwordPolicy || 'none'];
    if (connection.password_complexity_options && connection.password_complexity_options.min_length) {
      result.passwordPolicy.length.minLength = connection.password_complexity_options.min_length;
    }
    result.allowSignup = typeof connection.showSignup === 'boolean' ? connection.showSignup : true;
    result.allowForgot = typeof connection.showForgot === 'boolean' ? connection.showForgot : true;
    result.requireUsername = typeof connection.requires_username === 'boolean' ? connection.requires_username : false;
    result.validation = formatConnectionValidation(connection.validation);
  }

  if (connectionType === 'enterprise') {
    var domains = connection.domain_aliases || [];
    if (connection.domain) {
      domains.unshift(connection.domain);
    }
    result.domains = domains;
  }

  return result;
}

function clientConnections(m) {
  return get(m, 'connections', emptyConnections);
}
