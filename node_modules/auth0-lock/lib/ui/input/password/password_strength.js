'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _policy = require('password-sheriff/lib/policy');

var _policy2 = _interopRequireDefault(_policy);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordStrength = function (_React$Component) {
  _inherits(PasswordStrength, _React$Component);

  function PasswordStrength() {
    _classCallCheck(this, PasswordStrength);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PasswordStrength.prototype.render = function render() {
    var _props = this.props,
        password = _props.password,
        policy = _props.policy,
        messages = _props.messages;

    var analysis = new _policy2.default(policy.toJS()).missing(password);
    // TODO: add a component for fadeIn / fadeOut animations?
    var className = 'auth0-lock-password-strength animated ' + (!analysis.verified ? 'fadeIn' : 'fadeOut');

    var prepareMessage = function prepareMessage(items) {
      items && items.forEach(function (o) {
        if (messages[o.code]) {
          o.message = messages[o.code];
        }

        o.message = _util2.default.format.apply(_util2.default, [o.message].concat(o.format || []));

        if (o.items) {
          prepareMessage(o.items);
        }
      });
    };

    prepareMessage(analysis.rules);

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(List, { items: analysis.rules })
    );
  };

  return PasswordStrength;
}(_react2.default.Component);

exports.default = PasswordStrength;


PasswordStrength.propTypes = {
  messages: _propTypes2.default.object.isRequired,
  password: _propTypes2.default.string.isRequired,
  policy: _propTypes2.default.object.isRequired
};

PasswordStrength.defaultProps = {
  messages: {}
};

var List = function (_React$Component2) {
  _inherits(List, _React$Component2);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  List.prototype.render = function render() {
    var items = this.props.items;


    return items && items.length ? _react2.default.createElement(
      'ul',
      null,
      items.map(function (x, i) {
        return _react2.default.createElement(Item, _extends({}, x, { key: i }));
      })
    ) : null;
  };

  return List;
}(_react2.default.Component);

List.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

var Item = function (_React$Component3) {
  _inherits(Item, _React$Component3);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Item.prototype.render = function render() {
    var _props2 = this.props,
        items = _props2.items,
        message = _props2.message,
        verified = _props2.verified;

    var className = verified ? 'auth0-lock-checked' : '';

    return _react2.default.createElement(
      'li',
      { className: className },
      _react2.default.createElement(
        'span',
        null,
        message
      ),
      _react2.default.createElement(List, { items: items })
    );
  };

  return Item;
}(_react2.default.Component);

Item.propTypes = {
  items: _propTypes2.default.array,
  message: _propTypes2.default.string.isRequired,
  verified: _propTypes2.default.bool.isRequired
};
