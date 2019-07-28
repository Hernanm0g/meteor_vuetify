'use strict';

exports.__esModule = true;
exports.emitFederatedLoginEvent = emitFederatedLoginEvent;

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function emitFederatedLoginEvent(lock, provider, isSignUp) {
  var prov = void 0;

  try {
    prov = provider.toJS();
  } catch (e) {
    prov = provider;
  }

  l.emitEvent(lock, 'federated login', {
    name: prov.name,
    strategy: prov.strategy,
    action: isSignUp ? 'signup' : 'signin'
  });
}
