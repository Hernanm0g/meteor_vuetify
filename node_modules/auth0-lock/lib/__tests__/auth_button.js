'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

var _auth_button = require('ui/button/auth_button');

var _auth_button2 = _interopRequireDefault(_auth_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AuthButton', function () {
  var defaultProps = {
    label: 'label',
    onClick: jest.fn(),
    strategy: 'strategy'
  };
  it('renders correctly', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_auth_button2.default, defaultProps)).toMatchSnapshot();
  });
  it('renders with style customizations', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_auth_button2.default, _extends({}, defaultProps, {
      icon: 'test',
      primaryColor: 'primaryColor',
      foregroundColor: 'foregroundColor'
    }))).toMatchSnapshot();
  });
  it('should trigger onClick when clicked', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_auth_button2.default, defaultProps));
    wrapper.find('button').simulate('click');
    expect(defaultProps.onClick.mock.calls.length).toBe(1);
  });
});
