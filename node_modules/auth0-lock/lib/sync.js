'use strict';

exports.__esModule = true;
exports.go = undefined;
exports.isSuccess = isSuccess;
exports.isDone = isDone;
exports.hasError = hasError;

var _immutable = require('immutable');

var _data_utils = require('./utils/data_utils');

var _index = require('./core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('./store/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _dataFns = (0, _data_utils.dataFns)(['sync']),
    get = _dataFns.get,
    set = _dataFns.set;

exports.default = function (m, key, opts) {
  if (get(m, key) !== undefined) return m;

  var status = opts.waitFn ? 'waiting' : !opts.conditionFn || opts.conditionFn(m) ? 'pending' : 'no';

  return set(m, key, (0, _immutable.Map)({
    conditionFn: opts.conditionFn,
    errorFn: opts.errorFn,
    recoverResult: opts.recoverResult,
    syncStatus: status,
    successFn: opts.successFn,
    syncFn: opts.syncFn,
    timeout: opts.timeout || 6000,
    waitFn: opts.waitFn
  }));
};

var syncStatusKey = function syncStatusKey(key) {
  return (global.Array.isArray(key) ? key : [key]).concat(['syncStatus']);
};
var getStatus = function getStatus(m, key) {
  return get(m, syncStatusKey(key));
};
var setStatus = function setStatus(m, key, str) {
  return set(m, syncStatusKey(key), str);
};
var getProp = function getProp(m, key, name) {
  return get(m, key).get(name);
};

var findKeys = function findKeys(m) {
  return m.reduce(function (r, v, k) {
    var current = _immutable.Map.isMap(v) && v.has('syncStatus') ? [k] : [];
    var nested = _immutable.Map.isMap(v) ? findKeys(v).map(function (x) {
      return [k].concat(x);
    }) : [];
    return r.concat.apply(r, [current].concat([nested]));
  }, []);
};

function removeKeys(m, keys) {
  return keys.reduce(function (r, k) {
    return r.deleteIn(syncStatusKey(k));
  }, m);
}

var process = function process(m, id) {
  var keys = findKeys(get(m, [], (0, _immutable.Map)()));
  // TODO timeout
  return keys.reduce(function (r, k) {
    if (typeof getProp(r, k, 'syncFn') != 'function') return r;
    if (getStatus(r, k) === 'pending') {
      r = setStatus(r, k, 'loading');
      var called = false;
      getProp(r, k, 'syncFn')(r, function (error, result) {
        if (called) return;
        called = true;
        setTimeout(function () {
          (0, _index2.swap)(_index2.updateEntity, 'lock', id, function (m) {
            var errorFn = getProp(r, k, 'errorFn');

            if (error && typeof errorFn === 'function') {
              setTimeout(function () {
                return errorFn(m, error);
              }, 0);
            }

            var recoverResult = getProp(m, k, 'recoverResult');

            if (error && recoverResult === undefined) {
              return handleError(m, k, error);
            } else {
              m = setStatus(m, k, 'ok');
              return getProp(m, k, 'successFn')(m, error ? recoverResult : result);
            }
          });
        }, 0);
      });
    } else if (getStatus(r, k) === 'waiting') {
      if (getProp(r, k, 'waitFn')(r)) {
        var conditionFn = getProp(r, k, 'conditionFn');
        r = setStatus(r, k, !conditionFn || conditionFn(r) ? 'pending' : 'no');
      }
    }

    return r;
  }, m);
};

var go = exports.go = function go(id) {
  (0, _index2.observe)('sync', id, function (m) {
    setTimeout(function () {
      return (0, _index2.swap)(_index2.updateEntity, 'lock', id, process, id);
    }, 0);
  });
};

function isSuccess(m, key) {
  return getStatus(m, key) === 'ok';
}

function isDone(m) {
  var keys = findKeys(get(m, [], (0, _immutable.Map)()));
  return keys.length > 0 && keys.reduce(function (r, k) {
    return r && !isLoading(m, k);
  }, true);
}

function hasError(m) {
  var excludeKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var keys = findKeys(removeKeys(get(m, [], (0, _immutable.Map)()), excludeKeys));
  return keys.length > 0 && keys.reduce(function (r, k) {
    return r || getStatus(m, k) === 'error';
  }, false);
}

function isLoading(m, key) {
  return ['loading', 'pending', 'waiting'].indexOf(getStatus(m, key)) > -1;
}

function handleError(m, key, error) {
  var result = setStatus(m, key, 'error');

  // TODO: this should be configurable for each sync
  if (key !== 'sso') {
    var stopError = new Error('An error occurred when fetching ' + key + ' data for Lock: ' + error.message);
    stopError.code = 'sync';
    stopError.origin = error;
    result = l.stop(result, stopError);
  }

  return result;
}
