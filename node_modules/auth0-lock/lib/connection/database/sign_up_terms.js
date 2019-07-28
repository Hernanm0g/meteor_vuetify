"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignUpTerms = function SignUpTerms(_ref) {
  var checkHandler = _ref.checkHandler,
      checked = _ref.checked,
      children = _ref.children,
      showCheckbox = _ref.showCheckbox;

  return checkHandler ? _react2.default.createElement(
    "span",
    { className: "auth0-lock-sign-up-terms-agreement" },
    _react2.default.createElement(
      "label",
      null,
      showCheckbox && _react2.default.createElement("input", { type: "checkbox", onChange: checkHandler, checked: checked }),
      children
    )
  ) : children;
};

exports.default = SignUpTerms;
