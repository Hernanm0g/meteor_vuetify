"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VExpandXTransition = exports.VExpandTransition = exports.VSlideYReverseTransition = exports.VSlideYTransition = exports.VSlideXReverseTransition = exports.VSlideXTransition = exports.VScrollYReverseTransition = exports.VScrollYTransition = exports.VScrollXReverseTransition = exports.VScrollXTransition = exports.VScaleTransition = exports.VFadeTransition = exports.VDialogBottomTransition = exports.VDialogTransition = exports.VFabTransition = exports.VMenuTransition = exports.VTabReverseTransition = exports.VTabTransition = exports.VCarouselReverseTransition = exports.VCarouselTransition = void 0;

var _helpers = require("../../util/helpers");

var _expandTransition = _interopRequireDefault(require("./expand-transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component specific transitions
var VCarouselTransition = (0, _helpers.createSimpleTransition)('carousel-transition');
exports.VCarouselTransition = VCarouselTransition;
var VCarouselReverseTransition = (0, _helpers.createSimpleTransition)('carousel-reverse-transition');
exports.VCarouselReverseTransition = VCarouselReverseTransition;
var VTabTransition = (0, _helpers.createSimpleTransition)('tab-transition');
exports.VTabTransition = VTabTransition;
var VTabReverseTransition = (0, _helpers.createSimpleTransition)('tab-reverse-transition');
exports.VTabReverseTransition = VTabReverseTransition;
var VMenuTransition = (0, _helpers.createSimpleTransition)('menu-transition');
exports.VMenuTransition = VMenuTransition;
var VFabTransition = (0, _helpers.createSimpleTransition)('fab-transition', 'center center', 'out-in'); // Generic transitions

exports.VFabTransition = VFabTransition;
var VDialogTransition = (0, _helpers.createSimpleTransition)('dialog-transition');
exports.VDialogTransition = VDialogTransition;
var VDialogBottomTransition = (0, _helpers.createSimpleTransition)('dialog-bottom-transition');
exports.VDialogBottomTransition = VDialogBottomTransition;
var VFadeTransition = (0, _helpers.createSimpleTransition)('fade-transition');
exports.VFadeTransition = VFadeTransition;
var VScaleTransition = (0, _helpers.createSimpleTransition)('scale-transition');
exports.VScaleTransition = VScaleTransition;
var VScrollXTransition = (0, _helpers.createSimpleTransition)('scroll-x-transition');
exports.VScrollXTransition = VScrollXTransition;
var VScrollXReverseTransition = (0, _helpers.createSimpleTransition)('scroll-x-reverse-transition');
exports.VScrollXReverseTransition = VScrollXReverseTransition;
var VScrollYTransition = (0, _helpers.createSimpleTransition)('scroll-y-transition');
exports.VScrollYTransition = VScrollYTransition;
var VScrollYReverseTransition = (0, _helpers.createSimpleTransition)('scroll-y-reverse-transition');
exports.VScrollYReverseTransition = VScrollYReverseTransition;
var VSlideXTransition = (0, _helpers.createSimpleTransition)('slide-x-transition');
exports.VSlideXTransition = VSlideXTransition;
var VSlideXReverseTransition = (0, _helpers.createSimpleTransition)('slide-x-reverse-transition');
exports.VSlideXReverseTransition = VSlideXReverseTransition;
var VSlideYTransition = (0, _helpers.createSimpleTransition)('slide-y-transition');
exports.VSlideYTransition = VSlideYTransition;
var VSlideYReverseTransition = (0, _helpers.createSimpleTransition)('slide-y-reverse-transition'); // JavaScript transitions

exports.VSlideYReverseTransition = VSlideYReverseTransition;
var VExpandTransition = (0, _helpers.createJavaScriptTransition)('expand-transition', (0, _expandTransition.default)());
exports.VExpandTransition = VExpandTransition;
var VExpandXTransition = (0, _helpers.createJavaScriptTransition)('expand-x-transition', (0, _expandTransition.default)('', true));
exports.VExpandXTransition = VExpandXTransition;
var _default = {
  $_vuetify_subcomponents: {
    VCarouselTransition: VCarouselTransition,
    VCarouselReverseTransition: VCarouselReverseTransition,
    VDialogTransition: VDialogTransition,
    VDialogBottomTransition: VDialogBottomTransition,
    VFabTransition: VFabTransition,
    VFadeTransition: VFadeTransition,
    VMenuTransition: VMenuTransition,
    VScaleTransition: VScaleTransition,
    VScrollXTransition: VScrollXTransition,
    VScrollXReverseTransition: VScrollXReverseTransition,
    VScrollYTransition: VScrollYTransition,
    VScrollYReverseTransition: VScrollYReverseTransition,
    VSlideXTransition: VSlideXTransition,
    VSlideXReverseTransition: VSlideXReverseTransition,
    VSlideYTransition: VSlideYTransition,
    VSlideYReverseTransition: VSlideYReverseTransition,
    VTabReverseTransition: VTabReverseTransition,
    VTabTransition: VTabTransition,
    VExpandTransition: VExpandTransition,
    VExpandXTransition: VExpandXTransition
  }
};
exports.default = _default;
//# sourceMappingURL=index.js.map