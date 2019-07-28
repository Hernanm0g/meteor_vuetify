'use strict';

var _actions = require('../../core/actions');

var _testUtils = require('testUtils');

jest.mock('../../core/web_api', function () {
  return {
    checkSession: jest.fn()
  };
});

jest.mock('store/index', function () {
  return {
    read: jest.fn(function () {
      return 'model';
    }),
    getEntity: 'getEntity',
    swap: jest.fn(),
    updateEntity: 'updateEntity'
  };
});

jest.mock('core/index', function () {
  return {
    id: function id() {
      return 'id';
    },
    setSubmitting: jest.fn()
  };
});

describe('core.actions', function () {
  beforeEach(function () {
    jest.resetAllMocks();
  });
  describe('checkSession', function () {
    it('should set submitting on start', function () {
      (0, _actions.checkSession)('id', 'params', 'cb');

      var _require = require('store/index'),
          read = _require.read,
          swap = _require.swap;

      (0, _testUtils.expectMockToMatch)(read, 1);
      (0, _testUtils.expectMockToMatch)(swap, 1);
      swap.mock.calls[0][3]('model');
      (0, _testUtils.expectMockToMatch)(require('core/index').setSubmitting, 1);
    });
  });
});
