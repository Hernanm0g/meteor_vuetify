'use strict';

exports.__esModule = true;
exports.lastUsedConnection = lastUsedConnection;
exports.lastUsedUsername = lastUsedUsername;

var _immutable = require('immutable');

function lastUsedConnection(m) {
  return m.getIn(['sso', 'lastUsedConnection']);
}

function lastUsedUsername(m) {
  return m.getIn(['sso', 'lastUsedUsername'], '');
}
