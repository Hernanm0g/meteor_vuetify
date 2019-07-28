'use strict';

exports.__esModule = true;
exports.img = img;
function img(src) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var img = document.createElement('img');
  img.addEventListener('load', function () {
    cb(null, img);
  });
  img.addEventListener('error', function (event) {
    cb(event);
  });
  img.src = src;
  return img;
}
