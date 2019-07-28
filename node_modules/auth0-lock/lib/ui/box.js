'use strict';

exports.__esModule = true;
exports.remove = exports.render = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSCore = require('../CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _container = require('./box/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContainerManager = function () {
  function ContainerManager() {
    _classCallCheck(this, ContainerManager);
  }

  ContainerManager.prototype.ensure = function ensure(id, shouldAppend) {
    var container = global.document.getElementById(id);

    if (!container && shouldAppend) {
      container = global.document.createElement('div');
      container.id = id;
      container.className = 'auth0-lock-container';
      global.document.body.appendChild(container);
    }

    if (!container) {
      throw new Error('Can\'t find element with id ' + id);
    }

    return container;
  };

  return ContainerManager;
}();

var Renderer = function () {
  function Renderer() {
    _classCallCheck(this, Renderer);

    this.containerManager = new ContainerManager();
    this.modals = {};
  }

  Renderer.prototype.render = function render(containerId, props) {
    var isModal = props.isModal;

    var container = this.containerManager.ensure(containerId, isModal);

    if (isModal && !this.modals[containerId]) {
      _CSSCore2.default.addClass(global.document.getElementsByTagName('html')[0], 'auth0-lock-html');
    }
    // eslint-disable-next-line
    var component = _reactDom2.default.render(_react2.default.createElement(_container2.default, props), container);

    if (isModal) {
      this.modals[containerId] = component;
    }

    return component;
  };

  Renderer.prototype.remove = function remove(containerId) {
    var _this = this;

    if (this.modals[containerId]) {
      this.modals[containerId].hide();
      setTimeout(function () {
        return _this.unmount(containerId);
      }, 1000);
    } else {
      this.unmount(containerId);
    }
  };

  Renderer.prototype.unmount = function unmount(containerId) {
    try {
      var container = this.containerManager.ensure(containerId);
      if (container) {
        _reactDom2.default.unmountComponentAtNode(container);
      }
    } catch (e) {
      // do nothing if container doesn't exist
    }

    if (this.modals[containerId]) {
      delete this.modals[containerId];

      _CSSCore2.default.removeClass(global.document.getElementsByTagName('html')[0], 'auth0-lock-html');
    }
  };

  return Renderer;
}();

var renderer = new Renderer();

var render = exports.render = function render() {
  return renderer.render.apply(renderer, arguments);
};
var remove = exports.remove = function remove() {
  return renderer.remove.apply(renderer, arguments);
};
