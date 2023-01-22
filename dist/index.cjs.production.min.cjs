"use strict";

var e, t = require("react"), a = require("prop-types"), n = require("animejs"), i = require("@lazy-assert/check-basic"), u = require("@lazy-num/to-fixed-number");

function _defineProperty(e, t, a) {
  return (t = function _toPropertyKey(e) {
    var t = function _toPrimitive(e, t) {
      if ("object" != typeof e || null === e) return e;
      var a = e[Symbol.toPrimitive];
      if (void 0 !== a) {
        var n = a.call(e, t || "default");
        if ("object" != typeof n) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    }(e, "string");
    return "symbol" == typeof t ? t : String(t);
  }(t)) in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

function createFixedNumberFn(e) {
  var t;
  let {fractionDigits: a} = e;
  return null !== (t = a) && void 0 !== t || (a = i.isInt(e.value) ? 0 : 3), e => u(e, a);
}

!function(e) {
  e.linear = "linear", e.easeInQuad = "easeInQuad", e.easeInCubic = "easeInCubic", 
  e.easeInQuart = "easeInQuart", e.easeInQuint = "easeInQuint", e.easeInSine = "easeInSine", 
  e.easeInExpo = "easeInExpo", e.easeInCirc = "easeInCirc", e.easeInBack = "easeInBack", 
  e.easeInElastic = "easeInElastic", e.easeInBounce = "easeInBounce", e.easeOutQuad = "easeOutQuad", 
  e.easeOutCubic = "easeOutCubic", e.easeOutQuart = "easeOutQuart", e.easeOutQuint = "easeOutQuint", 
  e.easeOutSine = "easeOutSine", e.easeOutExpo = "easeOutExpo", e.easeOutCirc = "easeOutCirc", 
  e.easeOutBack = "easeOutBack", e.easeOutElastic = "easeOutElastic", e.easeOutBounce = "easeOutBounce", 
  e.easeInOutQuad = "easeInOutQuad", e.easeInOutCubic = "easeInOutCubic", e.easeInOutQuart = "easeInOutQuart", 
  e.easeInOutQuint = "easeInOutQuint", e.easeInOutSine = "easeInOutSine", e.easeInOutExpo = "easeInOutExpo", 
  e.easeInOutCirc = "easeInOutCirc", e.easeInOutBack = "easeInOutBack", e.easeInOutElastic = "easeInOutElastic", 
  e.easeInOutBounce = "easeInOutBounce";
}(e || (e = {}));

class AnimatedNumber extends t.Component {
  constructor() {
    super(...arguments), _defineProperty(this, "state", {
      animatedValue: 0
    }), _defineProperty(this, "target", {
      animatedValue: 0
    }), _defineProperty(this, "componentDidMount", (() => {
      this.animateValue();
    })), _defineProperty(this, "componentDidUpdate", (e => {
      e.value === this.props.value && this.instance || this.animateValue(e.value);
    })), _defineProperty(this, "componentWillUnmount", (() => {
      this.stopAnimation();
    })), _defineProperty(this, "updateValue", (e => {
      var t, a;
      null === (t = (a = this.props).update) || void 0 === t || t.call(a, e);
      const {animatedValue: n} = this.target;
      this.setState({
        animatedValue: n
      });
    })), _defineProperty(this, "stopAnimation", (() => {
      this.instance && (this.instance.pause(), this.instance.reset(), delete this.instance);
    })), _defineProperty(this, "pauseAnimation", (() => {
      var e;
      null === (e = this.instance) || void 0 === e || e.pause();
    })), _defineProperty(this, "animateValue", (e => {
      var t, a, i, u;
      if (this.stopAnimation(), "undefined" == typeof window) return;
      let {duration: s, easing: r, value: o, startValue: l, slow: c, fast: d, fractionDigits: p, startFromPreviousValue: m, ...f} = this.props;
      null !== (t = s) && void 0 !== t || (s = c ? 2500 : d ? 1000 : 1750), null !== (a = r) && void 0 !== a || (r = "easeInOutQuint");
      let O = !0 === m && null !== (i = null !== (u = this.state.animatedValue) && void 0 !== u ? u : e) && void 0 !== i ? i : l;
      this.instance = n({
        ...f,
        targets: this.target,
        animatedValue: [ null != O ? O : 0, o ],
        duration: s,
        update: this.updateValue,
        easing: r
      });
    })), _defineProperty(this, "render", (() => {
      const e = function createFormatValueFn(e) {
        const t = createFixedNumberFn(e);
        let a;
        return a = e.formatValue ? (e, a, n) => n.formatValue(t(e), a, n) : (e, a, n) => {
          let i = t(e);
          return i && n.locale && (i = i.toLocaleString()), i;
        }, a;
      }(this.props);
      return t.createElement("span", {
        className: this.props.className
      }, e(this.state.animatedValue, this.props.value, this.props));
    }));
  }
}

_defineProperty(AnimatedNumber, "propTypes", {
  value: a.oneOfType([ a.number, a.string ]).isRequired,
  duration: a.number,
  delay: a.number,
  formatValue: a.func,
  startFromPreviousValue: a.bool,
  begin: a.func,
  complete: a.func,
  run: a.func,
  update: a.func,
  easing: a.string,
  className: a.string
}), _defineProperty(AnimatedNumber, "defaultProps", {}), Object.defineProperty(AnimatedNumber, "__esModule", {
  value: !0
}), Object.defineProperty(AnimatedNumber, "AnimatedNumber", {
  value: AnimatedNumber
}), Object.defineProperty(AnimatedNumber, "default", {
  value: AnimatedNumber
}), Object.defineProperty(AnimatedNumber, "EnumEasingOptions", {
  value: e
}), module.exports = AnimatedNumber;
//# sourceMappingURL=index.cjs.production.min.cjs.map
