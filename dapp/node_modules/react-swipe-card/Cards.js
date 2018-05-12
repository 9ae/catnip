'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwipeCards = function (_Component) {
  _inherits(SwipeCards, _Component);

  function SwipeCards(props) {
    _classCallCheck(this, SwipeCards);

    var _this = _possibleConstructorReturn(this, (SwipeCards.__proto__ || Object.getPrototypeOf(SwipeCards)).call(this, props));

    _this.state = {
      index: 0,
      alertLeft: false,
      alertRight: false,
      alertTop: false,
      alertBottom: false,
      containerSize: { x: 0, y: 0 }
    };
    _this.removeCard = _this.removeCard.bind(_this);
    _this.setSize = _this.setSize.bind(_this);
    return _this;
  }

  _createClass(SwipeCards, [{
    key: 'removeCard',
    value: function removeCard(side, cardId) {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          onEnd = _props.onEnd;

      setTimeout(function () {
        return _this2.setState(_defineProperty({}, 'alert' + side, false));
      }, 300);

      if (children.length === this.state.index + 1 && onEnd) onEnd();

      this.setState(_defineProperty({
        index: this.state.index + 1
      }, 'alert' + side, true));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSize();
      window.addEventListener('resize', this.setSize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setSize);
    }
  }, {
    key: 'setSize',
    value: function setSize() {
      var container = _reactDom2.default.findDOMNode(this);
      var containerSize = {
        x: container.offsetWidth,
        y: container.offsetHeight
      };
      this.setState({ containerSize: containerSize });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          index = _state.index,
          containerSize = _state.containerSize;
      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className,
          onSwipeTop = _props2.onSwipeTop,
          onSwipeBottom = _props2.onSwipeBottom;

      if (!containerSize.x || !containerSize.y) return _react2.default.createElement('div', { className: className });

      var _cards = children.reduce(function (memo, c, i) {
        if (index > i) return memo;
        var props = _extends({
          key: i,
          containerSize: containerSize,
          index: children.length - index
        }, _utils.DIRECTIONS.reduce(function (m, d) {
          return _extends({}, m, _defineProperty({}, 'onOutScreen' + d, function undefined() {
            return _this3.removeCard(d);
          }));
        }, {}), {
          active: index === i
        });
        return [(0, _react.cloneElement)(c, props)].concat(_toConsumableArray(memo));
      }, []);

      return _react2.default.createElement(
        'div',
        { className: className },
        _utils.DIRECTIONS.map(function (d) {
          return _react2.default.createElement(
            'div',
            { key: d, className: (_this3.state['alert' + d] ? 'alert-visible' : '') + ' alert-' + d.toLowerCase() + ' alert' },
            _this3.props['alert' + d]
          );
        }),
        _react2.default.createElement(
          'div',
          { id: 'cards' },
          _cards
        )
      );
    }
  }]);

  return SwipeCards;
}(_react.Component);

exports.default = SwipeCards;