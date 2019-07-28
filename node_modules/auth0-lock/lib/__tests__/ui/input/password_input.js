'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

var _testUtils2 = require('../../testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/input_wrap', function () {
  return (0, _testUtils.mockComponent)('input_wrap');
});
jest.mock('ui/input/password/password_strength', function () {
  return (0, _testUtils.mockComponent)('password_strength');
});

jest.mock('core/index', function () {
  return {
    ui: {
      allowPasswordAutocomplete: function allowPasswordAutocomplete() {
        return false;
      }
    }
  };
});

var getComponent = function getComponent() {
  return require('ui/input/password_input').default;
};

describe('PasswordInput', function () {
  var defaultProps = {
    invalidHint: 'invalidHint',
    showPasswordStrengthMessage: true,
    isValid: true,
    onChange: jest.fn(),
    policy: 'policy',
    strengthMessages: { strengthMessages: 'strengthMessages' },
    value: 'value',
    showPassword: false,
    lock: {}
  };
  test('sends PasswordStrength as the `after` param', function () {
    var Input = getComponent();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Input, defaultProps));
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('change', { target: { value: 'pass' } });
    var props = (0, _testUtils2.extractPropsFromWrapper)(wrapper);
    expect(props.after.props).toEqual({
      messages: { strengthMessages: 'strengthMessages' },
      password: 'value',
      policy: 'policy'
    });
  });
  test('`allowPasswordAutocomplete=true` sets `autoComplete` as on', function () {
    require('core/index').ui.allowPasswordAutocomplete = function () {
      return true;
    };
    var Input = getComponent();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Input, defaultProps));
    expect(wrapper.find('input').props().autoComplete).toBe('on');
  });
  test('`allowPasswordAutocomplete=false` sets `autoComplete` as off', function () {
    require('core/index').ui.allowPasswordAutocomplete = function () {
      return false;
    };
    var Input = getComponent();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Input, defaultProps));
    expect(wrapper.find('input').props().autoComplete).toBe('off');
  });
});
