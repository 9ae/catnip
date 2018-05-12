'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleCard = require('./SimpleCard');

var _SimpleCard2 = _interopRequireDefault(_SimpleCard);

var _DraggableCard = require('./DraggableCard');

var _DraggableCard2 = _interopRequireDefault(_DraggableCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Card = function Card(_ref) {
  var _ref$active = _ref.active,
      active = _ref$active === undefined ? false : _ref$active,
      props = _objectWithoutProperties(_ref, ['active']);

  var component = active ? _DraggableCard2.default : _SimpleCard2.default;
  return (0, _react.createElement)(component, props);
};

exports.default = Card;