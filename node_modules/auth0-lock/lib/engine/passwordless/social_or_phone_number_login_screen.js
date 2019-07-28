'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../core/screen');

var _screen2 = _interopRequireDefault(_screen);

var _actions = require('../../connection/passwordless/actions');

var _phone_number_pane = require('../../field/phone-number/phone_number_pane');

var _phone_number_pane2 = _interopRequireDefault(_phone_number_pane);

var _social_buttons_pane = require('../../field/social/social_buttons_pane');

var _social_buttons_pane2 = _interopRequireDefault(_social_buttons_pane);

var _signed_in_confirmation = require('../../core/signed_in_confirmation');

var _pane_separator = require('../../core/pane_separator');

var _pane_separator2 = _interopRequireDefault(_pane_separator);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../../field/index');

var _index3 = require('../../connection/passwordless/index');

var _sign_up_terms = require('../../connection/database/sign_up_terms');

var _sign_up_terms2 = _interopRequireDefault(_sign_up_terms);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function Component(_ref) {
  var i18n = _ref.i18n,
      model = _ref.model;

  var social = l.hasSomeConnections(model, 'social') ? _react2.default.createElement(_social_buttons_pane2.default, {
    instructions: i18n.html('socialLoginInstructions'),
    labelFn: i18n.str,
    lock: model,
    signUp: false,
    disabled: !(0, _index3.termsAccepted)(model)
  }) : null;

  var phoneNumberInstructionsI18nKey = social ? 'passwordlessSMSAlternativeInstructions' : 'passwordlessSMSInstructions';

  var phoneNumber = l.hasSomeConnections(model, 'passwordless', 'sms') ? _react2.default.createElement(_phone_number_pane2.default, {
    instructions: i18n.html(phoneNumberInstructionsI18nKey),
    lock: model,
    placeholder: i18n.str('phoneNumberInputPlaceholder')
  }) : null;

  var separator = social && phoneNumber ? _react2.default.createElement(_pane_separator2.default, null) : null;

  return _react2.default.createElement(
    'div',
    null,
    social,
    separator,
    phoneNumber
  );
};

var AskSocialNetworkOrPhoneNumber = function (_Screen) {
  _inherits(AskSocialNetworkOrPhoneNumber, _Screen);

  function AskSocialNetworkOrPhoneNumber() {
    _classCallCheck(this, AskSocialNetworkOrPhoneNumber);

    return _possibleConstructorReturn(this, _Screen.call(this, 'socialOrPhoneNumber'));
  }

  AskSocialNetworkOrPhoneNumber.prototype.submitHandler = function submitHandler(m) {
    return l.hasSomeConnections(m, 'passwordless', 'sms') ? _actions.sendSMS : null;
  };

  AskSocialNetworkOrPhoneNumber.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock) || (0, _index2.renderOptionSelection)(lock);
  };

  AskSocialNetworkOrPhoneNumber.prototype.render = function render() {
    return Component;
  };

  AskSocialNetworkOrPhoneNumber.prototype.isSubmitDisabled = function isSubmitDisabled(m) {
    return !(0, _index3.termsAccepted)(m);
  };

  AskSocialNetworkOrPhoneNumber.prototype.renderTerms = function renderTerms(m, terms) {
    var checkHandler = (0, _index3.mustAcceptTerms)(m) ? function () {
      return (0, _actions.toggleTermsAcceptance)(l.id(m));
    } : undefined;
    return terms || (0, _index3.mustAcceptTerms)(m) ? _react2.default.createElement(
      _sign_up_terms2.default,
      {
        showCheckbox: (0, _index3.mustAcceptTerms)(m),
        checkHandler: checkHandler,
        checked: (0, _index3.termsAccepted)(m)
      },
      terms
    ) : null;
  };

  return AskSocialNetworkOrPhoneNumber;
}(_screen2.default);

exports.default = AskSocialNetworkOrPhoneNumber;
