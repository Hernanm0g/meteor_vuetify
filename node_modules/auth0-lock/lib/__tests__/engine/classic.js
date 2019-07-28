'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getClassic = function getClassic() {
  return require('engine/classic').default;
};

describe('Classic Engine', function () {
  beforeEach(function () {
    jest.mock('connection/database/index', function () {
      return {
        resolveAdditionalSignUpFields: function resolveAdditionalSignUpFields(m) {
          return _extends({}, m, { resolveAdditionalSignUpFields: true });
        },
        overrideDatabaseOptions: function overrideDatabaseOptions(m) {
          return _extends({}, m, { overrideDatabaseOptions: true });
        }
      };
    });
    jest.mock('sync', function () {
      return {
        isSuccess: function isSuccess() {
          return false;
        }
      };
    });
  });
  test('willShow calls `resolveAdditionalSignUpFields`', function () {
    var classic = getClassic();
    var model = classic.willShow(model, {});
    expect(model.resolveAdditionalSignUpFields).toBe(true);
  });
  test('willShow calls `overrideDatabaseOptions`', function () {
    var classic = getClassic();
    var model = classic.willShow(model, {});
    expect(model.overrideDatabaseOptions).toBe(true);
  });
});
