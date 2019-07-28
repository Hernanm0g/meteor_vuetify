'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/list', function () {
  return (0, _testUtils.mockComponent)('list');
});

var getComponent = function getComponent() {
  return require('field/option_selection_pane').default;
};

describe('OptionSelectionPane', function () {
  var defaultProps = {
    iconUrl: 'iconUrl',
    icon: 'icon',
    items: 'items',
    name: 'option_selection_pane',
    model: {
      get: function get() {
        return 'id';
      }
    }
  };

  beforeEach(function () {
    jest.resetModules();

    jest.mock('field/actions', function () {
      return {
        cancelOptionSelection: jest.fn(),
        selectOption: jest.fn()
      };
    });
  });
  it('renders correctly', function () {
    var OptionSelectionPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(OptionSelectionPane, defaultProps)).toMatchSnapshot();
  });
  it('calls `selectOption` when selected', function () {
    var OptionSelectionPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(OptionSelectionPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);

    props.onSelect('selected');

    var mock = require('field/actions').selectOption.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  it('calls `cancelOptionSelection` when cancelled', function () {
    var OptionSelectionPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(OptionSelectionPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);

    props.onCancel();

    var mock = require('field/actions').cancelOptionSelection.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
