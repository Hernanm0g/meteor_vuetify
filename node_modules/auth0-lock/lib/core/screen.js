'use strict';

exports.__esModule = true;

var _index = require('./index');

var l = _interopRequireWildcard(_index);

var _i18n = require('../i18n');

var i18n = _interopRequireWildcard(_i18n);

var _index2 = require('../connection/database/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(name) {
    _classCallCheck(this, Screen);

    this.name = name;
  }

  Screen.prototype.backHandler = function backHandler() {
    return null;
  };

  Screen.prototype.escHandler = function escHandler() {
    return null;
  };

  Screen.prototype.submitButtonLabel = function submitButtonLabel(m) {
    return i18n.str(m, ['submitLabel']);
  };

  Screen.prototype.isFirstScreen = function isFirstScreen(m) {
    var firstScreenName = (0, _index2.getInitialScreen)(m);
    var currentScreenNameParts = this.name.split('.');
    var currentScreenName = currentScreenNameParts[1] || currentScreenNameParts[0];

    // if signup and login is enabled, both are the first screen in this scenario and
    // neither of them should show the title
    if (currentScreenName === 'signUp' && (0, _index2.hasScreen)(m, 'login')) {
      return true;
    }

    var initialScreens = [firstScreenName, 'loading', 'lastLogin'];

    return initialScreens.indexOf(currentScreenName) !== -1;
  };

  Screen.prototype.getTitle = function getTitle(m) {
    //loading screen will never show a title
    if (this.name === 'loading') {
      return '';
    }
    return this.getScreenTitle(m) || i18n.str(m, 'title');
  };

  Screen.prototype.getScreenTitle = function getScreenTitle(m) {
    return i18n.str(m, 'title');
  };

  Screen.prototype.submitHandler = function submitHandler() {
    return null;
  };

  Screen.prototype.isSubmitDisabled = function isSubmitDisabled(m) {
    return false;
  };

  Screen.prototype.renderAuxiliaryPane = function renderAuxiliaryPane() {
    return null;
  };

  Screen.prototype.renderTabs = function renderTabs() {
    return false;
  };

  Screen.prototype.renderTerms = function renderTerms() {
    return null;
  };

  return Screen;
}();

exports.default = Screen;
