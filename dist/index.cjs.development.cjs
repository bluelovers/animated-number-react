'use strict';

var react = require('react');
var propTypes = require('prop-types');
var anime = require('animejs');

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var EnumEasingOptions;
(function (EnumEasingOptions) {
  EnumEasingOptions["linear"] = "linear";
  EnumEasingOptions["easeInQuad"] = "easeInQuad";
  EnumEasingOptions["easeInCubic"] = "easeInCubic";
  EnumEasingOptions["easeInQuart"] = "easeInQuart";
  EnumEasingOptions["easeInQuint"] = "easeInQuint";
  EnumEasingOptions["easeInSine"] = "easeInSine";
  EnumEasingOptions["easeInExpo"] = "easeInExpo";
  EnumEasingOptions["easeInCirc"] = "easeInCirc";
  EnumEasingOptions["easeInBack"] = "easeInBack";
  EnumEasingOptions["easeInElastic"] = "easeInElastic";
  EnumEasingOptions["easeInBounce"] = "easeInBounce";
  EnumEasingOptions["easeOutQuad"] = "easeOutQuad";
  EnumEasingOptions["easeOutCubic"] = "easeOutCubic";
  EnumEasingOptions["easeOutQuart"] = "easeOutQuart";
  EnumEasingOptions["easeOutQuint"] = "easeOutQuint";
  EnumEasingOptions["easeOutSine"] = "easeOutSine";
  EnumEasingOptions["easeOutExpo"] = "easeOutExpo";
  EnumEasingOptions["easeOutCirc"] = "easeOutCirc";
  EnumEasingOptions["easeOutBack"] = "easeOutBack";
  EnumEasingOptions["easeOutElastic"] = "easeOutElastic";
  EnumEasingOptions["easeOutBounce"] = "easeOutBounce";
  EnumEasingOptions["easeInOutQuad"] = "easeInOutQuad";
  EnumEasingOptions["easeInOutCubic"] = "easeInOutCubic";
  EnumEasingOptions["easeInOutQuart"] = "easeInOutQuart";
  EnumEasingOptions["easeInOutQuint"] = "easeInOutQuint";
  EnumEasingOptions["easeInOutSine"] = "easeInOutSine";
  EnumEasingOptions["easeInOutExpo"] = "easeInOutExpo";
  EnumEasingOptions["easeInOutCirc"] = "easeInOutCirc";
  EnumEasingOptions["easeInOutBack"] = "easeInOutBack";
  EnumEasingOptions["easeInOutElastic"] = "easeInOutElastic";
  EnumEasingOptions["easeInOutBounce"] = "easeInOutBounce";
})(EnumEasingOptions || (EnumEasingOptions = {}));
class AnimatedNumber extends react.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      animatedValue: 0
    });
    _defineProperty(this, "target", {
      animatedValue: 0
    });
  }
  componentDidMount() {
    this.animateValue();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) this.animateValue();
  }
  componentWillUnmount() {
    this.stopAnimation();
  }
  updateValue(anima) {
    var _this$props$update, _this$props;
    (_this$props$update = (_this$props = this.props).update) === null || _this$props$update === void 0 ? void 0 : _this$props$update.call(_this$props, anima);
    const {
      animatedValue
    } = this.target;
    this.setState({
      animatedValue
    });
  }
  stopAnimation() {
    if (!this.instance) return;
    this.instance.pause();
    this.instance.reset();
    delete this.instance;
  }
  animateValue() {
    var _duration, _easing;
    this.stopAnimation();
    if (typeof window === 'undefined') {
      return;
    }
    let {
      duration,
      easing,
      value,
      startValue,
      slow,
      fast,
      ...props
    } = this.props;
    (_duration = duration) !== null && _duration !== void 0 ? _duration : duration = slow ? 2500 : fast ? 1000 : 1750;
    (_easing = easing) !== null && _easing !== void 0 ? _easing : easing = "easeInOutQuint";
    this.instance = anime({
      ...props,
      targets: this.target,
      animatedValue: [startValue || 0, value],
      duration,
      update: this.updateValue,
      easing
    });
  }
  render() {
    return react.createElement('span', {
      className: this.props.className
    }, this.props.formatValue(this.state.animatedValue, this.props.value, this.props));
  }
}
_defineProperty(AnimatedNumber, "propTypes", {
  value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  duration: propTypes.number,
  delay: propTypes.number,
  formatValue: propTypes.func,
  begin: propTypes.func,
  complete: propTypes.func,
  run: propTypes.func,
  update: propTypes.func,
  easing: propTypes.string,
  className: propTypes.string
});
_defineProperty(AnimatedNumber, "defaultProps", {
  formatValue: value => value
});
{
  Object.defineProperty(AnimatedNumber, "__esModule", {
    value: true
  });
  Object.defineProperty(AnimatedNumber, 'AnimatedNumber', {
    value: AnimatedNumber
  });
  Object.defineProperty(AnimatedNumber, 'default', {
    value: AnimatedNumber
  });
  Object.defineProperty(AnimatedNumber, 'EnumEasingOptions', {
    value: EnumEasingOptions
  });
}

// @ts-ignore
module.exports = AnimatedNumber;
//# sourceMappingURL=index.cjs.development.cjs.map
