'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vcode_input = require('../../ui/input/vcode_input');

var _vcode_input2 = _interopRequireDefault(_vcode_input);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../index');

var c = _interopRequireWildcard(_index2);

var _media_utils = require('../../utils/media_utils');

var _index3 = require('../../store/index');

var _vcode = require('../vcode');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VcodePane = function (_React$Component) {
  _inherits(VcodePane, _React$Component);

  function VcodePane() {
    _classCallCheck(this, VcodePane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  VcodePane.prototype.handleVcodeChange = function handleVcodeChange(e) {
    e.preventDefault();
    (0, _index3.swap)(_index3.updateEntity, 'lock', l.id(this.props.lock), _vcode.setVcode, e.target.value);
  };

  VcodePane.prototype.handleResendClick = function handleResendClick(e) {
    e.preventDefault();
    var _props = this.props,
        lock = _props.lock,
        onRestart = _props.onRestart;

    onRestart(l.id(lock));
  };

  VcodePane.prototype.render = function render() {
    var _props2 = this.props,
        instructions = _props2.instructions,
        lock = _props2.lock,
        placeholder = _props2.placeholder,
        resendLabel = _props2.resendLabel;

    var headerText = instructions || null;
    var header = headerText && _react2.default.createElement(
      'p',
      null,
      headerText
    );

    return _react2.default.createElement(
      'div',
      null,
      header,
      _react2.default.createElement(_vcode_input2.default, {
        lockId: l.id(lock),
        value: c.vcode(lock),
        isValid: !c.isFieldVisiblyInvalid(lock, 'vcode') && !l.globalError(lock),
        onChange: this.handleVcodeChange.bind(this),
        autoFocus: !(0, _media_utils.isSmallScreen)(),
        placeholder: placeholder,
        disabled: l.submitting(lock)
      }),
      _react2.default.createElement(
        'p',
        { className: 'auth0-lock-alternative' },
        _react2.default.createElement(
          'a',
          {
            className: 'auth0-lock-alternative-link',
            href: 'javascript:void(0)',
            onClick: this.handleResendClick.bind(this)
          },
          resendLabel
        )
      )
    );
  };

  return VcodePane;
}(_react2.default.Component);

exports.default = VcodePane;


VcodePane.propTypes = {
  instructions: _propTypes2.default.element,
  lock: _propTypes2.default.object.isRequired,
  placeholder: _propTypes2.default.string.isRequired,
  resendLabel: _propTypes2.default.string.isRequired,
  onRestart: _propTypes2.default.func.isRequired
};
