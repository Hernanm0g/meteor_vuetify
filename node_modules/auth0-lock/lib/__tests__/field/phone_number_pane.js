'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/phone_number_input', function () {
  return (0, _testUtils.mockComponent)('phone_number_input');
});
jest.mock('ui/input/select_input', function () {
  return (0, _testUtils.mockComponent)('select_input');
});

var getComponent = function getComponent() {
  return require('field/phone-number/phone_number_pane').default;
};

describe('PhoneNumberPane', function () {
  var defaultProps = {
    lock: {},
    placeholder: 'placeholder'
  };
  beforeEach(function () {
    jest.resetModules();

    jest.mock('field/index', function () {
      return {
        phoneNumber: function phoneNumber() {
          return 'phoneNumber';
        },
        isFieldVisiblyInvalid: function isFieldVisiblyInvalid() {
          return true;
        }
      };
    });

    jest.mock('field/phone_number', function () {
      return {
        humanLocation: function humanLocation() {
          return 'humanLocation';
        },
        setPhoneNumber: 'setPhoneNumber'
      };
    });

    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 1;
        },
        submitting: function submitting() {
          return false;
        }
      };
    });

    jest.mock('field/actions', function () {
      return {
        startOptionSelection: jest.fn()
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
    var PhoneNumberPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(PhoneNumberPane, defaultProps)).toMatchSnapshot();
  });
  it('shows header when instructions are available', function () {
    var PhoneNumberPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(PhoneNumberPane, _extends({}, defaultProps, { instructions: _react2.default.createElement(
        'span',
        null,
        'instructions'
      ) }))).toMatchSnapshot();
  });
  it('disables input when submitting', function () {
    require('core/index').submitting = function () {
      return true;
    };
    var PhoneNumberPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(PhoneNumberPane, defaultProps)).toMatchSnapshot();
  });
  it('sets isValid as true when `isFieldVisiblyInvalid` is false', function () {
    require('field/index').isFieldVisiblyInvalid = function () {
      return false;
    };
    var PhoneNumberPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(PhoneNumberPane, defaultProps)).toMatchSnapshot();
  });
  it('calls `startOptionSelection` when SelectInput is clicked', function () {
    var PhoneNumberPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(PhoneNumberPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper, 1);

    props.onClick();

    var mock = require('field/actions').startOptionSelection.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  it('calls `swap` when PhoneNumberInput changes', function () {
    var PhoneNumberPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(PhoneNumberPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper, 2);

    props.onChange({ target: { value: 'newPhoneNumber' } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
