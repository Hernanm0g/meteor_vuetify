'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _client = require('../../../core/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('core/client/index', function () {
  describe('initClient', function () {
    ['none', 'low', 'fair', 'good', 'excellent'].forEach(function (policy) {
      it('loads password policy \'' + policy + '\' correctly without a password_complexity_options option', function () {
        var client = {
          strategies: [{
            name: 'auth0',
            connections: [{
              name: 'Username-Password-Authentication',
              passwordPolicy: policy
            }]
          }]
        };
        var result = (0, _client.initClient)(_immutable2.default.fromJS({}), client).toJS();
        expect(result.client.connections.database[0].passwordPolicy.length).toMatchSnapshot();
      });
      it('loads password policy \'' + policy + '\' correctly with a password_complexity_options option', function () {
        var client = {
          strategies: [{
            name: 'auth0',
            connections: [{
              name: 'Username-Password-Authentication',
              passwordPolicy: policy,
              password_complexity_options: { min_length: 4 }
            }]
          }]
        };
        var result = (0, _client.initClient)(_immutable2.default.fromJS({}), client).toJS();
        expect(result.client.connections.database[0].passwordPolicy.length).toMatchSnapshot();
      });
    });
  });
});
