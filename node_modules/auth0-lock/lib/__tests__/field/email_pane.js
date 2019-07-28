'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/email_input', function () {
  return (0, _testUtils.mockComponent)('email_input');
});

var getComponent = function getComponent() {
  return require('field/email/email_pane').default;
};

describe('EmailPane', function () {
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

    var mockEmail = 'user@example.com';
    var mockEmailField = _immutable2.default.fromJS({
      value: mockEmail
    });
    jest.mock('field/index', function () {
      return {
        email: function email() {
          return mockEmail;
        },
        getField: function getField() {
          return mockEmailField;
        },
        getFieldValue: function getFieldValue() {
          return mockEmail;
        },
        isFieldVisiblyInvalid: function isFieldVisiblyInvalid() {
          return true;
        }
      };
    });

    jest.mock('field/email', function () {
      return {
        setEmail: 'setEmail'
      };
    });

    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 1;
        },
        ui: {
          avatar: function avatar() {
            return false;
          },
          allowAutocomplete: function allowAutocomplete() {
            return false;
          }
        }
      };
    });

    jest.mock('avatar', function () {
      return {
        requestAvatar: jest.fn(),
        debouncedRequestAvatar: jest.fn()
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
    var EmailPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(EmailPane, defaultProps)).toMatchSnapshot();
  });
  it('sets `blankErrorHint` when username is empty', function () {
    var fieldIndexMock = require('field/index');
    fieldIndexMock.username = function () {
      return undefined;
    };
    fieldIndexMock.getFieldValue = function () {
      return undefined;
    };
    fieldIndexMock.getField = function () {
      return _immutable2.default.fromJS({
        value: undefined
      });
    };
    var EmailPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(EmailPane, defaultProps)).toMatchSnapshot();
  });
  it('sets isValid as true when `isFieldVisiblyInvalid` is false', function () {
    require('field/index').isFieldVisiblyInvalid = function () {
      return false;
    };
    var EmailPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(EmailPane, defaultProps)).toMatchSnapshot();
  });
  it('sets autoComplete to true when `allowAutocomplete` is true', function () {
    require('core/index').ui.allowAutocomplete = function () {
      return true;
    };
    var EmailPane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(EmailPane, defaultProps)).toMatchSnapshot();
  });
  it('fetches the avatar on componentDidMount if ui.avatar is true and there is a username', function () {
    require('core/index').ui.avatar = function () {
      return true;
    };
    var EmailPane = getComponent();

    (0, _enzyme.mount)(_react2.default.createElement(EmailPane, defaultProps));

    var mock = require('avatar').requestAvatar.mock;

    expect(mock.calls.length).toBe(1);
  });
  it('fetches the avatar onChange if ui.avatar is true', function () {
    require('core/index').ui.avatar = function () {
      return true;
    };
    var EmailPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(EmailPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.onChange({ target: { value: 'newUser@example.com' } });

    var mock = require('avatar').debouncedRequestAvatar.mock;

    expect(mock.calls.length).toBe(1);
  });
  it('calls `swap` onChange', function () {
    var EmailPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(EmailPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.onChange({ target: { value: 'newUser@example.com' } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
