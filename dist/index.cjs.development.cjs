'use strict';

var react = require('react');
var propTypes = require('prop-types');
var anime = require('animejs');
var checkBasic = require('@lazy-assert/check-basic');
var toFixedNumber = require('@lazy-num/to-fixed-number');

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
    _defineProperty(this, "componentDidMount", () => {
      this.animateValue();
    });
    _defineProperty(this, "componentDidUpdate", prevProps => {
      if (prevProps.value !== this.props.value) this.animateValue(prevProps.value);
    });
    _defineProperty(this, "componentWillUnmount", () => {
      this.stopAnimation();
    });
    _defineProperty(this, "updateValue", anima => {
      var _this$props$update, _this$props;
      (_this$props$update = (_this$props = this.props).update) === null || _this$props$update === void 0 ? void 0 : _this$props$update.call(_this$props, anima);
      const {
        animatedValue
      } = this.target;
      this.setState({
        animatedValue
      });
    });
    _defineProperty(this, "stopAnimation", () => {
      if (!this.instance) return;
      this.instance.pause();
      this.instance.reset();
      delete this.instance;
    });
    _defineProperty(this, "pauseAnimation", () => {
      var _this$instance;
      (_this$instance = this.instance) === null || _this$instance === void 0 ? void 0 : _this$instance.pause();
    });
    _defineProperty(this, "animateValue", oldValue => {
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
        fractionDigits,
        startFromPreviousValue,
        ...props
      } = this.props;
      (_duration = duration) !== null && _duration !== void 0 ? _duration : duration = slow ? 2500 : fast ? 1000 : 1750;
      (_easing = easing) !== null && _easing !== void 0 ? _easing : easing = "easeInOutQuint";
      let animatedValue = [value];
      if (startFromPreviousValue === true) {
        var _ref, _ref2, _this$state$animatedV;
        animatedValue.unshift((_ref = (_ref2 = (_this$state$animatedV = this.state.animatedValue) !== null && _this$state$animatedV !== void 0 ? _this$state$animatedV : oldValue) !== null && _ref2 !== void 0 ? _ref2 : startValue) !== null && _ref !== void 0 ? _ref : 0);
      } else {
        animatedValue.unshift(startValue !== null && startValue !== void 0 ? startValue : 0);
      }
      this.instance = anime({
        ...props,
        targets: this.target,
        animatedValue,
        duration,
        update: this.updateValue,
        easing
      });
    });
  }
  render() {
    var _fractionDigits;
    let {
      formatValue,
      fractionDigits,
      locale
    } = this.props;
    (_fractionDigits = fractionDigits) !== null && _fractionDigits !== void 0 ? _fractionDigits : fractionDigits = checkBasic.isInt(this.props.value) ? 0 : 3;
    if (formatValue) {
      formatValue = current => this.props.formatValue(toFixedNumber(current, fractionDigits), this.props.value, this.props);
    } else {
      formatValue = current => {
        let result = toFixedNumber(current, fractionDigits);
        if ((locale !== null && locale !== void 0 ? locale : true) && result) {
          result = result.toLocaleString();
        }
        return result;
      };
    }
    return react.createElement('span', {
      className: this.props.className
    }, formatValue(this.state.animatedValue, this.props.value, this.props));
  }
}
_defineProperty(AnimatedNumber, "propTypes", {
  value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  duration: propTypes.number,
  delay: propTypes.number,
  formatValue: propTypes.func,
  startFromPreviousValue: propTypes.bool,
  begin: propTypes.func,
  complete: propTypes.func,
  run: propTypes.func,
  update: propTypes.func,
  easing: propTypes.string,
  className: propTypes.string
});
_defineProperty(AnimatedNumber, "defaultProps", {});
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
