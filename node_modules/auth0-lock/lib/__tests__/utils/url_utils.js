'use strict';

var _url_utils = require('../../utils/url_utils');

describe('url utils', function () {
  describe('getOriginFromUrl', function () {
    it('should return undefined if there is no url', function () {
      expect((0, _url_utils.getOriginFromUrl)()).toBe(undefined);
      expect((0, _url_utils.getOriginFromUrl)('')).toBe(undefined);
      expect((0, _url_utils.getOriginFromUrl)(null)).toBe(undefined);
    });
    it('should parse the url and return the origin with https', function () {
      var url = 'https://test.com/example';
      expect((0, _url_utils.getOriginFromUrl)(url)).toBe('https://test.com');
    });
    it('should parse the url and return the origin with http', function () {
      var url = 'http://test.com/example';
      expect((0, _url_utils.getOriginFromUrl)(url)).toBe('http://test.com');
    });
    it('should include the `port` when available', function () {
      var url = 'https://localhost:3000/example';
      expect((0, _url_utils.getOriginFromUrl)(url)).toBe('https://localhost:3000');
    });
  });
  describe('getLocationFromUrl', function () {
    it('should return null for invalid urls', function () {
      expect((0, _url_utils.getLocationFromUrl)('banana')).toBe(null);
    });
    var mapping = {
      'http://localhost:3000/foo?id=1': {
        href: 'http://localhost:3000/foo?id=1',
        protocol: 'http:',
        host: 'localhost:3000',
        hostname: 'localhost',
        port: '3000',
        pathname: '/foo',
        search: '?id=1',
        hash: ''
      },
      'https://localhost:3000/foo?id=1': {
        href: 'https://localhost:3000/foo?id=1',
        protocol: 'https:',
        host: 'localhost:3000',
        hostname: 'localhost',
        port: '3000',
        pathname: '/foo',
        search: '?id=1',
        hash: ''
      },
      'https://auth0.com/foo': {
        href: 'https://auth0.com/foo',
        protocol: 'https:',
        host: 'auth0.com',
        hostname: 'auth0.com',
        port: undefined,
        pathname: '/foo',
        search: '',
        hash: ''
      },
      'https://auth0.com/#access_token=foo': {
        href: 'https://auth0.com/#access_token=foo',
        protocol: 'https:',
        host: 'auth0.com',
        hostname: 'auth0.com',
        port: undefined,
        pathname: '/',
        search: '',
        hash: '#access_token=foo'
      },
      'https://auth0.com/#/foo/access_token=foo': {
        href: 'https://auth0.com/#/foo/access_token=foo',
        protocol: 'https:',
        host: 'auth0.com',
        hostname: 'auth0.com',
        port: undefined,
        pathname: '/',
        search: '',
        hash: '#/foo/access_token=foo'
      }
    };

    var _loop = function _loop(url) {
      it('should map urls correctly: ' + url, function () {
        expect((0, _url_utils.getLocationFromUrl)(url)).toMatchObject(mapping[url]);
      });
    };

    for (var url in mapping) {
      _loop(url);
    }
  });
});
