'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/vcode_input', function () {
  return (0, _testUtils.mockComponent)('vcode_input');
});

var getComponent = function getComponent() {
  return require('field/vcode/vcode_pane').default;
};

describe('VcodePane', function () {
  var defaultProps = {
    lock: {},
    placeholder: 'placeholder',
    resendLabel: 'resendLabel',
    onRestart: jest.fn()
  };
  beforeEach(function () {
    jest.resetModules();

    jest.mock('field/index', function () {
      return {
        vcode: function vcode() {
          return 'vcode';
        },
        isFieldVisiblyInvalid: function isFieldVisiblyInvalid() {
          return true;
        }
      };
    });

    jest.mock('field/phone_number', function () {
      return {
        setVcode: 'setVcode'
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
        globalError: function globalError() {
          return true;
        }
      };
    });

    jest.mock('utils/media_utils', function () {
      return {
        isSmallScreen: function isSmallScreen() {
          return true;
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
    var VcodePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(VcodePane, defaultProps)).toMatchSnapshot();
  });
  it('shows header when instructions are available', function () {
    var VcodePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(VcodePane, _extends({}, defaultProps, { instructions: _react2.default.createElement(
        'span',
        null,
        'instructions'
      ) }))).toMatchSnapshot();
  });
  it('disable input when submitting', function () {
    require('core/index').submitting = function () {
      return true;
    };
    var VcodePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(VcodePane, defaultProps)).toMatchSnapshot();
  });
  it('sets isValid as true when `isFieldVisiblyInvalid` is false and globalError() is false', function () {
    require('field/index').isFieldVisiblyInvalid = function () {
      return false;
    };
    require('core/index').globalError = function () {
      return false;
    };
    var VcodePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(VcodePane, defaultProps)).toMatchSnapshot();
  });
  it('sets autoFocus as true when `isSmallScreen` is false', function () {
    require('utils/media_utils').isSmallScreen = function () {
      return false;
    };
    var VcodePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(VcodePane, defaultProps)).toMatchSnapshot();
  });
  it('calls `onRestart` when alternative link is clicked', function () {
    var VcodePane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(VcodePane, defaultProps));
    wrapper.find('.auth0-lock-alternative-link').simulate('click');

    var mock = defaultProps.onRestart.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  it('calls `swap` when VcodeInput changes', function () {
    var VcodePane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(VcodePane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper, 1);

    props.onChange({ preventDefault: jest.fn(), target: { value: 'newCode' } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
