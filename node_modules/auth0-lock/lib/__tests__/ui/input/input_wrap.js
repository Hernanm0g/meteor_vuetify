'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _testUtils = require('testUtils');

var _input_wrap = require('../../../ui/input/input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('InputWrap', function () {
  var defaultProps = {
    after: _react2.default.createElement(
      'span',
      null,
      'after'
    ),
    isValid: true,
    name: 'name'
  };

  test('renders correctly with the `after` prop', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_input_wrap2.default, defaultProps)).toMatchSnapshot();
  });
});
