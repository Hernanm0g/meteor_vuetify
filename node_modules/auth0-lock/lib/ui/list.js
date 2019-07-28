'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _button = require('./box/button');

var _text_input = require('./input/text_input');

var _text_input2 = _interopRequireDefault(_text_input);

var _media_utils = require('../utils/media_utils');

var _string_utils = require('../utils/string_utils');

var su = _interopRequireWildcard(_string_utils);

var _index = require('../core/index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cycle = function cycle(xs, x) {
  return xs.skipWhile(function (y) {
    return y !== x;
  }).get(1, xs.get(0));
};

var FiltrableList = function (_React$Component) {
  _inherits(FiltrableList, _React$Component);

  function FiltrableList(props) {
    _classCallCheck(this, FiltrableList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { filteredItems: props.items, highlighted: props.defaultItem };
    return _this;
  }

  FiltrableList.prototype.filter = function filter(str) {
    var filteredItems = this.props.items.filter(function (x) {
      return su.matches(str, x.get('label'));
    });

    var highlighted = filteredItems.size === 1 && filteredItems.get(0) || filteredItems.includes(this.state.highlighted) && this.state.highlighted || null;

    return {
      filteredItems: filteredItems,
      highlighted: highlighted
    };
  };

  FiltrableList.prototype.select = function select(x) {
    this.props.onSelect(x);
  };

  FiltrableList.prototype.handleChange = function handleChange(e) {
    this.setState(this.filter(e.target.value));
  };

  FiltrableList.prototype.handleKeyDown = function handleKeyDown(e) {
    var _state = this.state,
        filteredItems = _state.filteredItems,
        highlighted = _state.highlighted;


    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.setState({ highlighted: cycle(filteredItems, highlighted) });
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.setState({ highlighted: cycle(filteredItems.reverse(), highlighted) });
        break;
      case 'Enter':
        e.preventDefault();
        highlighted && this.select(highlighted);
        break;
      case 'Escape':
        e.preventDefault();
        this.props.onCancel();
      default:
      // no-op
    }
  };

  FiltrableList.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        icon = _props.icon,
        iconUrl = _props.iconUrl,
        onCancel = _props.onCancel,
        model = _props.model;

    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-select-country' },
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-search' },
        _react2.default.createElement(_button.BackButton, { lockId: l.id(model), onClick: onCancel }),
        _react2.default.createElement(_text_input2.default, {
          lockId: l.id(model),
          name: 'search',
          icon: icon,
          iconUrl: iconUrl,
          isValid: true,
          onChange: this.handleChange.bind(this),
          onKeyDown: this.handleKeyDown.bind(this)
        })
      ),
      _react2.default.createElement(List, {
        highlighted: this.state.highlighted,
        items: this.state.filteredItems,
        onClick: this.select.bind(this),
        onMouseMove: function onMouseMove(x) {
          return _this2.setState({ highlighted: x });
        }
      })
    );
  };

  return FiltrableList;
}(_react2.default.Component);

exports.default = FiltrableList;

var List = function (_React$Component2) {
  _inherits(List, _React$Component2);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  List.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this4 = this;

    // Ensure that highlighted item is entirely visible

    // NOTE: I've spent very little time on this. It works, but it
    // surely can be more clearly.

    var highlighted = this.refs.highlighted;


    if (highlighted) {
      var scrollableNode = _reactDom2.default.findDOMNode(this);
      var highlightedNode = _reactDom2.default.findDOMNode(highlighted);
      var relativeOffsetTop = highlightedNode.offsetTop - scrollableNode.scrollTop;
      var scrollTopDelta = 0;
      if (relativeOffsetTop + highlightedNode.offsetHeight > scrollableNode.clientHeight) {
        scrollTopDelta = relativeOffsetTop + highlightedNode.offsetHeight - scrollableNode.clientHeight;
      } else if (relativeOffsetTop < 0) {
        scrollTopDelta = relativeOffsetTop;
      }

      if (scrollTopDelta) {
        this.preventHighlight = true;
        scrollableNode.scrollTop += scrollTopDelta;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          return _this4.preventHighlight = false;
        }, 100);
      }
    }
  };

  List.prototype.mouseMoveHandler = function mouseMoveHandler(x) {
    // TODO: This is an ugly hack to avoid highlighting the element under the
    // mouse when an arrow key trigger a scroll of the list (which in turn
    // triggers a mousemove event).
    !this.preventHighlight && this.props.onMouseMove(x);
  };

  List.prototype.mouseLeaveHandler = function mouseLeaveHandler() {
    // TODO: clear highlighted?
  };

  List.prototype.render = function render() {
    var _this5 = this;

    var items = this.props.items.map(function (x) {
      var highlighted = x === _this5.props.highlighted;

      var props = {
        highlighted: highlighted,
        label: x.get('label'),
        onClick: function onClick() {
          return _this5.props.onClick(x);
        },
        onMouseMove: function onMouseMove() {
          return _this5.mouseMoveHandler(x);
        }
      };

      if (highlighted) props.ref = 'highlighted';

      return _react2.default.createElement(Item, _extends({ key: x.get('label') }, props));
    });

    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-list-code', onMouseLeave: this.mouseLeaveHandler.bind(this) },
      _react2.default.createElement(
        'ul',
        null,
        items
      )
    );
  };

  return List;
}(_react2.default.Component);

var Item = function (_React$Component3) {
  _inherits(Item, _React$Component3);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Item.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.highlighted != nextProps.highlighted;
  };

  Item.prototype.render = function render() {
    var _props2 = this.props,
        highlighted = _props2.highlighted,
        label = _props2.label,
        onClick = _props2.onClick,
        onMouseMove = _props2.onMouseMove;

    var className = highlighted ? 'auth0-lock-list-code-highlighted' : '';

    return _react2.default.createElement(
      'li',
      { className: className, onClick: onClick, onMouseMove: onMouseMove },
      label
    );
  };

  return Item;
}(_react2.default.Component);

Item.propTypes = {
  highlighted: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  onMouseMove: _propTypes2.default.func.isRequired
};
