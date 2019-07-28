'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _testUtils = require('testUtils');

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _signed_in_confirmation2 = _interopRequireDefault(_signed_in_confirmation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var lock = _immutable2.default.fromJS({ id: '__lock-id__' });

describe('SignedInConfirmation', function () {
  it('renders correctly', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _testUtils.expectComponent)(_react2.default.createElement(_signed_in_confirmation2.default, { lock: lock })).toMatchSnapshot();

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});
