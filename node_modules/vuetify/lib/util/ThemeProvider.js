import Themeable from '../mixins/themeable';
import mixins from './mixins';
/* @vue/component */

export default mixins(Themeable).extend({
  name: 'theme-provider',
  props: {
    root: Boolean
  },
  computed: {
    isDark() {
      return this.root ? this.rootIsDark : Themeable.options.computed.isDark.call(this);
    }

  },

  render() {
    return this.$slots.default && this.$slots.default.find(node => !node.isComment && node.text !== ' ');
  }

});
//# sourceMappingURL=ThemeProvider.js.map