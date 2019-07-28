'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/password_input', function () {
  return (0, _testUtils.mockComponent)('password_input');
});

var getComponent = function getComponent() {
  return require('field/password/password_pane').default;
};

describe('PasswordPane', function () {
  var defaultProps = {
    i18n: {
      str: function str() {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        return keys.join(',');
      },
      html: function html() {
        for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          keys[_key2] = arguments[_key2];
        }

        return keys.join(',');
      }
    },
    lock: {},
    placeholder: 'placeholder',
    policy: 'policy',
    strengthMessages: {}
  };

  beforeEach(function () {
    jest.resetModules();

    jest.mock('field/index', function () {
      return {
        isFieldValid: function isFieldValid() {
          return true;
        },
        getFieldValue: function getFieldValue(m, field) {
          return field;
        },
        isFieldVisiblyInvalid: function isFieldVisiblyInvalid() {
          return true;
        }
      };
    });

    jest.mock('field/password', function () {
      return {
        setPassword: 'setPassword'
      };
    });

    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 1;
        },
        submitting: function submitting() {
          return false;
        },
        ui: {
          allowShowPassword: function allowShowPassword() {
            return false;
          }
        }
      };
    });

    jest.mock('store/index', function () {
      return {
        swap: jest.fn(),
        updateEntity: 'updateEntity'
      };
    });
  });

  it('renders correctly', function () {
    var PasswordPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, defaultProps)).toMatchSnapshot();
  });
  it('renders correctly when `allowShowPassword` is true', function () {
    require('core/index').ui.allowShowPassword = function () {
      return true;
    };
    var PasswordPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, defaultProps)).toMatchSnapshot();
  });
  it('renders correct css className when `hidden` is true', function () {
    var PasswordPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, _extends({}, defaultProps, { hidden: true }))).toMatchSnapshot();
  });
  it('disables input when submitting', function () {
    require('core/index').submitting = function () {
      return true;
    };
    var PasswordPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, defaultProps)).toMatchSnapshot();
  });
  it('sets showPasswordStrengthMessage as true when `isFieldValid` is false', function () {
    require('field/index').isFieldValid = function () {
      return false;
    };
    var PasswordPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, defaultProps)).toMatchSnapshot();
  });
  it('sets showPasswordStrengthMessage as false when `isFieldValid` is true', function () {
    require('field/index').isFieldValid = function () {
      return true;
    };
    var PasswordPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, defaultProps)).toMatchSnapshot();
  });
  it('sets isValid as true when `isFieldVisiblyInvalid` is false', function () {
    require('field/index').isFieldVisiblyInvalid = function () {
      return false;
    };
    var PasswordPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(PasswordPane, defaultProps)).toMatchSnapshot();
  });
  it('calls `swap` when password changes', function () {
    var PasswordPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(PasswordPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper, 1);
    props.onChange({ target: { value: 'newPassword' } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  it('calls `swap` when checkbox is clicked', function () {
    require('core/index').ui.allowShowPassword = function () {
      return true;
    };
    var PasswordPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(PasswordPane, defaultProps));
    var props = wrapper.find('div input').props();
    props.onChange({ target: { checked: true } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
