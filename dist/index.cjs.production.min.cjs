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
      var t, a;
      if (this.stopAnimation(), "undefined" == typeof window) return;
      let {duration: i, easing: u, value: s, startValue: r, slow: o, fast: l, fractionDigits: p, startFromPreviousValue: c, ...d} = this.props;
      null !== (t = i) && void 0 !== t || (i = o ? 2500 : l ? 1000 : 1750), null !== (a = u) && void 0 !== a || (u = "easeInOutQuint");
      let m = [ s ];
      var f, O, I;
      m.unshift(!0 === c ? null !== (f = null !== (O = null !== (I = this.state.animatedValue) && void 0 !== I ? I : e) && void 0 !== O ? O : r) && void 0 !== f ? f : 0 : null != r ? r : 0), 
      this.instance = n({
        ...d,
        targets: this.target,
        animatedValue: m,
        duration: i,
        update: this.updateValue,
        easing: u
      });
    }));
  }
  render() {
    var e;
    let {formatValue: a, fractionDigits: n, locale: s} = this.props;
    return null !== (e = n) && void 0 !== e || (n = i.isInt(this.props.value) ? 0 : 3), 
    a = a ? e => this.props.formatValue(u(e, n), this.props.value, this.props) : e => {
      let t = u(e, n);
      return (null == s || s) && t && (t = t.toLocaleString()), t;
    }, t.createElement("span", {
      className: this.props.className
    }, a(this.state.animatedValue, this.props.value, this.props));
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
