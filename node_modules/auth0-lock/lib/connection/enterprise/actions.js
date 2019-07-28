'use strict';

exports.__esModule = true;
exports.startHRD = startHRD;
exports.cancelHRD = cancelHRD;
exports.logIn = logIn;

var _index = require('../../store/index');

var _enterprise = require('../enterprise');

var _index2 = require('../../field/index');

var _email = require('../../field/email');

var _actions = require('../../core/actions');

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _index4 = require('../database/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function startHRD(id, email) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _enterprise.toggleHRD, email);
}

// TODO: enterprise connections should not depend on database
// connections. However, we now allow a username input to contain also
// an email and this information is in the database module. We should
// make this information flow from the UI (like we do for the startHRD
// function). Including this dependency here allows us to do that
// incrementally.
function cancelHRD(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    m = (0, _enterprise.toggleHRD)(m, false);
    m = (0, _index2.hideInvalidFields)(m);
    return m;
  });
}

function logIn(id) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var email = (0, _index2.getFieldValue)(m, (0, _index4.databaseLogInWithEmail)(m) ? 'email' : 'username');
  var ssoConnection = (0, _enterprise.matchConnection)(m, email);

  if (ssoConnection && !(0, _enterprise.isHRDActive)(m)) {
    return logInSSO(id, ssoConnection);
  }

  logInActiveFlow(id);
}

function logInActiveFlow(id) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var usernameField = (0, _enterprise.isHRDActive)(m) || !(0, _index4.databaseLogInWithEmail)(m) ? 'username' : 'email';

  var originalUsername = (0, _index2.getFieldValue)(m, usernameField);
  var connection = (0, _enterprise.enterpriseActiveFlowConnection)(m);

  var username = l.defaultADUsernameFromEmailPrefix(m) ? (0, _email.emailLocalPart)(originalUsername) : originalUsername;

  (0, _actions.logIn)(id, ['password', usernameField], {
    connection: connection ? connection.get('name') : null,
    username: username,
    password: (0, _index2.getFieldValue)(m, 'password'),
    login_hint: username
  });
}

function logInSSO(id, connection) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var field = (0, _index4.databaseLogInWithEmail)(m) ? 'email' : 'username';
  (0, _actions.logIn)(id, [field], {
    connection: connection.get('name'),
    login_hint: (0, _index2.getFieldValue)(m, field)
  });
}
