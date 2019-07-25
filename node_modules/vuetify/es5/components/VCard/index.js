"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VCard", {
  enumerable: true,
  get: function get() {
    return _VCard.default;
  }
});
exports.default = exports.VCardText = exports.VCardActions = exports.VCardTitle = void 0;

var _helpers = require("../../util/helpers");

var _VCard = _interopRequireDefault(require("./VCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VCardActions = (0, _helpers.createSimpleFunctional)('v-card__actions');
exports.VCardActions = VCardActions;
var VCardText = (0, _helpers.createSimpleFunctional)('v-card__text');
exports.VCardText = VCardText;
var VCardTitle = (0, _helpers.createSimpleFunctional)('v-card__title');
exports.VCardTitle = VCardTitle;
var _default = {
  $_vuetify_subcomponents: {
    VCard: _VCard.default,
    VCardTitle: VCardTitle,
    VCardActions: VCardActions,
    VCardText: VCardText
  }
};
exports.default = _default;
//# sourceMappingURL=index.js.map