import { Component as e, createElement as t } from "react";

import { oneOfType as a, number as n, string as i, func as s, bool as u } from "prop-types";

import r from "animejs";

import { isInt as o } from "@lazy-assert/check-basic";

import l from "@lazy-num/to-fixed-number";

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

var c;

function createFixedNumberFn(e) {
  var t;
  let {fractionDigits: a} = e;
  return null !== (t = a) && void 0 !== t || (a = o(e.value) ? 0 : 3), e => l(e, a);
}

function createFormatValueFn(e) {
  const t = createFixedNumberFn(e);
  let a;
  return a = e.formatValue ? (e, a, n) => n.formatValue(t(e), a, n) : (e, a, n) => {
    let i = t(e);
    return i && n.locale && (i = i.toLocaleString()), i;
  }, a;
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
}(c || (c = {}));

class AnimatedNumber extends e {
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
      var t, a, n, i;
      if (this.stopAnimation(), "undefined" == typeof window) return;
      let {duration: s, easing: u, value: o, startValue: l, slow: c, fast: p, fractionDigits: d, startFromPreviousValue: m, ...f} = this.props;
      null !== (t = s) && void 0 !== t || (s = c ? 2500 : p ? 1000 : 1750), null !== (a = u) && void 0 !== a || (u = "easeInOutQuint");
      let O = !0 === m && null !== (n = null !== (i = this.state.animatedValue) && void 0 !== i ? i : e) && void 0 !== n ? n : l;
      this.instance = r({
        ...f,
        targets: this.target,
        animatedValue: [ null != O ? O : 0, o ],
        duration: s,
        update: this.updateValue,
        easing: u
      });
    })), _defineProperty(this, "render", (() => {
      const e = createFormatValueFn(this.props);
      return t("span", {
        className: this.props.className
      }, e(this.state.animatedValue, this.props.value, this.props));
    }));
  }
}

_defineProperty(AnimatedNumber, "propTypes", {
  value: a([ n, i ]).isRequired,
  duration: n,
  delay: n,
  formatValue: s,
  startFromPreviousValue: u,
  begin: s,
  complete: s,
  run: s,
  update: s,
  easing: i,
  className: i
}), _defineProperty(AnimatedNumber, "defaultProps", {});

export { AnimatedNumber, c as EnumEasingOptions, createFixedNumberFn, createFormatValueFn, AnimatedNumber as default };
//# sourceMappingURL=index.esm.mjs.map
