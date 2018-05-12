'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var translate3d = exports.translate3d = function translate3d(x, y) {
  var translate = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate
  };
};

var DIRECTIONS = exports.DIRECTIONS = ['Right', 'Left', 'Top', 'Bottom'];