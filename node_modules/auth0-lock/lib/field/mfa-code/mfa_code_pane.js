'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mfa_code_input = require('../../ui/input/mfa_code_input');

var _mfa_code_input2 = _interopRequireDefault(_mfa_code_input);

var _index = require('../index');

var c = _interopRequireWildcard(_index);

var _index2 = require('../../store/index');

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _mfa_code = require('../mfa_code');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MFACodePane = function (_React$Component) {
  _inherits(MFACodePane, _React$Component);

  function MFACodePane() {
    _classCallCheck(this, MFACodePane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  MFACodePane.prototype.handleChange = function handleChange(e) {
    var lock = this.props.lock;

    (0, _index2.swap)(_index2.updateEntity, 'lock', l.id(lock), _mfa_code.setMFACode, e.target.value);
  };

  MFACodePane.prototype.render = function render() {
    var _props = this.props,
        i18n = _props.i18n,
        lock = _props.lock,
        placeholder = _props.placeholder;


    return _react2.default.createElement(_mfa_code_input2.default, {
      lockId: l.id(lock),
      value: c.getFieldValue(lock, 'mfa_code'),
      invalidHint: i18n.str('mfaCodeErrorHint', (0, _mfa_code.getMFACodeValidation)().length),
      isValid: !c.isFieldVisiblyInvalid(lock, 'mfa_code'),
      onChange: this.handleChange.bind(this),
      placeholder: placeholder
    });
  };

  return MFACodePane;
}(_react2.default.Component);

exports.default = MFACodePane;


MFACodePane.propTypes = {
  i18n: _propTypes2.default.object.isRequired,
  lock: _propTypes2.default.object.isRequired,
  placeholder: _propTypes2.default.string.isRequired
};
