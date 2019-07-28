'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _username_input = require('../../ui/input/username_input');

var _username_input2 = _interopRequireDefault(_username_input);

var _index = require('../index');

var c = _interopRequireWildcard(_index);

var _index2 = require('../../store/index');

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _username = require('../username');

var _avatar = require('../../avatar');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsernamePane = function (_React$Component) {
  _inherits(UsernamePane, _React$Component);

  function UsernamePane() {
    _classCallCheck(this, UsernamePane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  UsernamePane.prototype.componentDidMount = function componentDidMount() {
    var lock = this.props.lock;

    if (l.ui.avatar(lock) && c.username(lock)) {
      (0, _avatar.requestAvatar)(l.id(lock), c.username(lock));
    }
  };

  UsernamePane.prototype.handleChange = function handleChange(e) {
    var _props = this.props,
        lock = _props.lock,
        validateFormat = _props.validateFormat,
        usernameStyle = _props.usernameStyle;

    if (l.ui.avatar(lock)) {
      (0, _avatar.debouncedRequestAvatar)(l.id(lock), e.target.value);
    }

    (0, _index2.swap)(_index2.updateEntity, 'lock', l.id(lock), _username.setUsername, e.target.value, usernameStyle, validateFormat);
  };

  UsernamePane.prototype.render = function render() {
    var _props2 = this.props,
        i18n = _props2.i18n,
        lock = _props2.lock,
        placeholder = _props2.placeholder,
        validateFormat = _props2.validateFormat;

    var allowAutocomplete = l.ui.allowAutocomplete(lock);
    var value = c.getFieldValue(lock, 'username');
    var usernameValidation = validateFormat ? (0, _username.getUsernameValidation)(lock) : {};

    var invalidHintKey = function invalidHintKey(str) {
      if (!str) return 'blankErrorHint';
      if ((0, _username.usernameLooksLikeEmail)(str) || !validateFormat) return 'invalidErrorHint';
      return 'usernameFormatErrorHint';
    };

    var invalidHint = function invalidHint(str) {
      var hintKey = invalidHintKey(str);

      // only show format info in the error if it should validate the format and
      // if there is any format restrictions for the connection
      if ('usernameFormatErrorHint' === hintKey && validateFormat && usernameValidation != null) {
        return i18n.str(hintKey, usernameValidation.min, usernameValidation.max);
      }

      return i18n.str(hintKey);
    };

    return _react2.default.createElement(_username_input2.default, {
      value: value,
      invalidHint: invalidHint(value),
      isValid: !c.isFieldVisiblyInvalid(lock, 'username'),
      onChange: this.handleChange.bind(this),
      placeholder: placeholder,
      autoComplete: allowAutocomplete
    });
  };

  return UsernamePane;
}(_react2.default.Component);

exports.default = UsernamePane;


UsernamePane.propTypes = {
  i18n: _propTypes2.default.object.isRequired,
  lock: _propTypes2.default.object.isRequired,
  placeholder: _propTypes2.default.string.isRequired,
  validateFormat: _propTypes2.default.bool.isRequired,
  usernameStyle: _propTypes2.default.oneOf(['any', 'email', 'username'])
};

UsernamePane.defaultProps = {
  validateFormat: false,
  usernameStyle: 'username'
};
