'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobalMessage = function (_React$Component) {
  _inherits(GlobalMessage, _React$Component);

  function GlobalMessage() {
    _classCallCheck(this, GlobalMessage);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  GlobalMessage.prototype.componentDidMount = function componentDidMount() {
    var methodIsSupported = this.messageNode && typeof this.messageNode.scrollIntoView === 'function';
    if (methodIsSupported && this.props.scrollIntoView) {
      var boundingRect = this.messageNode.getBoundingClientRect();
      if (boundingRect.top < 0) {
        this.messageNode.scrollIntoView(true);
      }
    }
  };

  GlobalMessage.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        message = _props.message,
        type = _props.type;

    var className = 'auth0-global-message auth0-global-message-' + type;
    return _react2.default.createElement(
      'div',
      {
        className: className,
        ref: function ref(messageNode) {
          _this2.messageNode = messageNode;
        }
      },
      _react2.default.createElement(
        'span',
        { className: 'animated fadeInUp' },
        message
      )
    );
  };

  return GlobalMessage;
}(_react2.default.Component);

exports.default = GlobalMessage;


GlobalMessage.propTypes = {
  message: _propTypes2.default.node.isRequired,
  type: _propTypes2.default.oneOf(['error', 'success', 'info']).isRequired,
  scrollIntoView: _propTypes2.default.bool
};

GlobalMessage.defaultProps = {
  scrollIntoView: true
};
