import { Component as e, createElement as t } from "react";

import { oneOfType as a, number as n, string as s, func as u } from "prop-types";

import i from "animejs";

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

var r;

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
}(r || (r = {}));

class AnimatedNumber extends e {
  constructor() {
    super(...arguments), _defineProperty(this, "state", {
      animatedValue: 0
    }), _defineProperty(this, "target", {
      animatedValue: 0
    });
  }
  componentDidMount() {
    this.animateValue();
  }
  componentDidUpdate(e) {
    e.value !== this.props.value && this.animateValue();
  }
  componentWillUnmount() {
    this.stopAnimation();
  }
  updateValue(e) {
    var t, a;
    null === (t = (a = this.props).update) || void 0 === t || t.call(a, e);
    const {animatedValue: n} = this.target;
    this.setState({
      animatedValue: n
    });
  }
  stopAnimation() {
    this.instance && (this.instance.pause(), this.instance.reset(), delete this.instance);
  }
  animateValue() {
    var e, t;
    if (this.stopAnimation(), "undefined" == typeof window) return;
    let {duration: a, easing: n, value: s, startValue: u, slow: r, fast: o, ...l} = this.props;
    null !== (e = a) && void 0 !== e || (a = r ? 2500 : o ? 1000 : 1750), null !== (t = n) && void 0 !== t || (n = "easeInOutQuint"), 
    this.instance = i({
      ...l,
      targets: this.target,
      animatedValue: [ u || 0, s ],
      duration: a,
      update: this.updateValue,
      easing: n
    });
  }
  render() {
    return t("span", {
      className: this.props.className
    }, this.props.formatValue(this.state.animatedValue, this.props.value, this.props));
  }
}

_defineProperty(AnimatedNumber, "propTypes", {
  value: a([ n, s ]).isRequired,
  duration: n,
  delay: n,
  formatValue: u,
  begin: u,
  complete: u,
  run: u,
  update: u,
  easing: s,
  className: s
}), _defineProperty(AnimatedNumber, "defaultProps", {
  formatValue: e => e
});

export { AnimatedNumber, r as EnumEasingOptions, AnimatedNumber as default };
//# sourceMappingURL=index.esm.mjs.map
