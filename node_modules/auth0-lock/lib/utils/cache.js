"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
  function Cache(fetchFn) {
    _classCallCheck(this, Cache);

    this.cache = {};
    this.cbs = {};
    this.fetchFn = fetchFn;
  }

  Cache.prototype.get = function get() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cb = args.pop();
    var key = JSON.stringify(args);
    if (this.cache[key]) return cb(null, this.cache[key]);
    if (this.registerCallback(key, cb) > 1) return;
    this.fetch(key, args);
  };

  Cache.prototype.fetch = function fetch(key, args) {
    var _this = this;

    this.fetchFn.apply(this, args.concat([function (error, result) {
      if (!error) _this.cache[key] = result;
      _this.execCallbacks(key, error, result);
    }]));
  };

  Cache.prototype.registerCallback = function registerCallback(key, cb) {
    this.cbs[key] = this.cbs[key] || [];
    this.cbs[key].push(cb);
    return this.cbs[key].length;
  };

  Cache.prototype.execCallbacks = function execCallbacks(key) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (this.cbs[key]) this.cbs[key].forEach(function (f) {
      return f.apply(undefined, args);
    });
    delete this.cbs[key];
  };

  return Cache;
}();

exports.default = Cache;
