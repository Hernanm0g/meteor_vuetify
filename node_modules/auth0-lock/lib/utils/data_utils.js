'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.dataFns = dataFns;

var _immutable = require('immutable');

function dataFns(baseNSKeyPath) {
  function keyPath(nsKeyPath, keyOrKeyPath) {
    return nsKeyPath.concat((typeof keyOrKeyPath === 'undefined' ? 'undefined' : _typeof(keyOrKeyPath)) === 'object' ? keyOrKeyPath : [keyOrKeyPath]);
  }

  function getFn(nsKeyPath) {
    return function (m, keyOrKeyPath) {
      var notSetValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      return m.getIn(keyPath(nsKeyPath, keyOrKeyPath), notSetValue);
    };
  }

  function setFn(nsKeyPath) {
    return function (m, keyOrKeyPath, value) {
      return m.setIn(keyPath(nsKeyPath, keyOrKeyPath), value);
    };
  }

  function removeFn(nsKeyPath) {
    return function (m, keyOrKeyPath) {
      return m.removeIn(keyPath(nsKeyPath, keyOrKeyPath));
    };
  }

  var transientNSKeyPath = baseNSKeyPath.concat(['transient']);

  return {
    get: getFn(baseNSKeyPath),
    set: setFn(baseNSKeyPath),
    remove: removeFn(baseNSKeyPath),
    tget: getFn(transientNSKeyPath),
    tset: setFn(transientNSKeyPath),
    tremove: removeFn(transientNSKeyPath),
    reset: function reset(m) {
      return m.map(function (x) {
        return _immutable.Map.isMap(x) ? x.remove('transient') : x;
      });
    },
    init: function init(id, m) {
      return new _immutable.Map({ id: id }).setIn(baseNSKeyPath, m);
    },
    initNS: function initNS(m, ns) {
      return m.setIn(baseNSKeyPath, ns);
    }
  };
}
