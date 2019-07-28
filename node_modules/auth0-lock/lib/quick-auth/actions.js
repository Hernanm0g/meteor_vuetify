'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.skipQuickAuth = skipQuickAuth;
exports.logIn = logIn;
exports.checkSession = checkSession;

var _quick_auth = require('../quick_auth');

var _index = require('../store/index');

var _actions = require('../core/actions');

var _index2 = require('../core/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function skipQuickAuth(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _quick_auth.skipQuickAuth, true);
}

function logIn(id, connection, loginHint, prompt) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var connectionScopes = l.auth.connectionScopes(m);
  var scopes = connectionScopes.get(connection.get('name'));
  var params = {
    connection: connection.get('name'),
    connection_scope: scopes ? scopes.toJS() : undefined
  };
  if (!l.auth.redirect(m) && connection.get('strategy') === 'facebook') {
    params.display = 'popup';
  }
  if (loginHint) {
    params.login_hint = loginHint;
  }
  if (prompt) {
    params.prompt = prompt;
  }
  (0, _actions.logIn)(id, [], params);
}

function checkSession(id, connection, loginHint) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  if (l.auth.responseType(m).indexOf('code') >= 0) {
    // we need to force a redirect in this case
    // so we use login with prompt=none
    return logIn(id, connection, loginHint, 'none');
  } else {
    var connectionScopes = l.auth.connectionScopes(m);
    var scopes = connectionScopes.get(connection.get('name'));
    var params = _extends({}, l.auth.params(m).toJS(), {
      connection: connection.get('name')
    });

    (0, _actions.checkSession)(id, params);
  }
}
