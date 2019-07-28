'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _testUtils = require('../../testUtils');

var _sync = require('../../../sync');

var _sync2 = _interopRequireDefault(_sync);

var _index = require('../../../core/index');

var _index2 = require('../../../field/index');

var _preload_utils = require('../../../utils/preload_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('store/index', function () {
  return {
    swap: jest.fn(),
    updateEntity: 'updateEntity'
  };
});

jest.mock('ui/box/chrome', function () {
  return (0, _testUtils.mockComponent)('chrome');
});

var mockEvent = {
  preventDefault: function preventDefault() {}
};

var getContainer = function getContainer() {
  var Container = require('ui/box/container').default;
  return new Container({
    contentProps: {
      i18n: {},
      model: _immutable2.default.fromJS({
        client: {
          connections: {
            database: [{ name: 'dbA' }, { name: 'dbB' }]
          },
          id: 'alksdkhasd__test-lock__alsdkhalkshd'
        },
        field: {
          email: {
            invalidHint: null,
            showInvalid: false,
            valid: true,
            value: 'peter_picked@pickledpepper.com'
          }
        }
      })
    }
  });
};

describe('Container', function () {
  it('does not call `connectionResolver` on submit when there is no custom `connectionResolver`', function () {
    var c = getContainer();

    c.handleSubmit(mockEvent);

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(0);
  });

  describe('with a custom `connectionResolver`', function () {
    var connectionResolverMock = void 0;
    var setResolvedConnectionMock = void 0;

    beforeEach(function () {
      connectionResolverMock = jest.fn();
      setResolvedConnectionMock = jest.fn();
      require('core/index').connectionResolver = function () {
        return connectionResolverMock;
      };
      require('core/index').setResolvedConnection = setResolvedConnectionMock;
    });

    it('calls `connectionResolver` onSubmit', function () {
      var c = getContainer();
      c.handleSubmit(mockEvent);

      var _connectionResolverMo = connectionResolverMock,
          mock = _connectionResolverMo.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0]).toMatchSnapshot();
    });
    it('calls `swap` in the `connectionResolver` callback', function () {
      var c = getContainer();
      c.handleSubmit(mockEvent);

      connectionResolverMock.mock.calls[0][2]('resolvedConnection');

      var mock = require('store/index').swap.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0]).toMatchSnapshot();
    });
    it('calls `setResolvedConnection` in the `swap` callback', function () {
      var c = getContainer();
      c.handleSubmit(mockEvent);

      connectionResolverMock.mock.calls[0][2]('resolvedConnection');
      require('store/index').swap.mock.calls[0][3]('model');
      var _setResolvedConnectio = setResolvedConnectionMock,
          mock = _setResolvedConnectio.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0]).toMatchSnapshot();
    });
  });
});
