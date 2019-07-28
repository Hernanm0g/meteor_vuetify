'use strict';

exports.__esModule = true;
exports.changeField = changeField;
exports.startOptionSelection = startOptionSelection;
exports.selectOption = selectOption;
exports.cancelOptionSelection = cancelOptionSelection;

var _immutable = require('immutable');

var _index = require('../store/index');

var _index2 = require('./index');

function changeField(id, name, value, validationFn) {
  for (var _len = arguments.length, validationExtraArgs = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    validationExtraArgs[_key - 4] = arguments[_key];
  }

  _index.swap.apply(undefined, [_index.updateEntity, 'lock', id, _index2.setField, name, value, validationFn].concat(validationExtraArgs));
}

function startOptionSelection(id, name, iconUrl, icon) {
  // TODO: should be transient
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    return m.setIn(['field', 'selecting', 'name'], name).setIn(['field', 'selecting', 'iconUrl'], iconUrl).setIn(['field', 'selecting', 'icon'], icon);
  });
}

function selectOption(id, name, option) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    return (0, _index2.setOptionField)(m.deleteIn(['field', 'selecting']), name, option);
  });
}

function cancelOptionSelection(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    return m.deleteIn(['field', 'selecting']);
  });
}
