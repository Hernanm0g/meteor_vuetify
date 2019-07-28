'use strict';

exports.__esModule = true;
exports.setVcode = setVcode;

var _index = require('./index');

function setVcode(m, str) {
  return (0, _index.setField)(m, 'vcode', str.replace(/[\s-]+/g, ''));
}
