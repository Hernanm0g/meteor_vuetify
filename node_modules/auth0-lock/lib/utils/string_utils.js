"use strict";

exports.__esModule = true;
exports.matches = matches;
exports.startsWith = startsWith;
exports.endsWith = endsWith;
function matches(search, str) {
  return str.toLowerCase().indexOf(search.toLowerCase()) > -1;
}

function startsWith(str, search) {
  return str.indexOf(search) === 0;
}

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}
