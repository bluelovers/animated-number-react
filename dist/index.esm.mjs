import { Component as e, createElement as t } from "react";

import { oneOfType as a, number as i, string as n, func as s, bool as u } from "prop-types";

import r from "animejs";

import { isInt as o } from "@lazy-assert/check-basic";

import l from "@lazy-num/to-fixed-number";

function _defineProperty(e, t, a) {
  return (t = function _toPropertyKey(e) {
    var t = function _toPrimitive(e, t) {
      if ("object" != typeof e || null === e) return e;
      var a = e[Symbol.toPrimitive];
      if (void 0 !== a) {
        var i = a.call(e, t || "default");
        if ("object" != typeof i) return i;
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

var p;

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
}(p || (p = {}));

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
      const {animatedValue: i} = this.target;
      this.setState({
        animatedValue: i
      });
    })), _defineProperty(this, "stopAnimation", (() => {
      this.instance && (this.instance.pause(), this.instance.reset(), delete this.instance);
    })), _defineProperty(this, "pauseAnimation", (() => {
      var e;
      null === (e = this.instance) || void 0 === e || e.pause();
    })), _defineProperty(this, "animateValue", (e => {
      var t, a;
      if (this.stopAnimation(), "undefined" == typeof window) return;
      let {duration: i, easing: n, value: s, startValue: u, slow: o, fast: l, fractionDigits: p, startFromPreviousValue: c, ...d} = this.props;
      null !== (t = i) && void 0 !== t || (i = o ? 2500 : l ? 1000 : 1750), null !== (a = n) && void 0 !== a || (n = "easeInOutQuint");
      let m = [ s ];
      var f, O, I;
      m.unshift(!0 === c ? null !== (f = null !== (O = null !== (I = this.state.animatedValue) && void 0 !== I ? I : e) && void 0 !== O ? O : u) && void 0 !== f ? f : 0 : null != u ? u : 0), 
      this.instance = r({
        ...d,
        targets: this.target,
        animatedValue: m,
        duration: i,
        update: this.updateValue,
        easing: n
      });
    }));
  }
  render() {
    var e;
    let {formatValue: a, fractionDigits: i, locale: n} = this.props;
    return null !== (e = i) && void 0 !== e || (i = o(this.props.value) ? 0 : 3), a = a ? e => this.props.formatValue(l(e, i), this.props.value, this.props) : e => {
      let t = l(e, i);
      return (null == n || n) && t && (t = t.toLocaleString()), t;
    }, t("span", {
      className: this.props.className
    }, a(this.state.animatedValue, this.props.value, this.props));
  }
}

_defineProperty(AnimatedNumber, "propTypes", {
  value: a([ i, n ]).isRequired,
  duration: i,
  delay: i,
  formatValue: s,
  startFromPreviousValue: u,
  begin: s,
  complete: s,
  run: s,
  update: s,
  easing: n,
  className: n
}), _defineProperty(AnimatedNumber, "defaultProps", {});

export { AnimatedNumber, p as EnumEasingOptions, AnimatedNumber as default };
//# sourceMappingURL=index.esm.mjs.map
