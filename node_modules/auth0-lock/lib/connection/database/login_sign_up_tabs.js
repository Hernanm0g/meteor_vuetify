'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./actions');

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('./index');

var _actions2 = require('../../core/actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginSignUpTabs = function (_React$Component) {
  _inherits(LoginSignUpTabs, _React$Component);

  function LoginSignUpTabs() {
    _classCallCheck(this, LoginSignUpTabs);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  LoginSignUpTabs.prototype.render = function render() {
    var _props = this.props,
        lock = _props.lock,
        loginLabel = _props.loginLabel,
        signUpLink = _props.signUpLink,
        signUpLabel = _props.signUpLabel;

    var isLogin = (0, _index2.getScreen)(lock) === 'login';

    return _react2.default.createElement(
      'div',
      { role: 'navigation', className: 'auth0-lock-tabs-container' },
      _react2.default.createElement(
        'ul',
        { className: 'auth0-lock-tabs' },
        _react2.default.createElement(LoginSignUpTab, {
          label: loginLabel,
          current: isLogin,
          clickHandler: this.handleLoginClick.bind(this)
        }),
        _react2.default.createElement(LoginSignUpTab, {
          label: signUpLabel,
          current: !isLogin,
          clickHandler: this.handleSignUpClick.bind(this),
          clickWithHrefHandler: this.handleSignUpWithHrefClick.bind(this),
          href: signUpLink
        })
      )
    );
  };

  LoginSignUpTabs.prototype.handleLoginClick = function handleLoginClick() {
    (0, _actions.showLoginActivity)(l.id(this.props.lock));
  };

  LoginSignUpTabs.prototype.handleSignUpClick = function handleSignUpClick() {
    if (this.props.signUpLink) {
      (0, _actions2.closeLock)(l.id(this.props.lock), true);
    }
    (0, _actions.showSignUpActivity)(l.id(this.props.lock));
  };

  LoginSignUpTabs.prototype.handleSignUpWithHrefClick = function handleSignUpWithHrefClick() {
    (0, _actions2.closeLock)(l.id(this.props.lock), true);
  };

  return LoginSignUpTabs;
}(_react2.default.Component);

exports.default = LoginSignUpTabs;


LoginSignUpTabs.propTypes = {
  lock: _propTypes2.default.object.isRequired,
  loginLabel: _propTypes2.default.string.isRequired,
  signUpLabel: _propTypes2.default.string.isRequired,
  signUpLink: _propTypes2.default.string
};

var LoginSignUpTab = function (_React$Component2) {
  _inherits(LoginSignUpTab, _React$Component2);

  function LoginSignUpTab() {
    _classCallCheck(this, LoginSignUpTab);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  LoginSignUpTab.prototype.handleClick = function handleClick(e) {
    if (this.props.href) {
      this.props.clickWithHrefHandler();
    } else {
      e.preventDefault();
      this.props.clickHandler();
    }
  };

  LoginSignUpTab.prototype.render = function render() {
    var _props2 = this.props,
        current = _props2.current,
        href = _props2.href,
        label = _props2.label;

    var className = current ? 'auth0-lock-tabs-current' : '';

    return _react2.default.createElement(
      'li',
      { className: className },
      current ? _react2.default.createElement(
        'span',
        null,
        label
      ) : _react2.default.createElement(
        'a',
        { href: href || 'javascript:void(0)', onClick: this.handleClick.bind(this) },
        label
      )
    );
  };

  return LoginSignUpTab;
}(_react2.default.Component);
