'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.initTenant = initTenant;
exports.tenantConnections = tenantConnections;
exports.defaultDirectory = defaultDirectory;
exports.defaultDirectoryName = defaultDirectoryName;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _auth0PasswordPolicies = require('auth0-password-policies');

var _auth0PasswordPolicies2 = _interopRequireDefault(_auth0PasswordPolicies);

var _data_utils = require('../../utils/data_utils');

var _index = require('../index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dataFns = (0, _data_utils.dataFns)(['client']),
    initNS = _dataFns.initNS,
    get = _dataFns.get;

var DEFAULT_CONNECTION_VALIDATION = { username: { min: 1, max: 15 } };

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

function initTenant(m, client_id, client) {
  return initNS(m, formatTenant(client_id, client));
}

function formatTenant(client_id, o) {
  return new _immutable2.default.fromJS({
    connections: formatTenantConnections(client_id, o),
    defaultDirectory: o.defaultDirectory || null
  });
}

function formatTenantConnections(client_id, o) {
  var result = emptyConnections.toJS();
  var connectionTypes = Object.keys(o.connections).filter(function (name) {
    return name != 'passwordless';
  }); // disabled until lock supports passwordless connections within the same engine
  var connections_filter = null;

  if (o.clientsConnections && o.clientsConnections[client_id]) {
    connections_filter = o.clientsConnections[client_id];
  }

  connectionTypes.forEach(function (connectionTypeName) {
    var _result$connectionTyp;

    var connections = o.connections[connectionTypeName].map(function (connection) {
      return formatTenantConnection(connectionTypeName, connection);
    }).filter(function (connection) {
      return connections_filter === null || connections_filter.includes(connection.name);
    });
    (_result$connectionTyp = result[connectionTypeName]).push.apply(_result$connectionTyp, connections);
  });

  return result;
}

function formatTenantConnection(connectionType, connection) {
  var result = {
    name: connection.name,
    strategy: connection.strategy,
    type: connectionType
  };

  if (connectionType === 'database') {
    if (connection.validation && connection.validation.passwordPolicy) {
      result.passwordPolicy = connection.validation.passwordPolicy;
    }

    result.passwordPolicy = _auth0PasswordPolicies2.default[result.passwordPolicy || 'none'];

    result.allowSignup = typeof connection.allowSignup === 'boolean' ? connection.allowSignup : true;

    result.allowForgot = typeof connection.allowForgot === 'boolean' ? connection.allowForgot : true;

    result.requireUsername = typeof connection.requiresUsername === 'boolean' ? connection.requiresUsername : false;

    result.validation = formatConnectionValidation(connection.validation);
  }

  if (connectionType === 'enterprise') {
    result.domains = connection.domains;
  }

  return result;
}

function tenantConnections(m) {
  return get(m, 'connections', emptyConnections);
}

function defaultDirectory(m) {
  var name = defaultDirectoryName(m);
  return name && l.findConnection(m, name);
}

function defaultDirectoryName(m) {
  return get(m, 'defaultDirectory', null);
}
