'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTransitionGroup = require('react-transition-group');

var _multisize_slide = require('./multisize_slide');

var _multisize_slide2 = _interopRequireDefault(_multisize_slide);

var _global_message = require('./global_message');

var _global_message2 = _interopRequireDefault(_global_message);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var submitSvg = '<svg aria-hidden="true" focusable="false" width="43px" height="42px" viewBox="0 0 43 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Lock" sketch:type="MSArtboardGroup" transform="translate(-280.000000, -3592.000000)"><g id="SMS" sketch:type="MSLayerGroup" transform="translate(153.000000, 3207.000000)"><g id="Group" sketch:type="MSShapeGroup"><g id="Login" transform="translate(0.000000, 369.000000)"><g id="Btn"><g id="Oval-302-+-Shape" transform="translate(128.000000, 17.000000)"><circle id="Oval-302" stroke="#FFFFFF" stroke-width="2" cx="20.5" cy="20" r="20"></circle><path d="M17.8,15.4 L19.2,14 L25.2,20 L19.2,26 L17.8,24.6 L22.4,20 L17.8,15.4 Z" id="Shape" fill="#FFFFFF"></path></g></g></g></g></g></g></g></svg>';
var submitText = '<svg aria-hidden="true" focusable="false" class="icon-text" width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Web/Submit/Active" transform="translate(-148.000000, -32.000000)" fill="#FFFFFF"><polygon id="Shape" points="148 33.4 149.4 32 155.4 38 149.4 44 148 42.6 152.6 38"></polygon></g></g></svg>';

var SubmitButton = function (_React$Component) {
  _inherits(SubmitButton, _React$Component);

  function SubmitButton() {
    _classCallCheck(this, SubmitButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SubmitButton.prototype.handleSubmit = function handleSubmit() {
    var _props = this.props,
        label = _props.label,
        screenName = _props.screenName,
        contentProps = _props.contentProps;
    var model = contentProps.model;

    if (screenName === 'main.signUp') {
      l.emitEvent(model, 'signup submit');
    } else if (screenName === 'main.login') {
      l.emitEvent(model, 'signin submit');
    } else if (screenName === 'forgotPassword') {
      l.emitEvent(model, 'forgot_password submit');
    } else if (screenName === 'socialOrEmail') {
      l.emitEvent(model, 'socialOrEmail submit');
    } else if (screenName === 'socialOrPhoneNumber') {
      l.emitEvent(model, 'socialOrPhoneNumber submit');
    } else if (screenName === 'vcode') {
      l.emitEvent(model, 'vcode submit');
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(label, screenName);
    }
  };

  SubmitButton.prototype.focus = function focus() {
    _reactDom2.default.findDOMNode(this).focus();
  };

  SubmitButton.prototype.render = function render() {
    var _props2 = this.props,
        color = _props2.color,
        disabled = _props2.disabled,
        label = _props2.label,
        display = _props2.display;

    var content = label ? _react2.default.createElement(
      'span',
      { className: 'auth0-label-submit' },
      label,
      _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: submitText } })
    ) : _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: submitSvg } });

    return _react2.default.createElement(
      'button',
      {
        className: 'auth0-lock-submit',
        disabled: disabled,
        style: { backgroundColor: color, display: display },
        onClick: this.handleSubmit.bind(this),
        name: 'submit',
        type: 'submit',
        'aria-label': label ? label : 'Submit'
      },
      _react2.default.createElement(
        'div',
        { className: 'auth0-loading-container' },
        _react2.default.createElement('div', { className: 'auth0-loading' })
      ),
      content
    );
  };

  return SubmitButton;
}(_react2.default.Component);

SubmitButton.propTypes = {
  color: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  screenName: _propTypes2.default.string,
  onSubmit: _propTypes2.default.func,
  contentProps: _propTypes2.default.object
};

var MESSAGE_ANIMATION_DURATION = 250;
var AUXILIARY_ANIMATION_DURATION = 350;

var Chrome = function (_React$Component2) {
  _inherits(Chrome, _React$Component2);

  function Chrome(props) {
    _classCallCheck(this, Chrome);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = { moving: false, reverse: false };
    return _this2;
  }

  Chrome.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    var _props3 = this.props,
        auxiliaryPane = _props3.auxiliaryPane,
        showSubmitButton = _props3.showSubmitButton;
    var delayingShowSubmitButton = this.state.delayingShowSubmitButton;


    if (!showSubmitButton && nextProps.showSubmitButton && !delayingShowSubmitButton) {
      this.setState({ delayingShowSubmitButton: true });
    }

    if (!auxiliaryPane && nextProps.auxiliaryPane) {
      this.auxiliaryPaneTriggerInput = global.document.activeElement;
      this.setState({ moving: true });
    }

    if (auxiliaryPane && !nextProps.auxiliaryPane) {
      // TODO clear timeout
      setTimeout(function () {
        return _this3.setState({ moving: false });
      }, AUXILIARY_ANIMATION_DURATION + 50);
    }
  };

  Chrome.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this4 = this;

    var _props4 = this.props,
        autofocus = _props4.autofocus,
        auxiliaryPane = _props4.auxiliaryPane,
        error = _props4.error,
        screenName = _props4.screenName;


    if (!autofocus) return;

    if (auxiliaryPane && !prevProps.auxiliaryPane) {
      var input = this.findAutofocusInput(this.refs.auxiliary);

      if (input) {
        // TODO clear timeout
        setTimeout(function () {
          return input.focus();
        }, AUXILIARY_ANIMATION_DURATION);
      }

      return;
    }

    if (!auxiliaryPane && prevProps.auxiliaryPane) {
      if (this.auxiliaryPaneTriggerInput) {
        // TODO clear timeout
        setTimeout(function () {
          return _this4.auxiliaryPaneTriggerInput.focus();
        }, AUXILIARY_ANIMATION_DURATION);
      }

      return;
    }

    if (screenName !== prevProps.screenName) {
      var _input = this.findAutofocusInput();

      if (_input) {
        if (this.mainScreenName(prevProps.screenName) !== this.mainScreenName()) {
          this.inputToFocus = _input;
        } else {
          // TODO clear timeout
          setTimeout(function () {
            return _input.focus();
          }, 17);
        }
      }
    }
  };

  Chrome.prototype.onWillSlide = function onWillSlide() {
    this.setState({ moving: true });
    this.sliding = true;
  };

  Chrome.prototype.onDidSlide = function onDidSlide() {
    this.sliding = false;
    this.setState({ reverse: false });
  };

  Chrome.prototype.onDidAppear = function onDidAppear() {
    this.setState({ moving: false });
    if (this.state.delayingShowSubmitButton) {
      this.setState({ delayingShowSubmitButton: false });
    }

    if (this.inputToFocus) {
      this.inputToFocus.focus();
      delete this.inputToFocus;
    }
  };

  Chrome.prototype.mainScreenName = function mainScreenName(str) {
    return (str || this.props.screenName || '').split('.')[0];
  };

  Chrome.prototype.findAutofocusInput = function findAutofocusInput(ref) {
    return _reactDom2.default.findDOMNode(ref || this.refs.screen).querySelector('input');
  };

  Chrome.prototype.focusError = function focusError() {
    var node = _reactDom2.default.findDOMNode(this.refs.screen);
    // TODO: make the error input selector configurable via props.
    var error = node.querySelector('.auth0-lock-error input');

    if (error) {
      error.focus();
    }
  };

  Chrome.prototype.render = function render() {
    var _this5 = this;

    var _props5 = this.props,
        avatar = _props5.avatar,
        auxiliaryPane = _props5.auxiliaryPane,
        backHandler = _props5.backHandler,
        contentComponent = _props5.contentComponent,
        contentProps = _props5.contentProps,
        disableSubmitButton = _props5.disableSubmitButton,
        error = _props5.error,
        info = _props5.info,
        isSubmitting = _props5.isSubmitting,
        logo = _props5.logo,
        primaryColor = _props5.primaryColor,
        screenName = _props5.screenName,
        showSubmitButton = _props5.showSubmitButton,
        submitButtonLabel = _props5.submitButtonLabel,
        success = _props5.success,
        terms = _props5.terms,
        title = _props5.title,
        classNames = _props5.classNames,
        scrollGlobalMessagesIntoView = _props5.scrollGlobalMessagesIntoView;
    var _state = this.state,
        delayingShowSubmitButton = _state.delayingShowSubmitButton,
        moving = _state.moving,
        reverse = _state.reverse;


    var backgroundUrl = void 0,
        name = void 0;
    if (avatar) {
      backgroundUrl = avatar;
      name = title;
    } else {
      backgroundUrl = logo;
      name = '';
    }

    var shouldShowSubmitButton = showSubmitButton && !delayingShowSubmitButton;

    function wrapGlobalMessage(message) {
      return typeof message === 'string' ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: message } }) : message;
    }

    var globalError = error ? _react2.default.createElement(_global_message2.default, {
      key: 'global-error',
      message: wrapGlobalMessage(error),
      type: 'error',
      scrollIntoView: scrollGlobalMessagesIntoView
    }) : null;
    var globalSuccess = success ? _react2.default.createElement(_global_message2.default, {
      key: 'global-success',
      message: wrapGlobalMessage(success),
      type: 'success',
      scrollIntoView: scrollGlobalMessagesIntoView
    }) : null;
    var globalInfo = info ? _react2.default.createElement(_global_message2.default, {
      key: 'global-info',
      message: wrapGlobalMessage(info),
      type: 'info',
      scrollIntoView: scrollGlobalMessagesIntoView
    }) : null;

    var Content = contentComponent;

    var className = 'auth0-lock-cred-pane';
    var isQuiet = !moving && !delayingShowSubmitButton;
    className += isQuiet ? ' auth0-lock-quiet' : ' auth0-lock-moving';

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-cred-pane-internal-wrapper' },
        _react2.default.createElement(_header2.default, {
          title: title,
          name: name,
          backHandler: backHandler && this.handleBack.bind(this),
          backgroundUrl: backgroundUrl,
          backgroundColor: primaryColor,
          logoUrl: logo
        }),
        _react2.default.createElement(
          'div',
          { className: 'auth0-lock-content-wrapper' },
          _react2.default.createElement(
            _reactTransitionGroup.TransitionGroup,
            null,
            _react2.default.createElement(
              _reactTransitionGroup.CSSTransition,
              { classNames: 'global-message', timeout: MESSAGE_ANIMATION_DURATION },
              _react2.default.createElement(
                'div',
                null,
                globalSuccess,
                globalError,
                globalInfo
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { position: 'relative' }, ref: 'screen' },
            _react2.default.createElement(
              _multisize_slide2.default,
              {
                delay: 550,
                onDidAppear: this.onDidAppear.bind(this),
                onDidSlide: this.onDidSlide.bind(this),
                onWillSlide: this.onWillSlide.bind(this),
                transitionName: classNames,
                reverse: reverse
              },
              _react2.default.createElement(
                'div',
                { key: this.mainScreenName(), className: 'auth0-lock-view-content' },
                _react2.default.createElement(
                  'div',
                  { style: { position: 'relative' } },
                  _react2.default.createElement(
                    'div',
                    { className: 'auth0-lock-body-content' },
                    _react2.default.createElement(
                      'div',
                      { className: 'auth0-lock-content' },
                      _react2.default.createElement(
                        'div',
                        { className: 'auth0-lock-form' },
                        _react2.default.createElement(Content, _extends({ focusSubmit: this.focusSubmit.bind(this) }, contentProps))
                      )
                    ),
                    terms && _react2.default.createElement(
                      'small',
                      { className: 'auth0-lock-terms' },
                      terms
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(SubmitButton, {
          color: primaryColor,
          disabled: disableSubmitButton,
          screenName: screenName,
          contentProps: contentProps,
          label: submitButtonLabel,
          ref: function ref(el) {
            return _this5.submitButton = el;
          },
          display: shouldShowSubmitButton ? 'block' : 'none'
        }),
        auxiliaryPane && _react2.default.createElement(
          _reactTransitionGroup.TransitionGroup,
          null,
          _react2.default.createElement(
            _reactTransitionGroup.CSSTransition,
            {
              ref: 'auxiliary',
              classNames: 'slide',
              timeout: AUXILIARY_ANIMATION_DURATION
            },
            auxiliaryPane
          )
        )
      )
    );
  };

  Chrome.prototype.focusSubmit = function focusSubmit() {
    this.submitButton.focus();
  };

  Chrome.prototype.handleBack = function handleBack() {
    if (this.sliding) return;

    var backHandler = this.props.backHandler;

    this.setState({ reverse: true });
    backHandler();
  };

  return Chrome;
}(_react2.default.Component);

exports.default = Chrome;


Chrome.propTypes = {
  autofocus: _propTypes2.default.bool.isRequired,
  avatar: _propTypes2.default.string,
  auxiliaryPane: _propTypes2.default.element,
  backHandler: _propTypes2.default.func,
  contentComponent: _propTypes2.default.func.isRequired, // TODO: it also can be a class component
  contentProps: _propTypes2.default.object.isRequired,
  disableSubmitButton: _propTypes2.default.bool.isRequired,
  error: _propTypes2.default.node,
  info: _propTypes2.default.node,
  isSubmitting: _propTypes2.default.bool.isRequired,
  logo: _propTypes2.default.string.isRequired,
  primaryColor: _propTypes2.default.string.isRequired,
  screenName: _propTypes2.default.string.isRequired,
  showSubmitButton: _propTypes2.default.bool.isRequired,
  submitButtonLabel: _propTypes2.default.string,
  success: _propTypes2.default.node,
  terms: _propTypes2.default.element,
  title: _propTypes2.default.string,
  classNames: _propTypes2.default.string.isRequired,
  scrollGlobalMessagesIntoView: _propTypes2.default.bool
};

Chrome.defaultProps = {
  autofocus: false,
  disableSubmitButton: false,
  showSubmitButton: true,
  scrollGlobalMessagesIntoView: true
};
