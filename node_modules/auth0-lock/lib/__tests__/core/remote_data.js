'use strict';

var getSyncRemoteData = function getSyncRemoteData() {
  return require('core/remote_data').syncRemoteData;
};

describe('remote_data.syncRemoteData()', function () {
  beforeEach(function () {
    jest.resetModules();

    jest.mock('sync', function () {
      return jest.fn();
    });

    jest.mock('connection/enterprise', function () {
      return {
        isADEnabled: function isADEnabled() {
          return true;
        }
      };
    });

    jest.mock('core/index', function () {
      return {
        useTenantInfo: function useTenantInfo() {
          return true;
        },
        id: function id() {
          return 'id';
        }
      };
    });

    jest.mock('core/sso/data', function () {
      return {
        fetchSSOData: jest.fn()
      };
    });
  });
  describe('calls getSSOData with AD information', function () {
    [true, false].forEach(function (isAdEnabled) {
      it('when isADEnabled is ' + isAdEnabled, function () {
        require('connection/enterprise').isADEnabled = function () {
          return isAdEnabled;
        };
        var syncRemoteData = getSyncRemoteData();
        syncRemoteData();
        var ssoCall = require('sync').mock.calls.find(function (c) {
          return c[1] === 'sso';
        });
        ssoCall[2].syncFn('model', 'callback');

        var _require$fetchSSOData = require('core/sso/data').fetchSSOData.mock.calls[0],
            id = _require$fetchSSOData[0],
            sendADInformation = _require$fetchSSOData[1],
            callback = _require$fetchSSOData[2];

        expect(sendADInformation).toBe(isAdEnabled);
      });
    });
  });
});
