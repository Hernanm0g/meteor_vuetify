"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VTreeviewNodeProps = void 0;

var _transitions = require("../transitions");

var _VIcon = require("../VIcon");

var _VTreeviewNode = _interopRequireDefault(require("./VTreeviewNode"));

var _registrable = require("../../mixins/registrable");

var _colorable = _interopRequireDefault(require("../../mixins/colorable"));

var _mixins = _interopRequireDefault(require("../../util/mixins"));

var _helpers = require("../../util/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseMixins = (0, _mixins.default)(_colorable.default, (0, _registrable.inject)('treeview'));
var VTreeviewNodeProps = {
  activatable: Boolean,
  activeClass: {
    type: String,
    default: 'v-treeview-node--active'
  },
  color: {
    type: String,
    default: 'primary'
  },
  expandIcon: {
    type: String,
    default: '$subgroup'
  },
  indeterminateIcon: {
    type: String,
    default: '$checkboxIndeterminate'
  },
  itemChildren: {
    type: String,
    default: 'children'
  },
  itemDisabled: {
    type: String,
    default: 'disabled'
  },
  itemKey: {
    type: String,
    default: 'id'
  },
  itemText: {
    type: String,
    default: 'name'
  },
  loadChildren: Function,
  loadingIcon: {
    type: String,
    default: '$loading'
  },
  offIcon: {
    type: String,
    default: '$checkboxOff'
  },
  onIcon: {
    type: String,
    default: '$checkboxOn'
  },
  openOnClick: Boolean,
  rounded: Boolean,
  selectable: Boolean,
  selectedColor: {
    type: String,
    default: 'accent'
  },
  shaped: Boolean,
  transition: Boolean
};
/* @vue/component */

exports.VTreeviewNodeProps = VTreeviewNodeProps;

var _default2 = baseMixins.extend().extend({
  name: 'v-treeview-node',
  inject: {
    treeview: {
      default: null
    }
  },
  props: _objectSpread({
    item: {
      type: Object,
      default: function _default() {
        return null;
      }
    }
  }, VTreeviewNodeProps),
  data: function data() {
    return {
      hasLoaded: false,
      isActive: false,
      isIndeterminate: false,
      isLoading: false,
      isOpen: false,
      isSelected: false
    };
  },
  computed: {
    disabled: function disabled() {
      return (0, _helpers.getObjectValueByPath)(this.item, this.itemDisabled);
    },
    key: function key() {
      return (0, _helpers.getObjectValueByPath)(this.item, this.itemKey);
    },
    children: function children() {
      return (0, _helpers.getObjectValueByPath)(this.item, this.itemChildren);
    },
    text: function text() {
      return (0, _helpers.getObjectValueByPath)(this.item, this.itemText);
    },
    scopedProps: function scopedProps() {
      return {
        item: this.item,
        leaf: !this.children,
        selected: this.isSelected,
        indeterminate: this.isIndeterminate,
        active: this.isActive,
        open: this.isOpen
      };
    },
    computedIcon: function computedIcon() {
      if (this.isIndeterminate) return this.indeterminateIcon;else if (this.isSelected) return this.onIcon;else return this.offIcon;
    },
    hasChildren: function hasChildren() {
      return !!this.children && (!!this.children.length || !!this.loadChildren);
    }
  },
  created: function created() {
    this.treeview.register(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.treeview.unregister(this);
  },
  methods: {
    checkChildren: function checkChildren() {
      var _this = this;

      return new Promise(function (resolve) {
        // TODO: Potential issue with always trying
        // to load children if response is empty?
        if (!_this.children || _this.children.length || !_this.loadChildren || _this.hasLoaded) return resolve();
        _this.isLoading = true;
        resolve(_this.loadChildren(_this.item));
      }).then(function () {
        _this.isLoading = false;
        _this.hasLoaded = true;
      });
    },
    open: function open() {
      this.isOpen = !this.isOpen;
      this.treeview.updateOpen(this.key, this.isOpen);
      this.treeview.emitOpen();
    },
    genLabel: function genLabel() {
      var children = [];
      if (this.$scopedSlots.label) children.push(this.$scopedSlots.label(this.scopedProps));else children.push(this.text);
      return this.$createElement('div', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, children);
    },
    genContent: function genContent() {
      var children = [this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps), this.genLabel(), this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)];
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__content'
      }, children);
    },
    genToggle: function genToggle() {
      var _this2 = this;

      return this.$createElement(_VIcon.VIcon, {
        staticClass: 'v-treeview-node__toggle',
        class: {
          'v-treeview-node__toggle--open': this.isOpen,
          'v-treeview-node__toggle--loading': this.isLoading
        },
        slot: 'prepend',
        on: {
          click: function click(e) {
            if (_this2.disabled) return;
            e.stopPropagation();
            if (_this2.isLoading) return;

            _this2.checkChildren().then(function () {
              return _this2.open();
            });
          }
        }
      }, [this.isLoading ? this.loadingIcon : this.expandIcon]);
    },
    genCheckbox: function genCheckbox() {
      var _this3 = this;

      return this.$createElement(_VIcon.VIcon, {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: this.isSelected ? this.selectedColor : undefined
        },
        on: {
          click: function click(e) {
            if (_this3.disabled) return;
            e.stopPropagation();
            if (_this3.isLoading) return;

            _this3.checkChildren().then(function () {
              // We nextTick here so that items watch in VTreeview has a chance to run first
              _this3.$nextTick(function () {
                _this3.isSelected = !_this3.isSelected;
                _this3.isIndeterminate = false;

                _this3.treeview.updateSelected(_this3.key, _this3.isSelected);

                _this3.treeview.emitSelected();
              });
            });
          }
        }
      }, [this.computedIcon]);
    },
    genNode: function genNode() {
      var _this4 = this;

      var children = [this.genContent()];
      if (this.selectable) children.unshift(this.genCheckbox());
      if (this.hasChildren) children.unshift(this.genToggle());
      return this.$createElement('div', this.setTextColor(this.isActive && this.color, {
        staticClass: 'v-treeview-node__root',
        class: _defineProperty({}, this.activeClass, this.isActive),
        on: {
          click: function click() {
            if (_this4.disabled) return;

            if (_this4.openOnClick && _this4.hasChildren) {
              _this4.open();
            } else if (_this4.activatable) {
              _this4.isActive = !_this4.isActive;

              _this4.treeview.updateActive(_this4.key, _this4.isActive);

              _this4.treeview.emitActive();
            }
          }
        }
      }), children);
    },
    genChild: function genChild(item) {
      return this.$createElement(_VTreeviewNode.default, {
        key: (0, _helpers.getObjectValueByPath)(item, this.itemKey),
        props: {
          activatable: this.activatable,
          activeClass: this.activeClass,
          item: item,
          selectable: this.selectable,
          selectedColor: this.selectedColor,
          color: this.color,
          expandIcon: this.expandIcon,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          loadingIcon: this.loadingIcon,
          itemKey: this.itemKey,
          itemText: this.itemText,
          itemDisabled: this.itemDisabled,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren,
          transition: this.transition,
          openOnClick: this.openOnClick,
          rounded: this.rounded,
          shaped: this.shaped
        },
        scopedSlots: this.$scopedSlots
      });
    },
    genChildrenWrapper: function genChildrenWrapper() {
      if (!this.isOpen || !this.children) return null;
      var children = [this.children.map(this.genChild)];
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children'
      }, children);
    },
    genTransition: function genTransition() {
      return this.$createElement(_transitions.VExpandTransition, [this.genChildrenWrapper()]);
    }
  },
  render: function render(h) {
    var children = [this.genNode()];
    if (this.transition) children.push(this.genTransition());else children.push(this.genChildrenWrapper());
    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': !this.hasChildren,
        'v-treeview-node--click': this.openOnClick,
        'v-treeview-node--disabled': this.disabled,
        'v-treeview-node--rounded': this.rounded,
        'v-treeview-node--shaped': this.shaped,
        'v-treeview-node--selected': this.isSelected,
        'v-treeview-node--excluded': this.treeview.isExcluded(this.key)
      },
      attrs: {
        'aria-expanded': String(this.isOpen)
      }
    }, children);
  }
});

exports.default = _default2;
//# sourceMappingURL=VTreeviewNode.js.map