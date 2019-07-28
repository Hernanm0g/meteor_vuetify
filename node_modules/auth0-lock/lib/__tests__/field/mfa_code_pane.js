'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/mfa_code_input', function () {
  return (0, _testUtils.mockComponent)('mfa_code_input');
});

var getComponent = function getComponent() {
  return require('field/mfa-code/mfa_code_pane').default;
};

describe('MFACodePane', function () {
  var defaultProps = {
    i18n: {
      str: function str() {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        return keys.join(',');
      }
    },
    lock: {},
    placeholder: 'placeholder'
  };

  beforeEach(function () {
    jest.resetModules();

    jest.mock('field/index', function () {
      return {
        getFieldValue: function getFieldValue() {
          return 'mfa';
        },
        isFieldVisiblyInvalid: function isFieldVisiblyInvalid() {
          return true;
        }
      };
    });

    jest.mock('field/password', function () {
      return {
        getMFACodeValidation: function getMFACodeValidation() {
          return 'getMFACodeValidation';
        },
        setMFACode: 'setMFACode'
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
          avatar: function avatar() {
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
    var MFACodePane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(MFACodePane, defaultProps)).toMatchSnapshot();
  });
  it('sets isValid as true when `isFieldVisiblyInvalid` is false', function () {
    require('field/index').isFieldVisiblyInvalid = function () {
      return false;
    };
    var MFACodePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(MFACodePane, defaultProps)).toMatchSnapshot();
  });
  it('calls `swap` onChange', function () {
    var MFACodePane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(MFACodePane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.onChange({ target: { value: 'newUser' } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
