'use strict';

exports.__esModule = true;
exports.load = load;
exports.preload = preload;

var _auth0Js = require('auth0-js');

var _auth0Js2 = _interopRequireDefault(_auth0Js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.Auth0) {
  global.Auth0 = {};
}

var cbs = {};

function load(attrs) {
  var cb = attrs.cb,
      check = attrs.check,
      method = attrs.method,
      url = attrs.url;


  if (!cbs[method]) {
    cbs[method] = [];
    global.Auth0[method] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      cbs[method] = cbs[method].filter(function (x) {
        if (x.check.apply(x, args)) {
          setTimeout(function () {
            return x.cb.apply(x, [null].concat(args));
          }, 0);
          return false;
        } else {
          return true;
        }
      });
    };
  }

  cbs[method].push({ cb: cb, check: check, url: url });

  var count = cbs[method].reduce(function (r, x) {
    return r + (x.url === url ? 1 : 0);
  }, 0);

  if (count > 1) return;

  var script = global.document.createElement('script');
  script.src = url;
  global.document.getElementsByTagName('head')[0].appendChild(script);

  var handleError = function handleError(err) {
    cbs[method] = cbs[method].filter(function (x) {
      if (x.url === url) {
        setTimeout(function () {
          return x.cb(err);
        }, 0);
        return false;
      } else {
        return true;
      }
    });
  };

  var timeoutID = setTimeout(function () {
    return handleError(new Error(url + ' timed out'));
  }, 20000);

  script.addEventListener('load', function () {
    return clearTimeout(timeoutID);
  });

  script.addEventListener('error', function () {
    clearTimeout(timeoutID);
    handleError(new Error(url + ' could not be loaded.'));
  });
}

function preload(_ref) {
  var method = _ref.method,
      cb = _ref.cb;

  global.Auth0[method] = cb;
}
