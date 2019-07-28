'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('../../testUtils');

var _global_message = require('ui/box/global_message');

var _global_message2 = _interopRequireDefault(_global_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GlobalMessage', function () {
  it('renders correctly given a success type', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_global_message2.default, { type: 'success', message: 'Success!' })).toMatchSnapshot();
  });
  it('renders correctly given an error type', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_global_message2.default, { type: 'error', message: 'An error occurred.' })).toMatchSnapshot();
  });
  it('renders correctly given an info type', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_global_message2.default, { type: 'info', message: 'Some additional information.' })).toMatchSnapshot();
  });
  it('should call scrollIntoView if parameter is set and top < 0', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_global_message2.default, { type: 'success', message: 'foo', scrollIntoView: true }));
    var getBoundingClientRectSpy = jest.fn().mockReturnValue({ top: -1 });
    var scrollIntoViewSpy = jest.fn();
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;

    wrapper.instance().componentDidMount();

    expect(getBoundingClientRectSpy).toHaveBeenCalled();
    expect(scrollIntoViewSpy).toHaveBeenCalledWith(true);
  });
  it('should not call scrollIntoView if parameter is set and top >= 0', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_global_message2.default, { type: 'success', message: 'foo', scrollIntoView: true }));
    var getBoundingClientRectSpy = jest.fn().mockReturnValue({ top: 0 });
    var scrollIntoViewSpy = jest.fn();
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;

    wrapper.instance().componentDidMount();

    expect(getBoundingClientRectSpy).toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });
  it('should call scrollIntoView if parameter is not set (default is true)', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_global_message2.default, { type: 'success', message: 'foo' }));
    var getBoundingClientRectSpy = jest.fn().mockReturnValue({ top: -1 });
    var scrollIntoViewSpy = jest.fn();
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;

    wrapper.instance().componentDidMount();

    expect(getBoundingClientRectSpy).toHaveBeenCalled();
    expect(scrollIntoViewSpy).toHaveBeenCalledWith(true);
  });
  it('should not call scrollIntoView if parameter is set to false', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_global_message2.default, { type: 'success', message: 'foo', scrollIntoView: false }));
    var getBoundingClientRectSpy = jest.fn().mockReturnValue({ top: -1 });
    var scrollIntoViewSpy = jest.fn();
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;

    wrapper.instance().componentDidMount();

    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });
  it('should NOT strip out HTML tags if given a React node', function () {
    var message = _react2.default.createElement('span', {
      dangerouslySetInnerHTML: { __html: '<b>Success!</b>' }
    });
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_global_message2.default, { type: 'success', message: message }));
    expect(wrapper.html()).toBe('<div class="auth0-global-message auth0-global-message-success"><span class="animated fadeInUp">' + '<span><b>Success!</b></span></span></div>');
  });
  it('should strip out HTML tags if given a string', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_global_message2.default, { type: 'success', message: '<b>Success!</b>' }));
    expect(wrapper.html()).toBe('<div class="auth0-global-message auth0-global-message-success"><span class="animated fadeInUp">' + '&lt;b&gt;Success!&lt;/b&gt;</span></div>');
  });
});
