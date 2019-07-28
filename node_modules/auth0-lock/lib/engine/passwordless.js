'use strict';

exports.__esModule = true;

var _index = require('../store/index');

var _error_screen = require('../core/error_screen');

var _error_screen2 = _interopRequireDefault(_error_screen);

var _loading_screen = require('../core/loading_screen');

var _loading_screen2 = _interopRequireDefault(_loading_screen);

var _social_or_email_login_screen = require('./passwordless/social_or_email_login_screen');

var _social_or_email_login_screen2 = _interopRequireDefault(_social_or_email_login_screen);

var _social_or_phone_number_login_screen = require('./passwordless/social_or_phone_number_login_screen');

var _social_or_phone_number_login_screen2 = _interopRequireDefault(_social_or_phone_number_login_screen);

var _ask_vcode = require('../connection/passwordless/ask_vcode');

var _ask_vcode2 = _interopRequireDefault(_ask_vcode);

var _last_login_screen = require('../core/sso/last_login_screen');

var _last_login_screen2 = _interopRequireDefault(_last_login_screen);

var _index2 = require('../connection/passwordless/index');

var _sync = require('../sync');

var _index3 = require('../core/index');

var l = _interopRequireWildcard(_index3);

var _quick_auth = require('../quick_auth');

var _index4 = require('../core/sso/index');

var sso = _interopRequireWildcard(_index4);

var _email = require('../field/email');

var _phone_number = require('../field/phone_number');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var setPrefill = function setPrefill(m) {
  var _l$prefill$toJS = l.prefill(m).toJS(),
      email = _l$prefill$toJS.email,
      phoneNumber = _l$prefill$toJS.phoneNumber;

  if (typeof email === 'string') {
    m = (0, _email.setEmail)(m, email);
  }
  if (typeof phoneNumber === 'string') {
    m = (0, _phone_number.setPhoneNumber)(m, phoneNumber);
  }
  return m;
};

var Passwordless = function () {
  function Passwordless() {
    _classCallCheck(this, Passwordless);
  }

  Passwordless.prototype.didInitialize = function didInitialize(m, opts) {
    m = (0, _index2.initPasswordless)(m, opts);

    return m;
  };

  Passwordless.prototype.didReceiveClientSettings = function didReceiveClientSettings(m) {
    var anySocialConnection = l.hasSomeConnections(m, 'social');
    var anyPasswordlessConnection = l.hasSomeConnections(m, 'passwordless');

    if (!anySocialConnection && !anyPasswordlessConnection) {
      var error = new Error('At least one email, sms or social connection needs to be available.');
      error.code = 'no_connection';
      m = l.stop(m, error);
    }
    m = setPrefill(m);

    return m;
  };

  Passwordless.prototype.render = function render(m) {
    //if there's an error, we should show the error screen no matter what.
    if (l.hasStopped(m)) {
      return new _error_screen2.default();
    }

    // TODO: remove the detail about the loading pane being pinned,
    // sticky screens should be handled at the box module.
    if (!(0, _sync.isDone)(m) || m.get('isLoadingPanePinned')) {
      return new _loading_screen2.default();
    }

    if (!(0, _quick_auth.hasSkippedQuickAuth)(m)) {
      if (l.ui.rememberLastLogin(m)) {
        var lastUsedConnection = sso.lastUsedConnection(m);
        var lastUsedUsername = sso.lastUsedUsername(m);
        if (lastUsedConnection && (0, _sync.isSuccess)(m, 'sso') && l.hasConnection(m, lastUsedConnection.get('name')) && ['passwordless', 'social'].indexOf(l.findConnection(m, lastUsedConnection.get('name')).get('type')) >= 0 //if connection.type is either passwordless or social
        ) {
            var conn = l.findConnection(m, lastUsedConnection.get('name'));
            var connectionType = conn.get('type');
            if (connectionType === 'passwordless' || connectionType === 'social') {
              return new _last_login_screen2.default();
            }
          }
      }
    }

    if ((0, _index2.isEmail)(m)) {
      return (0, _index2.isSendLink)(m) || !(0, _index2.passwordlessStarted)(m) ? new _social_or_email_login_screen2.default() : new _ask_vcode2.default();
    } else {
      return (0, _index2.passwordlessStarted)(m) ? new _ask_vcode2.default() : new _social_or_phone_number_login_screen2.default();
    }
  };

  return Passwordless;
}();

exports.default = new Passwordless();
