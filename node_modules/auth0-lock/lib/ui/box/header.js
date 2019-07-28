'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: simplify this mess :)

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    var _props = this.props,
        backHandler = _props.backHandler,
        backgroundColor = _props.backgroundColor,
        backgroundUrl = _props.backgroundUrl,
        logoUrl = _props.logoUrl,
        name = _props.name,
        title = _props.title;


    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-header' },
      backHandler && _react2.default.createElement(_button.BackButton, { onClick: backHandler }),
      _react2.default.createElement(Background, { imageUrl: backgroundUrl, backgroundColor: backgroundColor, grayScale: !!name }),
      _react2.default.createElement(Welcome, { title: title, name: name, imageUrl: name ? undefined : logoUrl })
    );
  };

  return Header;
}(_react2.default.Component);

exports.default = Header;


Header.propTypes = {
  backgroundUrl: _propTypes2.default.string,
  logoUrl: _propTypes2.default.string,
  name: _propTypes2.default.string
};

var Welcome = function (_React$Component2) {
  _inherits(Welcome, _React$Component2);

  function Welcome() {
    _classCallCheck(this, Welcome);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Welcome.prototype.render = function render() {
    var _props2 = this.props,
        name = _props2.name,
        imageUrl = _props2.imageUrl,
        title = _props2.title;

    var imgClassName = !!title ? 'auth0-lock-header-logo' : 'auth0-lock-header-logo centered';
    var img = _react2.default.createElement('img', { alt: '', className: imgClassName, src: imageUrl });
    var welcome = title ? _react2.default.createElement(WelcomeMessage, { title: title, name: name }) : null;

    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-header-welcome' },
      imageUrl && img,
      welcome
    );
  };

  return Welcome;
}(_react2.default.Component);

Welcome.propTypes = {
  imageUrl: _propTypes2.default.string,
  name: _propTypes2.default.string
};

var WelcomeMessage = function (_React$Component3) {
  _inherits(WelcomeMessage, _React$Component3);

  function WelcomeMessage() {
    _classCallCheck(this, WelcomeMessage);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  WelcomeMessage.prototype.render = function render() {
    var _props3 = this.props,
        name = _props3.name,
        title = _props3.title;

    var className = void 0,
        message = void 0;

    if (name) {
      className = 'auth0-lock-firstname';
      message = name;
    } else {
      className = 'auth0-lock-name';
      message = title;
    }

    return _react2.default.createElement(
      'div',
      { className: className, title: message },
      message
    );
  };

  return WelcomeMessage;
}(_react2.default.Component);

WelcomeMessage.propTypes = {
  name: _propTypes2.default.string
};

var cssBlurSupport = function () {
  // Check stolen from Modernizr, see https://github.com/Modernizr/Modernizr/blob/29eab707f7a2fb261c8a9c538370e97eb1f86e25/feature-detects/css/filters.js
  var isEdge = global.navigator && !!global.navigator.userAgent.match(/Edge/i);
  if (typeof global.document === 'undefined' || isEdge) return false;

  var el = global.document.createElement('div');
  el.style.cssText = 'filter: blur(2px); -webkit-filter: blur(2px)';
  return !!el.style.length && (global.document.documentMode === undefined || global.document.documentMode > 9);
}();

var Background = function (_React$Component4) {
  _inherits(Background, _React$Component4);

  function Background() {
    _classCallCheck(this, Background);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Background.prototype.render = function render() {
    var _props4 = this.props,
        backgroundColor = _props4.backgroundColor,
        imageUrl = _props4.imageUrl,
        grayScale = _props4.grayScale;


    var props = {
      className: 'auth0-lock-header-bg'
    };

    if (cssBlurSupport) {
      props.className += ' auth0-lock-blur-support';
    }

    var blurProps = {
      className: 'auth0-lock-header-bg-blur',
      style: { backgroundImage: 'url(\'' + imageUrl + '\')' }
    };

    if (grayScale) {
      blurProps.className += ' auth0-lock-no-grayscale';
    }

    var solidProps = {
      className: 'auth0-lock-header-bg-solid',
      style: { backgroundColor: backgroundColor }
    };

    return _react2.default.createElement(
      'div',
      props,
      _react2.default.createElement('div', blurProps),
      _react2.default.createElement('div', solidProps)
    );
  };

  return Background;
}(_react2.default.Component);

Background.propTypes = {
  backgorundColor: _propTypes2.default.string,
  grayScale: _propTypes2.default.bool,
  imageUrl: _propTypes2.default.string
};
