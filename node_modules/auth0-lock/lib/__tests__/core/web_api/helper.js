'use strict';

var _helper = require('core/web_api/helper');

describe('webAuthOverrides', function () {
  it('should return overrides if any field is compatible with WebAuth', function () {
    expect((0, _helper.webAuthOverrides)({
      __tenant: 'tenant1',
      __token_issuer: 'issuer1',
      __jwks_uri: 'https://jwks.com'
    })).toMatchSnapshot();
  });

  it('should omit overrides that are not compatible with WebAuth', function () {
    expect((0, _helper.webAuthOverrides)({
      __tenant: 'tenant1',
      __token_issuer: 'issuer1',
      __jwks_uri: 'https://jwks.com',
      backgroundColor: 'blue'
    })).toMatchSnapshot();
  });

  it('should return null if no fields are compatible with WebAuth', function () {
    expect((0, _helper.webAuthOverrides)({ backgroundColor: 'blue' })).toBe(null);
  });
});

describe('normalizeError', function () {
  it('does nothing when there is no error', function () {
    var normalized = (0, _helper.normalizeError)(undefined);
    expect(normalized).toBe(undefined);
  });

  describe('access_denied to invalid_user_password mapping', function () {
    var domainMock = 'domainMock';
    var errorObjWithError = {
      error: 'access_denied',
      description: 'foobar'
    };
    var errorObjWithCode = {
      code: 'access_denied',
      description: 'foobar'
    };
    var currentWindowObj = void 0;

    beforeAll(function () {
      currentWindowObj = global.window;
      global.window = {
        locaction: {
          host: domainMock
        }
      };
    });

    afterAll(function () {
      global.window = currentWindowObj;
    });

    describe('domain is undefined', function () {
      it('should map access_denied error to invalid_user_password when error.error === access_denied', function () {
        var actualError = (0, _helper.normalizeError)(errorObjWithError);
        expect(actualError).toMatchSnapshot();
      });
      it('should map access_denied error to invalid_user_password when error.code === access_denied', function () {
        var actualError = (0, _helper.normalizeError)(errorObjWithCode);
        expect(actualError).toMatchSnapshot();
      });
    });

    describe("domain doesn't match current host", function () {
      it('should map access_denied error to invalid_user_password when error.error === access_denied', function () {
        var actualError = (0, _helper.normalizeError)(errorObjWithError, 'loremIpsum');
        expect(actualError).toMatchSnapshot();
      });
      it('should map access_denied error to invalid_user_password when error.code === access_denied', function () {
        var actualError = (0, _helper.normalizeError)(errorObjWithCode, 'loremIpsum');
        expect(actualError).toMatchSnapshot();
      });
    });

    describe('domain match current host', function () {
      it('should not map access_denied error to invalid_user_password when error.error === access_denied', function () {
        var actualError = (0, _helper.normalizeError)(errorObjWithError, domainMock);
        expect(actualError).toMatchSnapshot();
      });
      it('should not map access_denied error to invalid_user_password when error.code === access_denied', function () {
        var actualError = (0, _helper.normalizeError)(errorObjWithCode, domainMock);
        expect(actualError).toMatchSnapshot();
      });
    });
  });
});
