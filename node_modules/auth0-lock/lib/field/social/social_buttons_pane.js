'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auth_button = require('../../ui/button/auth_button');

var _auth_button2 = _interopRequireDefault(_auth_button);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _actions = require('../../quick-auth/actions');

var _index2 = require('../../connection/social/index');

var _event = require('./event');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialButtonsPane = function (_React$Component) {
  _inherits(SocialButtonsPane, _React$Component);

  function SocialButtonsPane() {
    _classCallCheck(this, SocialButtonsPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SocialButtonsPane.prototype.handleSubmit = function handleSubmit(provider, isSignUp) {
    (0, _event.emitFederatedLoginEvent)(this.props.lock, provider, isSignUp);
    return (0, _actions.logIn)(l.id(this.props.lock), provider);
  };

  SocialButtonsPane.prototype.render = function render() {
    var _this2 = this;

    // TODO: i don't like that it receives the instructions tanslated
    // but it also takes the t fn
    var _props = this.props,
        instructions = _props.instructions,
        labelFn = _props.labelFn,
        lock = _props.lock,
        showLoading = _props.showLoading,
        signUp = _props.signUp,
        disabled = _props.disabled;


    var headerText = instructions || null;
    var header = headerText && _react2.default.createElement(
      'p',
      null,
      headerText
    );

    var themes = (0, _index2.authButtonsTheme)(lock);

    var buttons = (0, _index2.socialConnections)(lock).map(function (x) {
      var buttonTheme = themes.get(x.get('name'));
      var connectionName = buttonTheme && buttonTheme.get('displayName');
      var primaryColor = buttonTheme && buttonTheme.get('primaryColor');
      var foregroundColor = buttonTheme && buttonTheme.get('foregroundColor');
      var icon = buttonTheme && buttonTheme.get('icon');

      return _react2.default.createElement(_auth_button2.default, {
        key: x.get('name'),
        label: labelFn(signUp ? 'signUpWithLabel' : 'loginWithLabel', connectionName || (0, _index2.displayName)(x)),
        onClick: function onClick() {
          return _this2.handleSubmit(x, signUp);
        },
        strategy: x.get('strategy'),
        primaryColor: primaryColor,
        foregroundColor: foregroundColor,
        icon: icon,
        disabled: disabled
      });
    });

    var loading = showLoading && _react2.default.createElement(
      'div',
      { className: 'auth0-loading-container' },
      _react2.default.createElement('div', { className: 'auth0-loading' })
    );

    return _react2.default.createElement(
      'div',
      { className: 'auth-lock-social-buttons-pane' },
      header,
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-social-buttons-container' },
        buttons
      ),
      loading
    );
  };

  return SocialButtonsPane;
}(_react2.default.Component);

exports.default = SocialButtonsPane;


SocialButtonsPane.propTypes = {
  instructions: _propTypes2.default.any,
  labelFn: _propTypes2.default.func.isRequired,
  lock: _propTypes2.default.object.isRequired,
  showLoading: _propTypes2.default.bool.isRequired,
  signUp: _propTypes2.default.bool.isRequired,
  disabled: _propTypes2.default.bool
};

SocialButtonsPane.defaultProps = {
  showLoading: false,
  disabled: false
};
