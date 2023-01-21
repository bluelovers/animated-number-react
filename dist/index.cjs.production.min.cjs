"use strict";

var e, t = require("react"), a = require("prop-types"), n = require("animejs");

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
    let {duration: a, easing: u, value: i, startValue: s, slow: r, fast: o, ...c} = this.props;
    null !== (e = a) && void 0 !== e || (a = r ? 2500 : o ? 1000 : 1750), null !== (t = u) && void 0 !== t || (u = "easeInOutQuint"), 
    this.instance = n({
      ...c,
      targets: this.target,
      animatedValue: [ s || 0, i ],
      duration: a,
      update: this.updateValue,
      easing: u
    });
  }
  render() {
    return t.createElement("span", {
      className: this.props.className
    }, this.props.formatValue(this.state.animatedValue, this.props.value, this.props));
  }
}

_defineProperty(AnimatedNumber, "propTypes", {
  value: a.oneOfType([ a.number, a.string ]).isRequired,
  duration: a.number,
  delay: a.number,
  formatValue: a.func,
  begin: a.func,
  complete: a.func,
  run: a.func,
  update: a.func,
  easing: a.string,
  className: a.string
}), _defineProperty(AnimatedNumber, "defaultProps", {
  formatValue: e => e
}), Object.defineProperty(AnimatedNumber, "__esModule", {
  value: !0
}), Object.defineProperty(AnimatedNumber, "AnimatedNumber", {
  value: AnimatedNumber
}), Object.defineProperty(AnimatedNumber, "default", {
  value: AnimatedNumber
}), Object.defineProperty(AnimatedNumber, "EnumEasingOptions", {
  value: e
}), module.exports = AnimatedNumber;
//# sourceMappingURL=index.cjs.production.min.cjs.map
