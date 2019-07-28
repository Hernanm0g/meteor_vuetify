'use strict';

exports.__esModule = true;
exports.debouncedRequestAvatar = undefined;
exports.requestAvatar = requestAvatar;

var _index = require('./store/index');

var _data_utils = require('./utils/data_utils');

var _preload_utils = require('./utils/preload_utils');

var preload = _interopRequireWildcard(_preload_utils);

var _fn_utils = require('./utils/fn_utils');

var f = _interopRequireWildcard(_fn_utils);

var _index2 = require('./core/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _dataFns = (0, _data_utils.dataFns)(['avatar']),
    tget = _dataFns.tget,
    tset = _dataFns.tset;

var cache = {};

function requestAvatar(id, src) {
  if (cache[src]) {
    return update(id, src, cache[src].url, cache[src].displayName, true);
  }

  var provider = l.ui.avatarProvider((0, _index.read)(_index.getEntity, 'lock', id)).toJS();

  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    m = tset(m, 'syncStatus', 'loading');
    m = tset(m, 'src', src);
    return m;
  });

  var url = void 0,
      displayName = void 0;

  provider.url(src, function (error, str) {
    if (error) return handleError(id, src);

    preload.img(str, function (error, img) {
      if (error) return handleError(id, src);
      url = img.src;
      if (displayName !== undefined) handleSuccess(id, src, url, displayName);
    });
  });

  provider.displayName(src, function (error, str) {
    if (error) return handleError(id);
    displayName = str;
    if (url !== undefined) handleSuccess(id, src, url, displayName);
  });
}

var debouncedRequestAvatar = exports.debouncedRequestAvatar = f.debounce(requestAvatar, 300);

function handleSuccess(id, src, url, displayName) {
  cache[src] = { url: url, displayName: displayName };
  update(id, src, url, displayName);
}

function update(id, src, url, displayName) {
  var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    if (force || tget(m, 'src') === src) {
      m = tset(m, 'syncStatus', 'ok');
      m = tset(m, 'url', url);
      m = tset(m, 'src', src);
      m = tset(m, 'displayName', displayName);
    }
    return m;
  });
}

function handleError(id, src) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    return tget(m, 'src') === 'src' ? tset(m, 'syncStatus', 'error') : m;
  });
}
