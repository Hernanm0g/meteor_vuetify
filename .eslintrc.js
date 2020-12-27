module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "meteor": true,
    "mongo": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "allowImportExportEverywhere": true,
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "html"
  ],
  "rules": {
    "vue/no-v-html": 0, // disabling warning of no v-html in vue
    "indent": ["error", 2]
  }
};
