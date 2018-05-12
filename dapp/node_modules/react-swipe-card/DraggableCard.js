'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SimpleCard = require('./SimpleCard');

var _SimpleCard2 = _interopRequireDefault(_SimpleCard);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraggableCard = function (_Component) {
  _inherits(DraggableCard, _Component);

  function DraggableCard(props) {
    _classCallCheck(this, DraggableCard);

    var _this = _possibleConstructorReturn(this, (DraggableCard.__proto__ || Object.getPrototypeOf(DraggableCard)).call(this, props));

    _this.state = {
      x: 0,
      y: 0,
      initialPosition: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
      animation: null,
      pristine: true
    };
    _this.resetPosition = _this.resetPosition.bind(_this);
    _this.handlePan = _this.handlePan.bind(_this);
    return _this;
  }

  _createClass(DraggableCard, [{
    key: 'resetPosition',
    value: function resetPosition() {
      var _props$containerSize = this.props.containerSize,
          x = _props$containerSize.x,
          y = _props$containerSize.y;

      var card = _reactDom2.default.findDOMNode(this);

      var initialPosition = {
        x: Math.round((x - card.offsetWidth) / 2),
        y: Math.round((y - card.offsetHeight) / 2)
      };

      this.setState({
        x: initialPosition.x,
        y: initialPosition.y,
        initialPosition: initialPosition,
        startPosition: { x: 0, y: 0 }
      });
    }
  }, {
    key: 'panstart',
    value: function panstart() {
      var _state = this.state,
          x = _state.x,
          y = _state.y;

      this.setState({
        animation: false,
        startPosition: { x: x, y: y },
        pristine: false
      });
    }
  }, {
    key: 'panend',
    value: function panend(ev) {
      var _this2 = this;

      var screen = this.props.containerSize;
      var card = _reactDom2.default.findDOMNode(this);

      var getDirection = function getDirection() {
        switch (true) {
          case _this2.state.x < -50:
            return 'Left';
          case _this2.state.x + (card.offsetWidth - 50) > screen.x:
            return 'Right';
          case _this2.state.y < -50:
            return 'Top';
          case _this2.state.y + (card.offsetHeight - 50) > screen.y:
            return 'Bottom';
          default:
            return false;
        }
      };
      var direction = getDirection();

      if (this.props['onSwipe' + direction]) {
        this.props['onSwipe' + direction]();
        this.props['onOutScreen' + direction](this.props.index);
      } else {
        this.resetPosition();
        this.setState({ animation: true });
      }
    }
  }, {
    key: 'panmove',
    value: function panmove(ev) {
      this.setState(this.calculatePosition(ev.deltaX, ev.deltaY));
    }
  }, {
    key: 'pancancel',
    value: function pancancel(ev) {
      console.log(ev.type);
    }
  }, {
    key: 'handlePan',
    value: function handlePan(ev) {
      ev.preventDefault();
      this[ev.type](ev);
      return false;
    }
  }, {
    key: 'handleSwipe',
    value: function handleSwipe(ev) {
      console.log(ev.type);
    }
  }, {
    key: 'calculatePosition',
    value: function calculatePosition(deltaX, deltaY) {
      var _state$initialPositio = this.state.initialPosition,
          x = _state$initialPositio.x,
          y = _state$initialPositio.y;

      return {
        x: x + deltaX,
        y: y + deltaY
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hammer = new _hammerjs2.default.Manager(_reactDom2.default.findDOMNode(this));
      this.hammer.add(new _hammerjs2.default.Pan({ threshold: 2 }));

      this.hammer.on('panstart panend pancancel panmove', this.handlePan);
      this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe);

      this.resetPosition();
      window.addEventListener('resize', this.resetPosition);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.hammer) {
        this.hammer.stop();
        this.hammer.destroy();
        this.hammer = null;
      }
      window.removeEventListener('resize', this.resetPosition);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          x = _state2.x,
          y = _state2.y,
          animation = _state2.animation,
          pristine = _state2.pristine;

      var style = (0, _utils.translate3d)(x, y);
      return _react2.default.createElement(_SimpleCard2.default, _extends({}, this.props, { style: style, className: animation ? 'animate' : pristine ? 'inactive' : '' }));
    }
  }]);

  return DraggableCard;
}(_react.Component);

exports.default = DraggableCard;