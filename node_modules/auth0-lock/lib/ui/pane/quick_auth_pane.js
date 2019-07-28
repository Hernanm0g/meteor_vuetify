'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auth_button = require('../button/auth_button');

var _auth_button2 = _interopRequireDefault(_auth_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickAuthPane = function QuickAuthPane(props) {
  var alternativeLabel = props.alternativeLabel,
      alternativeClickHandler = props.alternativeClickHandler,
      buttonLabel = props.buttonLabel,
      buttonClickHandler = props.buttonClickHandler,
      header = props.header,
      strategy = props.strategy,
      buttonIcon = props.buttonIcon,
      primaryColor = props.primaryColor,
      foregroundColor = props.foregroundColor;


  var alternative = alternativeLabel ? _react2.default.createElement(
    'p',
    { className: 'auth0-lock-alternative' },
    _react2.default.createElement(
      'a',
      {
        className: 'auth0-lock-alternative-link',
        href: 'javascript:void(0)',
        onClick: function onClick(e) {
          e.preventDefault();
          alternativeClickHandler(e);
        }
      },
      alternativeLabel
    )
  ) : null;

  return _react2.default.createElement(
    'div',
    { className: 'auth0-lock-last-login-pane' },
    header,
    _react2.default.createElement(_auth_button2.default, {
      label: buttonLabel,
      onClick: function onClick(e) {
        e.preventDefault();
        buttonClickHandler(e);
      },
      strategy: strategy,
      primaryColor: primaryColor,
      foregroundColor: foregroundColor,
      icon: buttonIcon
    }),
    alternative,
    _react2.default.createElement(
      'div',
      { className: 'auth0-loading-container' },
      _react2.default.createElement('div', { className: 'auth0-loading' })
    )
  );
};

QuickAuthPane.propTypes = {
  alternativeLabel: _propTypes2.default.string,
  alternativeClickHandler: function alternativeClickHandler(props, propName, component) {
    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    if (props.alternativeLabel !== undefined) {
      var _PropTypes$func;

      return (_PropTypes$func = _propTypes2.default.func).isRequired.apply(_PropTypes$func, [props, propName, component].concat(rest));
    }
  },
  buttonLabel: _propTypes2.default.string.isRequired,
  buttonClickHandler: _propTypes2.default.func.isRequired,
  header: _propTypes2.default.element,
  strategy: _propTypes2.default.string.isRequired
};

exports.default = QuickAuthPane;
