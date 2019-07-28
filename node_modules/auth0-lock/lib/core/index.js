'use strict';

exports.__esModule = true;
exports.reset = exports.auth = exports.ui = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.setup = setup;
exports.id = id;
exports.clientID = clientID;
exports.domain = domain;
exports.clientBaseUrl = clientBaseUrl;
exports.tenantBaseUrl = tenantBaseUrl;
exports.useTenantInfo = useTenantInfo;
exports.connectionResolver = connectionResolver;
exports.setResolvedConnection = setResolvedConnection;
exports.resolvedConnection = resolvedConnection;
exports.languageBaseUrl = languageBaseUrl;
exports.setSubmitting = setSubmitting;
exports.submitting = submitting;
exports.setGlobalError = setGlobalError;
exports.globalError = globalError;
exports.clearGlobalError = clearGlobalError;
exports.setGlobalSuccess = setGlobalSuccess;
exports.globalSuccess = globalSuccess;
exports.clearGlobalSuccess = clearGlobalSuccess;
exports.setGlobalInfo = setGlobalInfo;
exports.globalInfo = globalInfo;
exports.clearGlobalInfo = clearGlobalInfo;
exports.rendering = rendering;
exports.stopRendering = stopRendering;
exports.withAuthOptions = withAuthOptions;
exports.extractTenantBaseUrlOption = extractTenantBaseUrlOption;
exports.render = render;
exports.setLoggedIn = setLoggedIn;
exports.loggedIn = loggedIn;
exports.defaultADUsernameFromEmailPrefix = defaultADUsernameFromEmailPrefix;
exports.prefill = prefill;
exports.warn = warn;
exports.error = error;
exports.allowedConnections = allowedConnections;
exports.connections = connections;
exports.connection = connection;
exports.hasOneConnection = hasOneConnection;
exports.hasOnlyConnections = hasOnlyConnections;
exports.hasSomeConnections = hasSomeConnections;
exports.countConnections = countConnections;
exports.findConnection = findConnection;
exports.hasConnection = hasConnection;
exports.filterConnections = filterConnections;
exports.runHook = runHook;
exports.emitEvent = emitEvent;
exports.loginErrorMessage = loginErrorMessage;
exports.stop = stop;
exports.hasStopped = hasStopped;
exports.hashCleanup = hashCleanup;
exports.emitHashParsedEvent = emitHashParsedEvent;
exports.emitAuthenticatedEvent = emitAuthenticatedEvent;
exports.emitAuthorizationErrorEvent = emitAuthorizationErrorEvent;
exports.emitUnrecoverableErrorEvent = emitUnrecoverableErrorEvent;
exports.showBadge = showBadge;
exports.overrideOptions = overrideOptions;

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _media_utils = require('../utils/media_utils');

var _string_utils = require('../utils/string_utils');

var _url_utils = require('../utils/url_utils');

var _i18n = require('../i18n');

var i18n = _interopRequireWildcard(_i18n);

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

var _gravatar_provider = require('../avatar/gravatar_provider');

var gp = _interopRequireWildcard(_gravatar_provider);

var _data_utils = require('../utils/data_utils');

var _index = require('./client/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dataFns = (0, _data_utils.dataFns)(['core']),
    get = _dataFns.get,
    init = _dataFns.init,
    remove = _dataFns.remove,
    reset = _dataFns.reset,
    set = _dataFns.set,
    tget = _dataFns.tget,
    tset = _dataFns.tset,
    tremove = _dataFns.tremove;

function setup(id, clientID, domain, options, hookRunner, emitEventFn) {
  var m = init(id, _immutable2.default.fromJS({
    clientBaseUrl: extractClientBaseUrlOption(options, domain),
    tenantBaseUrl: extractTenantBaseUrlOption(options, domain),
    languageBaseUrl: extractLanguageBaseUrlOption(options, domain),
    auth: extractAuthOptions(options),
    clientID: clientID,
    domain: domain,
    emitEventFn: emitEventFn,
    hookRunner: hookRunner,
    useTenantInfo: options.__useTenantInfo || false,
    hashCleanup: options.hashCleanup === false ? false : true,
    allowedConnections: _immutable2.default.fromJS(options.allowedConnections || []),
    ui: extractUIOptions(id, options),
    defaultADUsernameFromEmailPrefix: options.defaultADUsernameFromEmailPrefix === false ? false : true,
    prefill: options.prefill || {},
    connectionResolver: options.connectionResolver
  }));

  m = i18n.initI18n(m);

  return m;
}

function id(m) {
  return m.get('id');
}

function clientID(m) {
  return get(m, 'clientID');
}

function domain(m) {
  return get(m, 'domain');
}

function clientBaseUrl(m) {
  return get(m, 'clientBaseUrl');
}

function tenantBaseUrl(m) {
  return get(m, 'tenantBaseUrl');
}

function useTenantInfo(m) {
  return get(m, 'useTenantInfo');
}

function connectionResolver(m) {
  return get(m, 'connectionResolver');
}

function setResolvedConnection(m, resolvedConnection) {
  if (!resolvedConnection) {
    return set(m, 'resolvedConnection', undefined);
  }
  if (!resolvedConnection.type || !resolvedConnection.name) {
    throw new Error('Invalid connection object. The resolved connection must look like: `{ type: "database", name: "connection name" }`.');
  }
  if (resolvedConnection.type !== 'database') {
    throw new Error('Invalid connection type. Only database connections can be resolved with a custom resolver.');
  }
  return set(m, 'resolvedConnection', _immutable2.default.fromJS(resolvedConnection));
}

function resolvedConnection(m) {
  var resolvedConnection = get(m, 'resolvedConnection');
  if (!resolvedConnection) {
    return undefined;
  }
  return findConnection(m, resolvedConnection.get('name'));
}

function languageBaseUrl(m) {
  return get(m, 'languageBaseUrl');
}

function setSubmitting(m, value) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  m = tset(m, 'submitting', value);
  m = clearGlobalSuccess(m);
  m = error && !value ? setGlobalError(m, error) : clearGlobalError(m);
  return m;
}

function submitting(m) {
  return tget(m, 'submitting', false);
}

function setGlobalError(m, str) {
  return tset(m, 'globalError', str);
}

function globalError(m) {
  return tget(m, 'globalError', '');
}

function clearGlobalError(m) {
  return tremove(m, 'globalError');
}

function setGlobalSuccess(m, str) {
  return tset(m, 'globalSuccess', str);
}

function globalSuccess(m) {
  return tget(m, 'globalSuccess', '');
}

function clearGlobalSuccess(m) {
  return tremove(m, 'globalSuccess');
}

function setGlobalInfo(m, str) {
  return tset(m, 'globalInfo', str);
}

function globalInfo(m) {
  return tget(m, 'globalInfo', '');
}

function clearGlobalInfo(m) {
  return tremove(m, 'globalInfo');
}

function rendering(m) {
  return tget(m, 'render', false);
}

function stopRendering(m) {
  return tremove(m, 'render');
}

function extractUIOptions(id, options) {
  var closable = options.container ? false : undefined === options.closable ? true : !!options.closable;
  var theme = options.theme || {};
  var labeledSubmitButton = theme.labeledSubmitButton,
      hideMainScreenTitle = theme.hideMainScreenTitle,
      logo = theme.logo,
      primaryColor = theme.primaryColor,
      authButtons = theme.authButtons;


  var avatar = options.avatar !== null;
  var customAvatarProvider = options.avatar && typeof options.avatar.url === 'function' && typeof options.avatar.displayName === 'function' && options.avatar;
  var avatarProvider = customAvatarProvider || gp;

  return new _immutable2.default.fromJS({
    containerID: options.container || 'auth0-lock-container-' + id,
    appendContainer: !options.container,
    autoclose: undefined === options.autoclose ? false : closable && options.autoclose,
    autofocus: undefined === options.autofocus ? !(options.container || (0, _media_utils.isSmallScreen)()) : !!options.autofocus,
    avatar: avatar,
    avatarProvider: avatarProvider,
    logo: typeof logo === 'string' ? logo : undefined,
    closable: closable,
    hideMainScreenTitle: !!hideMainScreenTitle,
    labeledSubmitButton: undefined === labeledSubmitButton ? true : !!labeledSubmitButton,
    language: undefined === options.language ? 'en' : (0, _trim2.default)(options.language || '').toLowerCase(),
    dict: _typeof(options.languageDictionary) === 'object' ? options.languageDictionary : {},
    disableWarnings: options.disableWarnings === undefined ? false : !!options.disableWarnings,
    mobile: undefined === options.mobile ? false : !!options.mobile,
    popupOptions: undefined === options.popupOptions ? {} : options.popupOptions,
    primaryColor: typeof primaryColor === 'string' ? primaryColor : undefined,
    rememberLastLogin: undefined === options.rememberLastLogin ? true : !!options.rememberLastLogin,
    allowAutocomplete: !!options.allowAutocomplete,
    authButtonsTheme: (typeof authButtons === 'undefined' ? 'undefined' : _typeof(authButtons)) === 'object' ? authButtons : {},
    allowShowPassword: !!options.allowShowPassword,
    allowPasswordAutocomplete: !!options.allowPasswordAutocomplete,
    scrollGlobalMessagesIntoView: undefined === options.scrollGlobalMessagesIntoView ? true : !!options.scrollGlobalMessagesIntoView
  });
}

var _dataFns2 = (0, _data_utils.dataFns)(['core', 'ui']),
    getUI = _dataFns2.get,
    setUI = _dataFns2.set;

var _dataFns3 = (0, _data_utils.dataFns)(['core', 'transient', 'ui']),
    tgetUI = _dataFns3.get,
    tsetUI = _dataFns3.set;

var getUIAttribute = function getUIAttribute(m, attribute) {
  return tgetUI(m, attribute) || getUI(m, attribute);
};

var ui = exports.ui = {
  containerID: function containerID(lock) {
    return getUIAttribute(lock, 'containerID');
  },
  appendContainer: function appendContainer(lock) {
    return getUIAttribute(lock, 'appendContainer');
  },
  autoclose: function autoclose(lock) {
    return getUIAttribute(lock, 'autoclose');
  },
  autofocus: function autofocus(lock) {
    return getUIAttribute(lock, 'autofocus');
  },
  avatar: function avatar(lock) {
    return getUIAttribute(lock, 'avatar');
  },
  avatarProvider: function avatarProvider(lock) {
    return getUIAttribute(lock, 'avatarProvider');
  },
  closable: function closable(lock) {
    return getUIAttribute(lock, 'closable');
  },
  dict: function dict(lock) {
    return getUIAttribute(lock, 'dict');
  },
  disableWarnings: function disableWarnings(lock) {
    return getUIAttribute(lock, 'disableWarnings');
  },
  labeledSubmitButton: function labeledSubmitButton(lock) {
    return getUIAttribute(lock, 'labeledSubmitButton');
  },
  hideMainScreenTitle: function hideMainScreenTitle(lock) {
    return getUIAttribute(lock, 'hideMainScreenTitle');
  },
  language: function language(lock) {
    return getUIAttribute(lock, 'language');
  },
  logo: function logo(lock) {
    return getUIAttribute(lock, 'logo');
  },
  mobile: function mobile(lock) {
    return getUIAttribute(lock, 'mobile');
  },
  popupOptions: function popupOptions(lock) {
    return getUIAttribute(lock, 'popupOptions');
  },
  primaryColor: function primaryColor(lock) {
    return getUIAttribute(lock, 'primaryColor');
  },
  authButtonsTheme: function authButtonsTheme(lock) {
    return getUIAttribute(lock, 'authButtonsTheme');
  },
  rememberLastLogin: function rememberLastLogin(m) {
    return tget(m, 'rememberLastLogin', getUIAttribute(m, 'rememberLastLogin'));
  },
  allowAutocomplete: function allowAutocomplete(m) {
    return tget(m, 'allowAutocomplete', getUIAttribute(m, 'allowAutocomplete'));
  },
  scrollGlobalMessagesIntoView: function scrollGlobalMessagesIntoView(lock) {
    return getUIAttribute(lock, 'scrollGlobalMessagesIntoView');
  },
  allowShowPassword: function allowShowPassword(m) {
    return tget(m, 'allowShowPassword', getUIAttribute(m, 'allowShowPassword'));
  },
  allowPasswordAutocomplete: function allowPasswordAutocomplete(m) {
    return tget(m, 'allowPasswordAutocomplete', getUIAttribute(m, 'allowPasswordAutocomplete'));
  }
};

var _dataFns4 = (0, _data_utils.dataFns)(['core', 'auth']),
    getAuthAttribute = _dataFns4.get;

var auth = exports.auth = {
  connectionScopes: function connectionScopes(m) {
    return getAuthAttribute(m, 'connectionScopes');
  },
  params: function params(m) {
    return tget(m, 'authParams') || getAuthAttribute(m, 'params');
  },
  autoParseHash: function autoParseHash(lock) {
    return getAuthAttribute(lock, 'autoParseHash');
  },
  redirect: function redirect(lock) {
    return getAuthAttribute(lock, 'redirect');
  },
  redirectUrl: function redirectUrl(lock) {
    return getAuthAttribute(lock, 'redirectUrl');
  },
  responseType: function responseType(lock) {
    return getAuthAttribute(lock, 'responseType');
  },
  sso: function sso(lock) {
    return getAuthAttribute(lock, 'sso');
  }
};

function extractAuthOptions(options) {
  var _ref = options.auth || {},
      audience = _ref.audience,
      connectionScopes = _ref.connectionScopes,
      params = _ref.params,
      autoParseHash = _ref.autoParseHash,
      redirect = _ref.redirect,
      redirectUrl = _ref.redirectUrl,
      responseMode = _ref.responseMode,
      responseType = _ref.responseType,
      sso = _ref.sso,
      state = _ref.state,
      nonce = _ref.nonce;

  audience = typeof audience === 'string' ? audience : undefined;
  connectionScopes = (typeof connectionScopes === 'undefined' ? 'undefined' : _typeof(connectionScopes)) === 'object' ? connectionScopes : {};
  params = (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' ? params : {};
  // by default is null because we need to know if it was set when we curate the responseType
  redirectUrl = typeof redirectUrl === 'string' && redirectUrl ? redirectUrl : null;
  autoParseHash = typeof autoParseHash === 'boolean' ? autoParseHash : true;
  redirect = typeof redirect === 'boolean' ? redirect : true;
  responseMode = typeof responseMode === 'string' ? responseMode : undefined;
  state = typeof state === 'string' ? state : undefined;
  nonce = typeof nonce === 'string' ? nonce : undefined;
  // if responseType was not set and there is a redirectUrl, it defaults to code. Otherwise token.
  responseType = typeof responseType === 'string' ? responseType : redirectUrl ? 'code' : 'token';
  // now we set the default because we already did the validation
  redirectUrl = redirectUrl || '' + (0, _url_utils.getOriginFromUrl)(window.location.href) + window.location.pathname;

  sso = typeof sso === 'boolean' ? sso : true;

  if (!params.scope) {
    params.scope = 'openid profile email';
  }

  return _immutable2.default.fromJS({
    audience: audience,
    connectionScopes: connectionScopes,
    params: params,
    autoParseHash: autoParseHash,
    redirect: redirect,
    redirectUrl: redirectUrl,
    responseMode: responseMode,
    responseType: responseType,
    sso: sso,
    state: state,
    nonce: nonce
  });
}

function withAuthOptions(m, opts) {
  return _immutable2.default.fromJS(opts).merge(get(m, 'auth')).toJS();
}

function extractClientBaseUrlOption(opts, domain) {
  if (opts.clientBaseUrl && typeof opts.clientBaseUrl === 'string') {
    return opts.clientBaseUrl;
  }

  if (opts.configurationBaseUrl && typeof opts.configurationBaseUrl === 'string') {
    return opts.configurationBaseUrl;
  }

  if (opts.assetsUrl && typeof opts.assetsUrl === 'string') {
    return opts.assetsUrl;
  }

  var domainUrl = 'https://' + domain;
  var hostname = (0, _url_utils.getLocationFromUrl)(domainUrl).hostname;
  var DOT_AUTH0_DOT_COM = '.auth0.com';
  var AUTH0_US_CDN_URL = 'https://cdn.auth0.com';
  if ((0, _string_utils.endsWith)(hostname, DOT_AUTH0_DOT_COM)) {
    var parts = hostname.split('.');
    return parts.length > 3 ? 'https://cdn.' + parts[parts.length - 3] + DOT_AUTH0_DOT_COM : AUTH0_US_CDN_URL;
  } else {
    return domainUrl;
  }
}

function extractTenantBaseUrlOption(opts, domain) {
  if (opts.configurationBaseUrl && typeof opts.configurationBaseUrl === 'string') {
    if (opts.overrides && opts.overrides.__tenant) {
      // When using a custom domain and a configuration URL hosted in auth0's cdn
      return (0, _urlJoin2.default)(opts.configurationBaseUrl, 'tenants', 'v1', opts.overrides.__tenant + '.js');
    }
    return (0, _urlJoin2.default)(opts.configurationBaseUrl, 'info-v1.js');
  }

  if (opts.assetsUrl && typeof opts.assetsUrl === 'string') {
    return opts.assetsUrl;
  }

  var domainUrl = 'https://' + domain;
  var hostname = (0, _url_utils.getLocationFromUrl)(domainUrl).hostname;
  var DOT_AUTH0_DOT_COM = '.auth0.com';
  var AUTH0_US_CDN_URL = 'https://cdn.auth0.com';

  var parts = hostname.split('.');
  var tenant_name = parts[0];
  var domain;

  if ((0, _string_utils.endsWith)(hostname, DOT_AUTH0_DOT_COM)) {
    domain = parts.length > 3 ? 'https://cdn.' + parts[parts.length - 3] + DOT_AUTH0_DOT_COM : AUTH0_US_CDN_URL;

    return (0, _urlJoin2.default)(domain, 'tenants', 'v1', tenant_name + '.js');
  } else {
    return (0, _urlJoin2.default)(domainUrl, 'info-v1.js');
  }
}

function extractLanguageBaseUrlOption(opts, domain) {
  if (opts.languageBaseUrl && typeof opts.languageBaseUrl === 'string') {
    return opts.languageBaseUrl;
  }

  if (opts.assetsUrl && typeof opts.assetsUrl === 'string') {
    return opts.assetsUrl;
  }

  return 'https://cdn.auth0.com';
}

function render(m) {
  return tset(m, 'render', true);
}

exports.reset = reset;
function setLoggedIn(m, value) {
  return tset(m, 'loggedIn', value);
}

function loggedIn(m) {
  return tget(m, 'loggedIn', false);
}

function defaultADUsernameFromEmailPrefix(m) {
  return get(m, 'defaultADUsernameFromEmailPrefix', true);
}

function prefill(m) {
  return get(m, 'prefill', {});
}

function warn(x, str) {
  var shouldOutput = _immutable.Map.isMap(x) ? !ui.disableWarnings(x) : !x.disableWarnings;

  if (shouldOutput && console && console.warn) {
    console.warn(str);
  }
}

function error(x, str) {
  var shouldOutput = _immutable.Map.isMap(x) ? !ui.disableWarnings(x) : !x.disableWarnings;

  if (shouldOutput && console && console.error) {
    console.error(str);
  }
}

function allowedConnections(m) {
  return tget(m, 'allowedConnections') || get(m, 'allowedConnections');
}

function connections(m) {
  for (var _len = arguments.length, strategies = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    strategies[_key - 2] = arguments[_key];
  }

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (arguments.length === 1) {
    return tget(m, 'connections', (0, _immutable.Map)()).filter(function (v, k) {
      return k !== 'unknown';
    }).valueSeq().flatten(true);
  }

  var xs = tget(m, ['connections', type], (0, _immutable.List)());
  return strategies.length > 0 ? xs.filter(function (x) {
    return ~strategies.indexOf(x.get('strategy'));
  }) : xs;
}

function connection(m) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  for (var _len2 = arguments.length, strategies = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    strategies[_key2 - 2] = arguments[_key2];
  }

  return connections.apply(undefined, [m, type].concat(strategies)).get(0);
}

function hasOneConnection(m) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var xs = connections(m);
  return xs.count() === 1 && (!type || xs.getIn([0, 'type']) === type);
}

function hasOnlyConnections(m) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var all = connections(m).count();

  for (var _len3 = arguments.length, strategies = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    strategies[_key3 - 2] = arguments[_key3];
  }

  var filtered = connections.apply(undefined, [m, type].concat(strategies)).count();
  return all > 0 && all === filtered;
}

function hasSomeConnections(m) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  for (var _len4 = arguments.length, strategies = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    strategies[_key4 - 2] = arguments[_key4];
  }

  return countConnections.apply(undefined, [m, type].concat(strategies)) > 0;
}

function countConnections(m) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  for (var _len5 = arguments.length, strategies = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    strategies[_key5 - 2] = arguments[_key5];
  }

  return connections.apply(undefined, [m, type].concat(strategies)).count();
}

function findConnection(m, name) {
  return connections(m).find(function (m1) {
    return m1.get('name') === name;
  });
}

function hasConnection(m, name) {
  return !!findConnection(m, name);
}

function filterConnections(m) {
  var allowed = allowedConnections(m);

  var order = allowed.count() === 0 ? function (_) {
    return 0;
  } : function (c) {
    return allowed.indexOf(c.get('name'));
  };

  return tset(m, 'connections', (0, _index.clientConnections)(m).map(function (cs) {
    return cs.filter(function (c) {
      return order(c) >= 0;
    }).sort(function (c1, c2) {
      return order(c1) - order(c2);
    });
  }));
}

function runHook(m, str) {
  for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    args[_key6 - 2] = arguments[_key6];
  }

  return get(m, 'hookRunner').apply(undefined, [str, m].concat(args));
}

function emitEvent(m, str) {
  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
    args[_key7 - 2] = arguments[_key7];
  }

  setTimeout(function () {
    var emitEventFn = get(m, 'emitEventFn');
    var hadListener = emitEventFn.apply(undefined, [str].concat(args));
    // Handle uncaught custom error
    if (str === 'unrecoverable_error' && !hadListener) {
      throw new (Function.prototype.bind.apply(Error, [null].concat(args)))();
    }
  }, 0);
}

function loginErrorMessage(m, error, type) {
  // NOTE: previous version of lock checked for status codes and, at
  // some point, if the status code was 401 it defaults to an
  // "invalid_user_password" error (actually the
  // "wrongEmailPasswordErrorText" dict entry) instead of checking
  // explicitly. We should figure out if there was a reason for that.

  if (error.status === 0) {
    return i18n.html(m, ['error', 'login', 'lock.network']);
  }

  // Custom rule error (except blocked_user)
  if (error.code === 'rule_error') {
    return error.description || i18n.html(m, ['error', 'login', 'lock.fallback']);
  }

  var INVALID_MAP = {
    code: 'lock.invalid_code',
    email: 'lock.invalid_email_password',
    username: 'lock.invalid_username_password'
  };

  var code = error.error || error.code;
  if (code === 'invalid_user_password' && INVALID_MAP[type]) {
    code = INVALID_MAP[type];
  }

  if (code === 'a0.mfa_registration_required') {
    code = 'lock.mfa_registration_required';
  }

  if (code === 'a0.mfa_invalid_code') {
    code = 'lock.mfa_invalid_code';
  }

  return i18n.html(m, ['error', 'login', code]) || i18n.html(m, ['error', 'login', 'lock.fallback']);
}

// TODO: rename to something less generic that is easier to grep
function stop(m, error) {
  if (error) {
    setTimeout(function () {
      return emitEvent(m, 'unrecoverable_error', error);
    }, 17);
  }

  return set(m, 'stopped', true);
}

function hasStopped(m) {
  return get(m, 'stopped');
}

function hashCleanup(m) {
  return get(m, 'hashCleanup');
}

function emitHashParsedEvent(m, parsedHash) {
  emitEvent(m, 'hash_parsed', parsedHash);
}

function emitAuthenticatedEvent(m, result) {
  emitEvent(m, 'authenticated', result);
}

function emitAuthorizationErrorEvent(m, error) {
  emitEvent(m, 'authorization_error', error);
}

function emitUnrecoverableErrorEvent(m, error) {
  emitEvent(m, 'unrecoverable_error', error);
}

function showBadge(m) {
  return (0, _index.hasFreeSubscription)(m) || false;
}

function overrideOptions(m, opts) {
  if (!opts) opts = {};

  if (opts.allowedConnections) {
    m = tset(m, 'allowedConnections', _immutable2.default.fromJS(opts.allowedConnections));
  }

  if (opts.flashMessage) {
    var type = opts.flashMessage.type;

    var typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    m = tset(m, 'global' + typeCapitalized, opts.flashMessage.text);
  }

  if (opts.auth && opts.auth.params) {
    m = tset(m, 'authParams', _immutable2.default.fromJS(opts.auth.params));
  }

  if (opts.theme) {
    if (opts.theme.primaryColor) {
      m = tset(m, ['ui', 'primaryColor'], opts.theme.primaryColor);
    }

    if (opts.theme.logo) {
      m = tset(m, ['ui', 'logo'], opts.theme.logo);
    }
  }

  if (opts.language || opts.languageDictionary) {
    if (opts.language) {
      m = tset(m, ['ui', 'language'], opts.language);
    }

    if (opts.languageDictionary) {
      m = tset(m, ['ui', 'dict'], opts.languageDictionary);
    }

    m = i18n.initI18n(m);
  }

  if (typeof opts.rememberLastLogin === 'boolean') {
    m = tset(m, 'rememberLastLogin', opts.rememberLastLogin);
  }
  if (typeof opts.allowAutocomplete === 'boolean') {
    m = tset(m, 'allowAutocomplete', opts.allowAutocomplete);
  }
  if (typeof opts.allowShowPassword === 'boolean') {
    m = tset(m, 'allowShowPassword', opts.allowShowPassword);
  }
  if (typeof opts.allowPasswordAutocomplete === 'boolean') {
    m = tset(m, 'allowPasswordAutocomplete', opts.allowPasswordAutocomplete);
  }

  return m;
}
