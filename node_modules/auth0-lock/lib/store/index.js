'use strict';

exports.__esModule = true;
exports.observe = observe;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.swap = swap;
exports.updateEntity = updateEntity;
exports.setEntity = setEntity;
exports.read = read;
exports.getEntity = getEntity;
exports.removeEntity = removeEntity;
exports.getCollection = getCollection;
exports.updateCollection = updateCollection;
exports.getState = getState;

var _atom = require('../utils/atom');

var _atom2 = _interopRequireDefault(_atom);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _atom2.default)(new _immutable.Map({}));

function observe(key, id, f) {
  subscribe(key + '-' + id, function (_, oldState, newState) {
    var m = getEntity(newState, 'lock', id);
    var oldM = getEntity(oldState, 'lock', id);
    if (m && !m.equals(oldM)) {
      f(m);
    }
  });
}

function subscribe(key, f) {
  store.addWatch(key, f);
}

function unsubscribe(key) {
  store.removeWatch(key);
}

function swap() {
  return store.swap.apply(store, arguments);
}

function updateEntity(state, coll, id, f) {
  for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  return state.updateIn([coll, id], new _immutable.Map({}), function (x) {
    return f.apply(undefined, [x].concat(args));
  });
}

function setEntity(state, coll, id, m) {
  return state.setIn([coll, id], m);
}

function read(f) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return f.apply(undefined, [store.deref()].concat(args));
}

function getEntity(state, coll) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return state.getIn([coll, id]);
}

function removeEntity(state, coll) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return state.removeIn([coll, id]);
}

function getCollection(state, coll) {
  return state.get(coll, (0, _immutable.Map)()).toList();
}

// TODO: try to remove this fn
function updateCollection(state, coll, f) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  return state.update(coll, function (xs) {
    return f.apply(undefined, [xs].concat(args));
  });
}

function getState() {
  return store.deref();
}

// DEV
// store.addWatch("keepHistory", (key, oldState, newState) => {
//   if (!global.window.h) global.window.h = []; global.window.h.push(newState);
//   console.debug("something changed", newState.toJS());
// });
