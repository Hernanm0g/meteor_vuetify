quoteReg = /'/g
lineReg = /\r?\n|\r/g
tagReg = /<([\w\d-]+)((\s+.*?)*)?\/?>/ig
classAttrReg = /\s+class=([''])(.*?)\1/gi
rnReg = /\r\n/g
rReg = /\r/g
tagCommentRegex = /<!--([\s\S]+?)-->/igm
expandedTagRegex = /<(template|script)(\s+.*)?>\n?([\s\S]+)<\/\1>/igm
limitedTagRegex = /<(style)(\s+.*)?>\n?([\s\S]+?)<\/\1>/igm
attrsRegex = /\s+(\w+)(=(["'])([\w/~$@:.-]*)\3)?/ig
globalFileNameReg = /\.global\.vue$/
capitalLetterReg = /([A-Z])/g
trimDashReg = /^-/
nonWordCharReg = /\W/g
requireRelativeFileReg = /require\(["']\.\//ig

splitRE = /\r?\n/g
emptyRE = /^(?:\/\/)?\s*$/
