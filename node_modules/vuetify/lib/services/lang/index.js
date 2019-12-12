// Extensions
import { Service } from '../service'; // Language

import en from '../../locale/en'; // Utilities

import { getObjectValueByPath } from '../../util/helpers';
import { consoleError, consoleWarn } from '../../util/console';
const LANG_PREFIX = '$vuetify.';
const fallback = Symbol('Lang fallback');

function getTranslation(locale, key, usingFallback = false) {
  const shortKey = key.replace(LANG_PREFIX, '');
  let translation = getObjectValueByPath(locale, shortKey, fallback);

  if (translation === fallback) {
    if (usingFallback) {
      consoleError(`Translation key "${shortKey}" not found in fallback`);
      translation = key;
    } else {
      consoleWarn(`Translation key "${shortKey}" not found, falling back to default`);
      translation = getTranslation(en, key, true);
    }
  }

  return translation;
}

export class Lang extends Service {
  constructor(options = {}) {
    super();
    this.current = options.current || 'en';
    this.locales = Object.assign({
      en
    }, options.locales);
    this.translator = options.t;
  }

  t(key, ...params) {
    if (!key.startsWith(LANG_PREFIX)) return this.replace(key, params);
    if (this.translator) return this.translator(key, ...params);
    const translation = getTranslation(this.locales[this.current], key);
    return this.replace(translation, params);
  }

  replace(str, params) {
    return str.replace(/\{(\d+)\}/g, (match, index) => {
      /* istanbul ignore next */
      return String(params[+index]);
    });
  }

}
Lang.property = 'lang';
//# sourceMappingURL=index.js.map