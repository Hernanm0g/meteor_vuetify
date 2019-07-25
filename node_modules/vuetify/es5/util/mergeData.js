"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeData;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */
function mergeData() {
  var mergeTarget = {};
  var i = arguments.length;
  var prop;
  var event; // Allow for variadic argument length.

  while (i--) {
    // Iterate through the data properties and execute merge strategies
    // Object.keys eliminates need for hasOwnProperty call
    for (var _i = 0, _Object$keys = Object.keys(arguments[i]); _i < _Object$keys.length; _i++) {
      prop = _Object$keys[_i];

      switch (prop) {
        // Array merge strategy (array concatenation)
        case 'class':
        case 'style':
        case 'directives':
          if (!Array.isArray(mergeTarget[prop])) {
            mergeTarget[prop] = [];
          } // Repackaging in an array allows Vue runtime
          // to merge class/style bindings regardless of type.


          mergeTarget[prop] = mergeTarget[prop].concat(arguments[i][prop]);
          break;
        // Space delimited string concatenation strategy

        case 'staticClass':
          if (!arguments[i][prop]) {
            break;
          }

          if (mergeTarget[prop] === undefined) {
            mergeTarget[prop] = '';
          }

          if (mergeTarget[prop]) {
            // Not an empty string, so concatenate
            mergeTarget[prop] += ' ';
          }

          mergeTarget[prop] += arguments[i][prop].trim();
          break;
        // Object, the properties of which to merge via array merge strategy (array concatenation).
        // Callback merge strategy merges callbacks to the beginning of the array,
        // so that the last defined callback will be invoked first.
        // This is done since to mimic how Object.assign merging
        // uses the last given value to assign.

        case 'on':
        case 'nativeOn':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {};
          }

          var listeners = mergeTarget[prop];

          for (var _i2 = 0, _Object$keys2 = Object.keys(arguments[i][prop] || {}); _i2 < _Object$keys2.length; _i2++) {
            event = _Object$keys2[_i2];

            // Concat function to array of functions if callback present.
            if (listeners[event]) {
              // Insert current iteration data in beginning of merged array.
              listeners[event] = Array().concat( // eslint-disable-line
              listeners[event], arguments[i][prop][event]);
            } else {
              // Straight assign.
              listeners[event] = arguments[i][prop][event];
            }
          }

          break;
        // Object merge strategy

        case 'attrs':
        case 'props':
        case 'domProps':
        case 'scopedSlots':
        case 'staticStyle':
        case 'hook':
        case 'transition':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {};
          }

          mergeTarget[prop] = _objectSpread({}, arguments[i][prop], {}, mergeTarget[prop]);
          break;
        // Reassignment strategy (no merge)

        case 'slot':
        case 'key':
        case 'ref':
        case 'tag':
        case 'show':
        case 'keepAlive':
        default:
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop];
          }

      }
    }
  }

  return mergeTarget;
}
//# sourceMappingURL=mergeData.js.map