'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _actions = require('./actions');

var _index = require('./index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingScreen = function (_Screen) {
  _inherits(LoadingScreen, _Screen);

  function LoadingScreen() {
    _classCallCheck(this, LoadingScreen);

    return _possibleConstructorReturn(this, _Screen.call(this, 'loading'));
  }

  LoadingScreen.prototype.render = function render() {
    return LoadingPane;
  };

  return LoadingScreen;
}(_screen2.default);

exports.default = LoadingScreen;

var LoadingPane = function (_React$Component) {
  _inherits(LoadingPane, _React$Component);

  function LoadingPane() {
    _classCallCheck(this, LoadingPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  LoadingPane.prototype.componentDidMount = function componentDidMount() {
    var model = this.props.model;

    (0, _actions.pinLoadingPane)(l.id(model));
    setTimeout(function () {
      return (0, _actions.unpinLoadingPane)(l.id(model));
    }, 500);
  };

  LoadingPane.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'auth0-loading-screen' },
      _react2.default.createElement(
        'div',
        { className: 'auth0-loading-container' },
        _react2.default.createElement('div', { className: 'auth0-loading' })
      )
    );
  };

  return LoadingPane;
}(_react2.default.Component);

LoadingPane.propTypes = {
  model: _propTypes2.default.object.isRequired
};
