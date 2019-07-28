'use strict';

var getInitTenant = function getInitTenant() {
  return require('core/tenant/index').initTenant;
};

var CLIENT_ID = 'client_id';

var runTest = function runTest(initTenant, mockDataFns, client) {
  initTenant({}, CLIENT_ID, client);
  expect(mockDataFns.initNS.mock.calls.length).toBe(1);
  var tenantInfo = mockDataFns.initNS.mock.calls[0][1].toJS();
  expect(tenantInfo).toMatchSnapshot();
};

describe('initTenant()', function () {
  var initTenant = void 0;
  var mockDataFns = void 0;
  beforeEach(function () {
    jest.resetModules();

    mockDataFns = {
      initNS: jest.fn(),
      get: jest.fn()
    };
    jest.mock('utils/data_utils', function () {
      return {
        dataFns: function dataFns() {
          return mockDataFns;
        }
      };
    });

    jest.mock('core/index', function () {
      return {
        findConnection: jest.fn()
      };
    });
    initTenant = getInitTenant();
  });
  describe('with database connection', function () {
    it('maps connection correctly with defaults', function () {
      var client = {
        connections: {
          database: [{
            name: 'test-connection-database',
            strategy: 'auth0'
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
    it('maps connection correctly with all the properties', function () {
      var client = {
        connections: {
          database: [{
            allowForgot: false,
            allowSignup: false,
            name: 'test-connection-database',
            requiresUsername: true,
            strategy: 'auth0',
            validation: {
              username: {
                min: 4,
                max: 5
              }
            }
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
    it('maps password policy correctly', function () {
      var client = {
        connections: {
          database: [{
            allowForgot: false,
            allowSignup: false,
            name: 'test-connection-database',
            requiresUsername: true,
            strategy: 'auth0',
            validation: {
              passwordPolicy: 'low', //minLength: 6
              username: {
                min: 4,
                max: 5
              }
            }
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
    it('fixes validation when values are not numbers', function () {
      var client = {
        connections: {
          database: [{
            allowForgot: false,
            allowSignup: false,
            name: 'test-connection-database',
            requiresUsername: true,
            strategy: 'auth0',
            validation: {
              username: {
                min: 'foo',
                max: 'bar'
              }
            }
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
    it('fixes validation when username.min > username.max', function () {
      var client = {
        connections: {
          database: [{
            allowForgot: false,
            allowSignup: false,
            name: 'test-connection-database',
            requiresUsername: true,
            strategy: 'auth0',
            validation: {
              username: {
                min: 5,
                max: 4
              }
            }
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
  });
  describe('with enterprise connection', function () {
    it('maps connection correctly', function () {
      var client = {
        connections: {
          enterprise: [{
            name: 'test-connection-enterprise',
            domains: 'domains',
            strategy: 'auth0'
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
  });
  describe('with other connection types', function () {
    it('maps connection correctly', function () {
      var client = {
        connections: {
          social: [{
            name: 'test-connection-other_type',
            strategy: 'auth0'
          }],
          unknown: [{
            name: '??',
            strategy: '??'
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
  });
  describe('with passwordless connection', function () {
    it('maps connection correctly', function () {
      var client = {
        connections: {
          passwordless: [{
            name: 'sms',
            strategy: 'sms'
          }]
        }
      };
      runTest(initTenant, mockDataFns, client);
    });
  });
  test('filters clientConnections', function () {
    var _clientsConnections;

    var client = {
      connections: {
        database: [{
          name: 'test-connection-database',
          strategy: 'auth0'
        }, {
          name: 'test-not-this-one',
          strategy: 'auth0'
        }]
      },
      clientsConnections: (_clientsConnections = {}, _clientsConnections[CLIENT_ID] = ['test-connection-database'], _clientsConnections)
    };
    runTest(initTenant, mockDataFns, client);
  });
});
