'use strict';

exports.__esModule = true;
exports.skipQuickAuth = skipQuickAuth;
exports.hasSkippedQuickAuth = hasSkippedQuickAuth;

var _data_utils = require('./utils/data_utils');

var _dataFns = (0, _data_utils.dataFns)(['quickAuth']),
    tget = _dataFns.tget,
    tset = _dataFns.tset;

function skipQuickAuth(m, b) {
  return tset(m, 'skipped', b);
}

function hasSkippedQuickAuth(m) {
  return tget(m, 'skipped', false);
}
