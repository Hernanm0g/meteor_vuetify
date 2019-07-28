'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _data_utils = require('../../utils/data_utils');

var _index = require('../../core/index');

var _i18n = require('../../i18n');

var _testUtils = require('../testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setResolvedConnection = function setResolvedConnection() {
  var _require;

  return (_require = require('core/index')).setResolvedConnection.apply(_require, arguments);
};
var setup = function setup() {
  var _require2;

  return (_require2 = require('core/index')).setup.apply(_require2, arguments);
};

var mockLock = 'm';
var mockSet = void 0;
var mockInit = void 0;

jest.mock('i18n', function () {
  return {
    initI18n: jest.fn()
  };
});

jest.mock('utils/data_utils', function () {
  return {
    dataFns: function dataFns() {
      return {
        get: jest.fn(),
        set: mockSet,
        init: mockInit
      };
    }
  };
});

describe('setup', function () {
  beforeEach(function () {
    mockInit = jest.fn();
    jest.resetModules();
  });
  it('default redirectUrl should not include location.hash', function () {
    (0, _testUtils.setURL)('https://test.com/path/#not-this-part');
    var options = {};
    setup('id', 'clientID', 'domain', options, 'hookRunner', 'emitEventFn');
    var _mockInit = mockInit,
        mock = _mockInit.mock;

    expect(mock.calls.length).toBe(1);
    var model = mock.calls[0][1].toJS();
    expect(model.auth.redirectUrl).toBe('https://test.com/path/');
  });
  it('default redirectUrl should work when `window.location.origin` is not available', function () {
    (0, _testUtils.setURL)('https://test.com/path/#not-this-part', { noOrigin: true });
    var options = {};
    setup('id', 'clientID', 'domain', options, 'hookRunner', 'emitEventFn');
    var _mockInit2 = mockInit,
        mock = _mockInit2.mock;

    expect(mock.calls.length).toBe(1);
    var model = mock.calls[0][1].toJS();
    expect(model.auth.redirectUrl).toBe('https://test.com/path/');
  });
  it('should work with redirect:false and responseType:id_token', function () {
    var options = {
      auth: {
        redirect: false,
        responseType: 'id_token'
      }
    };
    setup('id', 'clientID', 'domain', options, 'hookRunner', 'emitEventFn');
    var _mockInit3 = mockInit,
        mock = _mockInit3.mock;

    expect(mock.calls.length).toBe(1);
    var model = mock.calls[0][1].toJS();
    expect(model).toMatchSnapshot();
  });
});

describe('setResolvedConnection', function () {
  beforeEach(function () {
    mockSet = jest.fn();
    jest.resetModules();
  });
  it('sets undefined when is called with undefined', function () {
    setResolvedConnection(mockLock, undefined);
    expect(mockSet.mock.calls.length).toBe(1);
    expect(mockSet.mock.calls[0]).toMatchSnapshot();
  });
  it('validates format', function () {
    expect(function () {
      return setResolvedConnection(mockLock, {});
    }).toThrowErrorMatchingSnapshot();
    expect(function () {
      return setResolvedConnection(mockLock, { type: 'foo' });
    }).toThrowErrorMatchingSnapshot();
    expect(function () {
      return setResolvedConnection(mockLock, { name: 'bar' });
    }).toThrowErrorMatchingSnapshot();
  });
  it('accepts only database connections', function () {
    expect(function () {
      return setResolvedConnection(mockLock, { type: 'foo', name: 'bar' });
    }).toThrowErrorMatchingSnapshot();
  });
  it('sets the connection', function () {
    setResolvedConnection(mockLock, { type: 'database', name: 'bar' });
    expect(mockSet.mock.calls.length).toBe(1);
    expect(mockSet.mock.calls[0]).toMatchSnapshot();
  });
  it('sets the connection as a Map instance', function () {
    setResolvedConnection(mockLock, { type: 'database', name: 'bar' });
    expect(mockSet.mock.calls.length).toBe(1);
    expect(_immutable2.default.Map.isMap(mockSet.mock.calls[0][2])).toBe(true);
  });
});
