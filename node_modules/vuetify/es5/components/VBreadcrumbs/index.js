"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VBreadcrumbs", {
  enumerable: true,
  get: function get() {
    return _VBreadcrumbs.default;
  }
});
Object.defineProperty(exports, "VBreadcrumbsItem", {
  enumerable: true,
  get: function get() {
    return _VBreadcrumbsItem.default;
  }
});
exports.default = exports.VBreadcrumbsDivider = void 0;

var _VBreadcrumbs = _interopRequireDefault(require("./VBreadcrumbs"));

var _VBreadcrumbsItem = _interopRequireDefault(require("./VBreadcrumbsItem"));

var _helpers = require("../../util/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VBreadcrumbsDivider = (0, _helpers.createSimpleFunctional)('v-breadcrumbs__divider', 'li');
exports.VBreadcrumbsDivider = VBreadcrumbsDivider;
var _default = {
  $_vuetify_subcomponents: {
    VBreadcrumbs: _VBreadcrumbs.default,
    VBreadcrumbsItem: _VBreadcrumbsItem.default,
    VBreadcrumbsDivider: VBreadcrumbsDivider
  }
};
exports.default = _default;
//# sourceMappingURL=index.js.map