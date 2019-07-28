'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _username_pane = require('../../field/username/username_pane');

var _username_pane2 = _interopRequireDefault(_username_pane);

var _password_pane = require('../../field/password/password_pane');

var _password_pane2 = _interopRequireDefault(_password_pane);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HRDPane = function (_React$Component) {
  _inherits(HRDPane, _React$Component);

  function HRDPane() {
    _classCallCheck(this, HRDPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  HRDPane.prototype.render = function render() {
    var _props = this.props,
        header = _props.header,
        i18n = _props.i18n,
        model = _props.model,
        passwordInputPlaceholder = _props.passwordInputPlaceholder,
        usernameInputPlaceholder = _props.usernameInputPlaceholder;


    return _react2.default.createElement(
      'div',
      null,
      header,
      _react2.default.createElement(_username_pane2.default, {
        i18n: i18n,
        lock: model,
        placeholder: usernameInputPlaceholder,
        validateFormat: false
      }),
      _react2.default.createElement(_password_pane2.default, { i18n: i18n, lock: model, placeholder: passwordInputPlaceholder })
    );
  };

  return HRDPane;
}(_react2.default.Component);

exports.default = HRDPane;


HRDPane.propTypes = {
  header: _propTypes2.default.element,
  i18n: _propTypes2.default.object.isRequired,
  model: _propTypes2.default.object.isRequired,
  passwordInputPlaceholder: _propTypes2.default.string.isRequired,
  usernameInputPlaceholder: _propTypes2.default.string.isRequired
};
