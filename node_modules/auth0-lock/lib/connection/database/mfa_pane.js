'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mfa_code_pane = require('../../field/mfa-code/mfa_code_pane');

var _mfa_code_pane2 = _interopRequireDefault(_mfa_code_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MFAPane = function (_React$Component) {
  _inherits(MFAPane, _React$Component);

  function MFAPane() {
    _classCallCheck(this, MFAPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  MFAPane.prototype.render = function render() {
    var _props = this.props,
        mfaInputPlaceholder = _props.mfaInputPlaceholder,
        i18n = _props.i18n,
        instructions = _props.instructions,
        lock = _props.lock,
        title = _props.title;


    var headerText = instructions || null;
    var header = headerText && _react2.default.createElement(
      'p',
      null,
      headerText
    );

    var pane = _react2.default.createElement(_mfa_code_pane2.default, { i18n: i18n, lock: lock, placeholder: mfaInputPlaceholder });

    var titleElement = title && _react2.default.createElement(
      'h2',
      null,
      title
    );

    return _react2.default.createElement(
      'div',
      null,
      titleElement,
      header,
      pane
    );
  };

  return MFAPane;
}(_react2.default.Component);

exports.default = MFAPane;


MFAPane.propTypes = {
  mfaInputPlaceholder: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string.isRequired,
  i18n: _propTypes2.default.object.isRequired,
  instructions: _propTypes2.default.any,
  lock: _propTypes2.default.object.isRequired
};
