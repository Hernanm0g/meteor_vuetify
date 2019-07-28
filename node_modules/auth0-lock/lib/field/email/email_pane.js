'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _email_input = require('../../ui/input/email_input');

var _email_input2 = _interopRequireDefault(_email_input);

var _index = require('../index');

var c = _interopRequireWildcard(_index);

var _index2 = require('../../store/index');

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _email = require('../email');

var _avatar = require('../../avatar');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailPane = function (_React$Component) {
  _inherits(EmailPane, _React$Component);

  function EmailPane() {
    _classCallCheck(this, EmailPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  EmailPane.prototype.componentDidMount = function componentDidMount() {
    var lock = this.props.lock;

    if (l.ui.avatar(lock) && c.email(lock)) {
      (0, _avatar.requestAvatar)(l.id(lock), c.email(lock));
    }
  };

  EmailPane.prototype.handleChange = function handleChange(e) {
    var lock = this.props.lock;

    if (l.ui.avatar(lock)) {
      (0, _avatar.debouncedRequestAvatar)(l.id(lock), e.target.value);
    }

    (0, _index2.swap)(_index2.updateEntity, 'lock', l.id(lock), _email.setEmail, e.target.value);
  };

  EmailPane.prototype.render = function render() {
    var _props = this.props,
        i18n = _props.i18n,
        lock = _props.lock,
        placeholder = _props.placeholder,
        _props$forceInvalidVi = _props.forceInvalidVisibility,
        forceInvalidVisibility = _props$forceInvalidVi === undefined ? false : _props$forceInvalidVi;

    var allowAutocomplete = l.ui.allowAutocomplete(lock);

    var field = c.getField(lock, 'email');
    var value = field.get('value', '');
    var valid = field.get('valid', true);
    var invalidHint = field.get('invalidHint') || i18n.str(value ? 'invalidErrorHint' : 'blankErrorHint');

    var isValid = (!forceInvalidVisibility || valid) && !c.isFieldVisiblyInvalid(lock, 'email');

    return _react2.default.createElement(_email_input2.default, {
      lockId: l.id(lock),
      value: value,
      invalidHint: invalidHint,
      isValid: isValid,
      onChange: this.handleChange.bind(this),
      placeholder: placeholder,
      autoComplete: allowAutocomplete
    });
  };

  return EmailPane;
}(_react2.default.Component);

exports.default = EmailPane;


EmailPane.propTypes = {
  i18n: _propTypes2.default.object.isRequired,
  lock: _propTypes2.default.object.isRequired,
  placeholder: _propTypes2.default.string.isRequired
};
