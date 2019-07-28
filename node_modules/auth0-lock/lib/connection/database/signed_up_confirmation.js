'use strict';

exports.__esModule = true;
exports.renderSignedUpConfirmation = renderSignedUpConfirmation;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _success_pane = require('../../ui/box/success_pane');

var _success_pane2 = _interopRequireDefault(_success_pane);

var _actions = require('../../core/actions');

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('./index');

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: can't we get this from props?

var SignedUpConfirmation = function (_React$Component) {
  _inherits(SignedUpConfirmation, _React$Component);

  function SignedUpConfirmation() {
    _classCallCheck(this, SignedUpConfirmation);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SignedUpConfirmation.prototype.handleClose = function handleClose() {
    var _props = this.props,
        closeHandler = _props.closeHandler,
        lock = _props.lock;

    closeHandler(l.id(lock));
  };

  SignedUpConfirmation.prototype.render = function render() {
    var lock = this.props.lock;

    var closeHandler = l.ui.closable(lock) ? this.handleClose.bind(this) : undefined;

    return _react2.default.createElement(
      _success_pane2.default,
      { lock: lock, closeHandler: closeHandler },
      _react2.default.createElement(
        'p',
        null,
        i18n.html(lock, ['success', 'signUp'])
      )
    );
  };

  return SignedUpConfirmation;
}(_react2.default.Component);

exports.default = SignedUpConfirmation;


SignedUpConfirmation.propTypes = {
  closeHandler: _propTypes2.default.func.isRequired,
  lock: _propTypes2.default.object.isRequired
};

function renderSignedUpConfirmation(m) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  props.closeHandler = _actions.closeLock;
  props.key = 'auxiliarypane';
  props.lock = m;

  return m.get('signedUp') && !(0, _index2.shouldAutoLogin)(m) ? _react2.default.createElement(SignedUpConfirmation, props) : null;
}
