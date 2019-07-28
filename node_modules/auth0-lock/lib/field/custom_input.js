'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./actions');

var _index = require('./index');

var _text_input = require('../ui/input/text_input');

var _text_input2 = _interopRequireDefault(_text_input);

var _select_input = require('../ui/input/select_input');

var _select_input2 = _interopRequireDefault(_select_input);

var _checkbox_input = require('../ui/input/checkbox_input');

var _checkbox_input2 = _interopRequireDefault(_checkbox_input);

var _index2 = require('../core/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomInput = function CustomInput(_ref) {
  var iconUrl = _ref.iconUrl,
      model = _ref.model,
      name = _ref.name,
      ariaLabel = _ref.ariaLabel,
      placeholder = _ref.placeholder,
      type = _ref.type,
      validator = _ref.validator,
      value = _ref.value;

  var props = {
    iconUrl: iconUrl,
    isValid: !(0, _index.isFieldVisiblyInvalid)(model, name),
    name: name,
    ariaLabel: ariaLabel,
    placeholder: placeholder
  };

  switch (type) {
    case 'select':
      return _react2.default.createElement(_select_input2.default, _extends({}, props, {
        lockId: l.id(model),
        label: (0, _index.getFieldLabel)(model, name),
        onClick: function onClick() {
          return (0, _actions.startOptionSelection)(l.id(model), name, iconUrl);
        }
      }));
    case 'checkbox':
      return _react2.default.createElement(_checkbox_input2.default, _extends({
        lockId: l.id(model),
        onChange: function onChange(e) {
          return (0, _actions.changeField)(l.id(model), name, '' + e.target.checked, validator);
        },
        checked: (0, _index.getFieldValue)(model, name)
      }, props));
    case 'hidden':
      return _react2.default.createElement('input', { id: l.id(model), type: 'hidden', value: value, name: name });
    default:
      return _react2.default.createElement(_text_input2.default, _extends({
        lockId: l.id(model),
        invalidHint: (0, _index.getFieldInvalidHint)(model, name),
        onChange: function onChange(e) {
          return (0, _actions.changeField)(l.id(model), name, e.target.value, validator);
        },
        value: (0, _index.getFieldValue)(model, name)
      }, props));
  }
};

exports.default = CustomInput;
