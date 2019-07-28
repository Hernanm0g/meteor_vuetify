'use strict';

exports.__esModule = true;
exports.expectMockToMatch = exports.setURL = exports.extractPropsFromWrapper = exports.mockComponent = exports.expectComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // eslint-disable-line


var expectComponent = exports.expectComponent = function expectComponent(children) {
  var component = _reactTestRenderer2.default.create(children);
  return expect(component);
};

var addDataToProps = function addDataToProps(props) {
  var returnedProps = {};
  Object.keys(props).forEach(function (k) {
    return returnedProps['data-' + k] = props[k];
  });
  return returnedProps;
};

var removeDataFromProps = function removeDataFromProps(props) {
  var returnedProps = {};
  Object.keys(props).forEach(function (k) {
    return returnedProps[k.replace('data-', '')] = props[k];
  });
  return returnedProps;
};

var mockComponent = function mockComponent(type) {
  var domElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  return function (_ref) {
    var children = _ref.children,
        props = _objectWithoutProperties(_ref, ['children']);

    return _react2.default.createElement(domElement, _extends({
      'data-__type': type
    }, addDataToProps(props)), children);
  };
};

exports.mockComponent = mockComponent;
var extractPropsFromWrapper = exports.extractPropsFromWrapper = function extractPropsFromWrapper(wrapper) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return removeDataFromProps(wrapper.find('div').at(index).props());
};

//set urls with jest: https://github.com/facebook/jest/issues/890#issuecomment-298594389
var setURL = exports.setURL = function setURL(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parser = document.createElement('a');
  parser.href = url;
  ['href', 'protocol', 'host', 'hostname', 'origin', 'port', 'pathname', 'search', 'hash'].forEach(function (prop) {
    var value = parser[prop];
    if (prop === 'origin' && options.noOrigin) {
      value = null;
    }
    Object.defineProperty(window.location, prop, {
      value: value,
      writable: true
    });
  });
};

var expectMockToMatch = exports.expectMockToMatch = function expectMockToMatch(_ref2, numberOfCalls) {
  var mock = _ref2.mock;

  expect(mock.calls.length).toBe(numberOfCalls);
  for (var i = 0; i < numberOfCalls; i++) {
    expect(mock.calls[i]).toMatchSnapshot();
  }
};
