/*!
 * Flickity PACKAGED v2.3.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */
(function (e, i) {
  if (typeof define == "function" && define.amd) {
    define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("jquery"));
  } else {
    e.jQueryBridget = i(e, e.jQuery);
  }
})(window, function t(e, r) {
  "use strict";
  var o = Array.prototype.slice;
  var i = e.console;
  var u =
    typeof i == "undefined"
      ? function () {}
      : function (t) {
          i.error(t);
        };
  function n(h, s, c) {
    c = c || r || e.jQuery;
    if (!c) {
      return;
    }
    if (!s.prototype.option) {
      s.prototype.option = function (t) {
        if (!c.isPlainObject(t)) {
          return;
        }
        this.options = c.extend(true, this.options, t);
      };
    }
    c.fn[h] = function (t) {
      if (typeof t == "string") {
        var e = o.call(arguments, 1);
        return i(this, t, e);
      }
      n(this, t);
      return this;
    };
    function i(t, r, o) {
      var a;
      var l = "$()." + h + '("' + r + '")';
      t.each(function (t, e) {
        var i = c.data(e, h);
        if (!i) {
          u(h + " not initialized. Cannot call methods, i.e. " + l);
          return;
        }
        var n = i[r];
        if (!n || r.charAt(0) == "_") {
          u(l + " is not a valid method");
          return;
        }
        var s = n.apply(i, o);
        a = a === undefined ? s : a;
      });
      return a !== undefined ? a : t;
    }
    function n(t, n) {
      t.each(function (t, e) {
        var i = c.data(e, h);
        if (i) {
          i.option(n);
          i._init();
        } else {
          i = new s(e, n);
          c.data(e, h, i);
        }
      });
    }
    a(c);
  }
  function a(t) {
    if (!t || (t && t.bridget)) {
      return;
    }
    t.bridget = n;
  }
  a(r || e.jQuery);
  return n;
});
(function (t, e) {
  if (typeof define == "function" && define.amd) {
    define("ev-emitter/ev-emitter", e);
  } else if (typeof module == "object" && module.exports) {
    module.exports = e();
  } else {
    t.EvEmitter = e();
  }
})(typeof window != "undefined" ? window : this, function () {
  function t() {}
  var e = t.prototype;
  e.on = function (t, e) {
    if (!t || !e) {
      return;
    }
    var i = (this._events = this._events || {});
    var n = (i[t] = i[t] || []);
    if (n.indexOf(e) == -1) {
      n.push(e);
    }
    return this;
  };
  e.once = function (t, e) {
    if (!t || !e) {
      return;
    }
    this.on(t, e);
    var i = (this._onceEvents = this._onceEvents || {});
    var n = (i[t] = i[t] || {});
    n[e] = true;
    return this;
  };
  e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (!i || !i.length) {
      return;
    }
    var n = i.indexOf(e);
    if (n != -1) {
      i.splice(n, 1);
    }
    return this;
  };
  e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (!i || !i.length) {
      return;
    }
    i = i.slice(0);
    e = e || [];
    var n = this._onceEvents && this._onceEvents[t];
    for (var s = 0; s < i.length; s++) {
      var r = i[s];
      var o = n && n[r];
      if (o) {
        this.off(t, r);
        delete n[r];
      }
      r.apply(this, e);
    }
    return this;
  };
  e.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };
  return t;
});
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */
(function (t, e) {
  if (typeof define == "function" && define.amd) {
    define("get-size/get-size", e);
  } else if (typeof module == "object" && module.exports) {
    module.exports = e();
  } else {
    t.getSize = e();
  }
})(window, function t() {
  "use strict";
  function m(t) {
    var e = parseFloat(t);
    var i = t.indexOf("%") == -1 && !isNaN(e);
    return i && e;
  }
  function e() {}
  var i =
    typeof console == "undefined"
      ? e
      : function (t) {
          console.error(t);
        };
  var y = [
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginBottom",
    "borderLeftWidth",
    "borderRightWidth",
    "borderTopWidth",
    "borderBottomWidth",
  ];
  var b = y.length;
  function E() {
    var t = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0,
    };
    for (var e = 0; e < b; e++) {
      var i = y[e];
      t[i] = 0;
    }
    return t;
  }
  function S(t) {
    var e = getComputedStyle(t);
    if (!e) {
      i(
        "Style returned " +
          e +
          ". Are you running this code in a hidden iframe on Firefox? " +
          "See https://bit.ly/getsizebug1"
      );
    }
    return e;
  }
  var n = false;
  var C;
  function x() {
    if (n) {
      return;
    }
    n = true;
    var t = document.createElement("div");
    t.style.width = "200px";
    t.style.padding = "1px 2px 3px 4px";
    t.style.borderStyle = "solid";
    t.style.borderWidth = "1px 2px 3px 4px";
    t.style.boxSizing = "border-box";
    var e = document.body || document.documentElement;
    e.appendChild(t);
    var i = S(t);
    C = Math.round(m(i.width)) == 200;
    s.isBoxSizeOuter = C;
    e.removeChild(t);
  }
  function s(t) {
    x();
    if (typeof t == "string") {
      t = document.querySelector(t);
    }
    if (!t || typeof t != "object" || !t.nodeType) {
      return;
    }
    var e = S(t);
    if (e.display == "none") {
      return E();
    }
    var i = {};
    i.width = t.offsetWidth;
    i.height = t.offsetHeight;
    var n = (i.isBorderBox = e.boxSizing == "border-box");
    for (var s = 0; s < b; s++) {
      var r = y[s];
      var o = e[r];
      var a = parseFloat(o);
      i[r] = !isNaN(a) ? a : 0;
    }
    var l = i.paddingLeft + i.paddingRight;
    var h = i.paddingTop + i.paddingBottom;
    var c = i.marginLeft + i.marginRight;
    var u = i.marginTop + i.marginBottom;
    var d = i.borderLeftWidth + i.borderRightWidth;
    var f = i.borderTopWidth + i.borderBottomWidth;
    var p = n && C;
    var v = m(e.width);
    if (v !== false) {
      i.width = v + (p ? 0 : l + d);
    }
    var g = m(e.height);
    if (g !== false) {
      i.height = g + (p ? 0 : h + f);
    }
    i.innerWidth = i.width - (l + d);
    i.innerHeight = i.height - (h + f);
    i.outerWidth = i.width + c;
    i.outerHeight = i.height + u;
    return i;
  }
  return s;
});
(function (t, e) {
  "use strict";
  if (typeof define == "function" && define.amd) {
    define("desandro-matches-selector/matches-selector", e);
  } else if (typeof module == "object" && module.exports) {
    module.exports = e();
  } else {
    t.matchesSelector = e();
  }
})(window, function t() {
  "use strict";
  var n = (function () {
    var t = window.Element.prototype;
    if (t.matches) {
      return "matches";
    }
    if (t.matchesSelector) {
      return "matchesSelector";
    }
    var e = ["webkit", "moz", "ms", "o"];
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      var s = n + "MatchesSelector";
      if (t[s]) {
        return s;
      }
    }
  })();
  return function t(e, i) {
    return e[n](i);
  };
});
(function (e, i) {
  if (typeof define == "function" && define.amd) {
    define("fizzy-ui-utils/utils", [
      "desandro-matches-selector/matches-selector",
    ], function (t) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("desandro-matches-selector"));
  } else {
    e.fizzyUIUtils = i(e, e.matchesSelector);
  }
})(window, function t(h, r) {
  var c = {};
  c.extend = function (t, e) {
    for (var i in e) {
      t[i] = e[i];
    }
    return t;
  };
  c.modulo = function (t, e) {
    return ((t % e) + e) % e;
  };
  var i = Array.prototype.slice;
  c.makeArray = function (t) {
    if (Array.isArray(t)) {
      return t;
    }
    if (t === null || t === undefined) {
      return [];
    }
    var e = typeof t == "object" && typeof t.length == "number";
    if (e) {
      return i.call(t);
    }
    return [t];
  };
  c.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    if (i != -1) {
      t.splice(i, 1);
    }
  };
  c.getParent = function (t, e) {
    while (t.parentNode && t != document.body) {
      t = t.parentNode;
      if (r(t, e)) {
        return t;
      }
    }
  };
  c.getQueryElement = function (t) {
    if (typeof t == "string") {
      return document.querySelector(t);
    }
    return t;
  };
  c.handleEvent = function (t) {
    var e = "on" + t.type;
    if (this[e]) {
      this[e](t);
    }
  };
  c.filterFindElements = function (t, n) {
    t = c.makeArray(t);
    var s = [];
    t.forEach(function (t) {
      if (!(t instanceof HTMLElement)) {
        return;
      }
      if (!n) {
        s.push(t);
        return;
      }
      if (r(t, n)) {
        s.push(t);
      }
      var e = t.querySelectorAll(n);
      for (var i = 0; i < e.length; i++) {
        s.push(e[i]);
      }
    });
    return s;
  };
  c.debounceMethod = function (t, e, n) {
    n = n || 100;
    var s = t.prototype[e];
    var r = e + "Timeout";
    t.prototype[e] = function () {
      var t = this[r];
      clearTimeout(t);
      var e = arguments;
      var i = this;
      this[r] = setTimeout(function () {
        s.apply(i, e);
        delete i[r];
      }, n);
    };
  };
  c.docReady = function (t) {
    var e = document.readyState;
    if (e == "complete" || e == "interactive") {
      setTimeout(t);
    } else {
      document.addEventListener("DOMContentLoaded", t);
    }
  };
  c.toDashed = function (t) {
    return t
      .replace(/(.)([A-Z])/g, function (t, e, i) {
        return e + "-" + i;
      })
      .toLowerCase();
  };
  var u = h.console;
  c.htmlInit = function (a, l) {
    c.docReady(function () {
      var t = c.toDashed(l);
      var s = "data-" + t;
      var e = document.querySelectorAll("[" + s + "]");
      var i = document.querySelectorAll(".js-" + t);
      var n = c.makeArray(e).concat(c.makeArray(i));
      var r = s + "-options";
      var o = h.jQuery;
      n.forEach(function (e) {
        var t = e.getAttribute(s) || e.getAttribute(r);
        var i;
        try {
          i = t && JSON.parse(t);
        } catch (t) {
          if (u) {
            u.error("Error parsing " + s + " on " + e.className + ": " + t);
          }
          return;
        }
        var n = new a(e, i);
        if (o) {
          o.data(e, l, n);
        }
      });
    });
  };
  return c;
});
(function (e, i) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/cell", ["get-size/get-size"], function (t) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("get-size"));
  } else {
    e.Flickity = e.Flickity || {};
    e.Flickity.Cell = i(e, e.getSize);
  }
})(window, function t(e, i) {
  function n(t, e) {
    this.element = t;
    this.parent = e;
    this.create();
  }
  var s = n.prototype;
  s.create = function () {
    this.element.style.position = "absolute";
    this.element.setAttribute("aria-hidden", "true");
    this.x = 0;
    this.shift = 0;
    this.element.style[this.parent.originSide] = 0;
  };
  s.destroy = function () {
    this.unselect();
    this.element.style.position = "";
    var t = this.parent.originSide;
    this.element.style[t] = "";
    this.element.style.transform = "";
    this.element.removeAttribute("aria-hidden");
  };
  s.getSize = function () {
    this.size = i(this.element);
  };
  s.setPosition = function (t) {
    this.x = t;
    this.updateTarget();
    this.renderPosition(t);
  };
  s.updateTarget = s.setDefaultTarget = function () {
    var t = this.parent.originSide == "left" ? "marginLeft" : "marginRight";
    this.target =
      this.x + this.size[t] + this.size.width * this.parent.cellAlign;
  };
  s.renderPosition = function (t) {
    var e = this.parent.originSide === "left" ? 1 : -1;
    var i = this.parent.options.percentPosition
      ? t * e * (this.parent.size.innerWidth / this.size.width)
      : t * e;
    this.element.style.transform =
      "translateX(" + this.parent.getPositionValue(i) + ")";
  };
  s.select = function () {
    this.element.classList.add("is-selected");
    this.element.removeAttribute("aria-hidden");
  };
  s.unselect = function () {
    this.element.classList.remove("is-selected");
    this.element.setAttribute("aria-hidden", "true");
  };
  s.wrapShift = function (t) {
    this.shift = t;
    this.renderPosition(this.x + this.parent.slideableWidth * t);
  };
  s.remove = function () {
    this.element.parentNode.removeChild(this.element);
  };
  return n;
});
(function (t, e) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/slide", e);
  } else if (typeof module == "object" && module.exports) {
    module.exports = e();
  } else {
    t.Flickity = t.Flickity || {};
    t.Flickity.Slide = e();
  }
})(window, function t() {
  "use strict";
  function e(t) {
    this.parent = t;
    this.isOriginLeft = t.originSide == "left";
    this.cells = [];
    this.outerWidth = 0;
    this.height = 0;
  }
  var i = e.prototype;
  i.addCell = function (t) {
    this.cells.push(t);
    this.outerWidth += t.size.outerWidth;
    this.height = Math.max(t.size.outerHeight, this.height);
    if (this.cells.length == 1) {
      this.x = t.x;
      var e = this.isOriginLeft ? "marginLeft" : "marginRight";
      this.firstMargin = t.size[e];
    }
  };
  i.updateTarget = function () {
    var t = this.isOriginLeft ? "marginRight" : "marginLeft";
    var e = this.getLastCell();
    var i = e ? e.size[t] : 0;
    var n = this.outerWidth - (this.firstMargin + i);
    this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
  };
  i.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  };
  i.select = function () {
    this.cells.forEach(function (t) {
      t.select();
    });
  };
  i.unselect = function () {
    this.cells.forEach(function (t) {
      t.unselect();
    });
  };
  i.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  };
  return e;
});
(function (e, i) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (t) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("fizzy-ui-utils"));
  } else {
    e.Flickity = e.Flickity || {};
    e.Flickity.animatePrototype = i(e, e.fizzyUIUtils);
  }
})(window, function t(e, i) {
  var n = {};
  n.startAnimation = function () {
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;
    this.restingFrames = 0;
    this.animate();
  };
  n.animate = function () {
    this.applyDragForce();
    this.applySelectedAttraction();
    var t = this.x;
    this.integratePhysics();
    this.positionSlider();
    this.settle(t);
    if (this.isAnimating) {
      var e = this;
      requestAnimationFrame(function t() {
        e.animate();
      });
    }
  };
  n.positionSlider = function () {
    var t = this.x;
    if (this.options.wrapAround && this.cells.length > 1) {
      t = i.modulo(t, this.slideableWidth);
      t -= this.slideableWidth;
      this.shiftWrapCells(t);
    }
    this.setTranslateX(t, this.isAnimating);
    this.dispatchScrollEvent();
  };
  n.setTranslateX = function (t, e) {
    t += this.cursorPosition;
    t = this.options.rightToLeft ? -t : t;
    var i = this.getPositionValue(t);
    this.slider.style.transform = e
      ? "translate3d(" + i + ",0,0)"
      : "translateX(" + i + ")";
  };
  n.dispatchScrollEvent = function () {
    var t = this.slides[0];
    if (!t) {
      return;
    }
    var e = -this.x - t.target;
    var i = e / this.slidesWidth;
    this.dispatchEvent("scroll", null, [i, e]);
  };
  n.positionSliderAtSelected = function () {
    if (!this.cells.length) {
      return;
    }
    this.x = -this.selectedSlide.target;
    this.velocity = 0;
    this.positionSlider();
  };
  n.getPositionValue = function (t) {
    if (this.options.percentPosition) {
      return Math.round((t / this.size.innerWidth) * 1e4) * 0.01 + "%";
    } else {
      return Math.round(t) + "px";
    }
  };
  n.settle = function (t) {
    var e =
      !this.isPointerDown && Math.round(this.x * 100) == Math.round(t * 100);
    if (e) {
      this.restingFrames++;
    }
    if (this.restingFrames > 2) {
      this.isAnimating = false;
      delete this.isFreeScrolling;
      this.positionSlider();
      this.dispatchEvent("settle", null, [this.selectedIndex]);
    }
  };
  n.shiftWrapCells = function (t) {
    var e = this.cursorPosition + t;
    this._shiftCells(this.beforeShiftCells, e, -1);
    var i =
      this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
    this._shiftCells(this.afterShiftCells, i, 1);
  };
  n._shiftCells = function (t, e, i) {
    for (var n = 0; n < t.length; n++) {
      var s = t[n];
      var r = e > 0 ? i : 0;
      s.wrapShift(r);
      e -= s.size.outerWidth;
    }
  };
  n._unshiftCells = function (t) {
    if (!t || !t.length) {
      return;
    }
    for (var e = 0; e < t.length; e++) {
      t[e].wrapShift(0);
    }
  };
  n.integratePhysics = function () {
    this.x += this.velocity;
    this.velocity *= this.getFrictionFactor();
  };
  n.applyForce = function (t) {
    this.velocity += t;
  };
  n.getFrictionFactor = function () {
    return (
      1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    );
  };
  n.getRestingPosition = function () {
    return this.x + this.velocity / (1 - this.getFrictionFactor());
  };
  n.applyDragForce = function () {
    if (!this.isDraggable || !this.isPointerDown) {
      return;
    }
    var t = this.dragX - this.x;
    var e = t - this.velocity;
    this.applyForce(e);
  };
  n.applySelectedAttraction = function () {
    var t = this.isDraggable && this.isPointerDown;
    if (t || this.isFreeScrolling || !this.slides.length) {
      return;
    }
    var e = this.selectedSlide.target * -1 - this.x;
    var i = e * this.options.selectedAttraction;
    this.applyForce(i);
  };
  return n;
});
(function (o, a) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/flickity", [
      "ev-emitter/ev-emitter",
      "get-size/get-size",
      "fizzy-ui-utils/utils",
      "./cell",
      "./slide",
      "./animate",
    ], function (t, e, i, n, s, r) {
      return a(o, t, e, i, n, s, r);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = a(
      o,
      require("ev-emitter"),
      require("get-size"),
      require("fizzy-ui-utils"),
      require("./cell"),
      require("./slide"),
      require("./animate")
    );
  } else {
    var t = o.Flickity;
    o.Flickity = a(
      o,
      o.EvEmitter,
      o.getSize,
      o.fizzyUIUtils,
      t.Cell,
      t.Slide,
      t.animatePrototype
    );
  }
})(window, function t(n, e, i, a, s, o, r) {
  var l = n.jQuery;
  var h = n.getComputedStyle;
  var c = n.console;
  function u(t, e) {
    t = a.makeArray(t);
    while (t.length) {
      e.appendChild(t.shift());
    }
  }
  var d = 0;
  var f = {};
  function p(t, e) {
    var i = a.getQueryElement(t);
    if (!i) {
      if (c) {
        c.error("Bad element for Flickity: " + (i || t));
      }
      return;
    }
    this.element = i;
    if (this.element.flickityGUID) {
      var n = f[this.element.flickityGUID];
      if (n) n.option(e);
      return n;
    }
    if (l) {
      this.$element = l(this.element);
    }
    this.options = a.extend({}, this.constructor.defaults);
    this.option(e);
    this._create();
  }
  p.defaults = {
    accessibility: true,
    cellAlign: "center",
    freeScrollFriction: 0.075,
    friction: 0.28,
    namespaceJQueryEvents: true,
    percentPosition: true,
    resize: true,
    selectedAttraction: 0.025,
    setGallerySize: true,
  };
  p.createMethods = [];
  var v = p.prototype;
  a.extend(v, e.prototype);
  v._create = function () {
    var t = (this.guid = ++d);
    this.element.flickityGUID = t;
    f[t] = this;
    this.selectedIndex = 0;
    this.restingFrames = 0;
    this.x = 0;
    this.velocity = 0;
    this.originSide = this.options.rightToLeft ? "right" : "left";
    this.viewport = document.createElement("div");
    this.viewport.className = "flickity-viewport";
    this._createSlider();
    if (this.options.resize || this.options.watchCSS) {
      n.addEventListener("resize", this);
    }
    for (var e in this.options.on) {
      var i = this.options.on[e];
      this.on(e, i);
    }
    p.createMethods.forEach(function (t) {
      this[t]();
    }, this);
    if (this.options.watchCSS) {
      this.watchCSS();
    } else {
      this.activate();
    }
  };
  v.option = function (t) {
    a.extend(this.options, t);
  };
  v.activate = function () {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.element.classList.add("flickity-enabled");
    if (this.options.rightToLeft) {
      this.element.classList.add("flickity-rtl");
    }
    this.getSize();
    var t = this._filterFindCellElements(this.element.children);
    u(t, this.slider);
    this.viewport.appendChild(this.slider);
    this.element.appendChild(this.viewport);
    this.reloadCells();
    if (this.options.accessibility) {
      this.element.tabIndex = 0;
      this.element.addEventListener("keydown", this);
    }
    this.emitEvent("activate");
    this.selectInitialIndex();
    this.isInitActivated = true;
    this.dispatchEvent("ready");
  };
  v._createSlider = function () {
    var t = document.createElement("div");
    t.className = "flickity-slider";
    t.style[this.originSide] = 0;
    this.slider = t;
  };
  v._filterFindCellElements = function (t) {
    return a.filterFindElements(t, this.options.cellSelector);
  };
  v.reloadCells = function () {
    this.cells = this._makeCells(this.slider.children);
    this.positionCells();
    this._getWrapShiftCells();
    this.setGallerySize();
  };
  v._makeCells = function (t) {
    var e = this._filterFindCellElements(t);
    var i = e.map(function (t) {
      return new s(t, this);
    }, this);
    return i;
  };
  v.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  };
  v.getLastSlide = function () {
    return this.slides[this.slides.length - 1];
  };
  v.positionCells = function () {
    this._sizeCells(this.cells);
    this._positionCells(0);
  };
  v._positionCells = function (t) {
    t = t || 0;
    this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
    var e = 0;
    if (t > 0) {
      var i = this.cells[t - 1];
      e = i.x + i.size.outerWidth;
    }
    var n = this.cells.length;
    for (var s = t; s < n; s++) {
      var r = this.cells[s];
      r.setPosition(e);
      e += r.size.outerWidth;
      this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight);
    }
    this.slideableWidth = e;
    this.updateSlides();
    this._containSlides();
    this.slidesWidth = n
      ? this.getLastSlide().target - this.slides[0].target
      : 0;
  };
  v._sizeCells = function (t) {
    t.forEach(function (t) {
      t.getSize();
    });
  };
  v.updateSlides = function () {
    this.slides = [];
    if (!this.cells.length) {
      return;
    }
    var n = new o(this);
    this.slides.push(n);
    var t = this.originSide == "left";
    var s = t ? "marginRight" : "marginLeft";
    var r = this._getCanCellFit();
    this.cells.forEach(function (t, e) {
      if (!n.cells.length) {
        n.addCell(t);
        return;
      }
      var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
      if (r.call(this, e, i)) {
        n.addCell(t);
      } else {
        n.updateTarget();
        n = new o(this);
        this.slides.push(n);
        n.addCell(t);
      }
    }, this);
    n.updateTarget();
    this.updateSelectedSlide();
  };
  v._getCanCellFit = function () {
    var t = this.options.groupCells;
    if (!t) {
      return function () {
        return false;
      };
    } else if (typeof t == "number") {
      var e = parseInt(t, 10);
      return function (t) {
        return t % e !== 0;
      };
    }
    var i = typeof t == "string" && t.match(/^(\d+)%$/);
    var n = i ? parseInt(i[1], 10) / 100 : 1;
    return function (t, e) {
      return e <= (this.size.innerWidth + 1) * n;
    };
  };
  v._init = v.reposition = function () {
    this.positionCells();
    this.positionSliderAtSelected();
  };
  v.getSize = function () {
    this.size = i(this.element);
    this.setCellAlign();
    this.cursorPosition = this.size.innerWidth * this.cellAlign;
  };
  var g = {
    center: { left: 0.5, right: 0.5 },
    left: { left: 0, right: 1 },
    right: { right: 0, left: 1 },
  };
  v.setCellAlign = function () {
    var t = g[this.options.cellAlign];
    this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
  };
  v.setGallerySize = function () {
    if (this.options.setGallerySize) {
      var t =
        this.options.adaptiveHeight && this.selectedSlide
          ? this.selectedSlide.height
          : this.maxCellHeight;
      this.viewport.style.height = t + "px";
    }
  };
  v._getWrapShiftCells = function () {
    if (!this.options.wrapAround) {
      return;
    }
    this._unshiftCells(this.beforeShiftCells);
    this._unshiftCells(this.afterShiftCells);
    var t = this.cursorPosition;
    var e = this.cells.length - 1;
    this.beforeShiftCells = this._getGapCells(t, e, -1);
    t = this.size.innerWidth - this.cursorPosition;
    this.afterShiftCells = this._getGapCells(t, 0, 1);
  };
  v._getGapCells = function (t, e, i) {
    var n = [];
    while (t > 0) {
      var s = this.cells[e];
      if (!s) {
        break;
      }
      n.push(s);
      e += i;
      t -= s.size.outerWidth;
    }
    return n;
  };
  v._containSlides = function () {
    if (
      !this.options.contain ||
      this.options.wrapAround ||
      !this.cells.length
    ) {
      return;
    }
    var t = this.options.rightToLeft;
    var e = t ? "marginRight" : "marginLeft";
    var i = t ? "marginLeft" : "marginRight";
    var n = this.slideableWidth - this.getLastCell().size[i];
    var s = n < this.size.innerWidth;
    var r = this.cursorPosition + this.cells[0].size[e];
    var o = n - this.size.innerWidth * (1 - this.cellAlign);
    this.slides.forEach(function (t) {
      if (s) {
        t.target = n * this.cellAlign;
      } else {
        t.target = Math.max(t.target, r);
        t.target = Math.min(t.target, o);
      }
    }, this);
  };
  v.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;
    this.emitEvent(t, n);
    if (l && this.$element) {
      t += this.options.namespaceJQueryEvents ? ".flickity" : "";
      var s = t;
      if (e) {
        var r = new l.Event(e);
        r.type = t;
        s = r;
      }
      this.$element.trigger(s, i);
    }
  };
  v.select = function (t, e, i) {
    if (!this.isActive) {
      return;
    }
    t = parseInt(t, 10);
    this._wrapSelect(t);
    if (this.options.wrapAround || e) {
      t = a.modulo(t, this.slides.length);
    }
    if (!this.slides[t]) {
      return;
    }
    var n = this.selectedIndex;
    this.selectedIndex = t;
    this.updateSelectedSlide();
    if (i) {
      this.positionSliderAtSelected();
    } else {
      this.startAnimation();
    }
    if (this.options.adaptiveHeight) {
      this.setGallerySize();
    }
    this.dispatchEvent("select", null, [t]);
    if (t != n) {
      this.dispatchEvent("change", null, [t]);
    }
    this.dispatchEvent("cellSelect");
  };
  v._wrapSelect = function (t) {
    var e = this.slides.length;
    var i = this.options.wrapAround && e > 1;
    if (!i) {
      return t;
    }
    var n = a.modulo(t, e);
    var s = Math.abs(n - this.selectedIndex);
    var r = Math.abs(n + e - this.selectedIndex);
    var o = Math.abs(n - e - this.selectedIndex);
    if (!this.isDragSelect && r < s) {
      t += e;
    } else if (!this.isDragSelect && o < s) {
      t -= e;
    }
    if (t < 0) {
      this.x -= this.slideableWidth;
    } else if (t >= e) {
      this.x += this.slideableWidth;
    }
  };
  v.previous = function (t, e) {
    this.select(this.selectedIndex - 1, t, e);
  };
  v.next = function (t, e) {
    this.select(this.selectedIndex + 1, t, e);
  };
  v.updateSelectedSlide = function () {
    var t = this.slides[this.selectedIndex];
    if (!t) {
      return;
    }
    this.unselectSelectedSlide();
    this.selectedSlide = t;
    t.select();
    this.selectedCells = t.cells;
    this.selectedElements = t.getCellElements();
    this.selectedCell = t.cells[0];
    this.selectedElement = this.selectedElements[0];
  };
  v.unselectSelectedSlide = function () {
    if (this.selectedSlide) {
      this.selectedSlide.unselect();
    }
  };
  v.selectInitialIndex = function () {
    var t = this.options.initialIndex;
    if (this.isInitActivated) {
      this.select(this.selectedIndex, false, true);
      return;
    }
    if (t && typeof t == "string") {
      var e = this.queryCell(t);
      if (e) {
        this.selectCell(t, false, true);
        return;
      }
    }
    var i = 0;
    if (t && this.slides[t]) {
      i = t;
    }
    this.select(i, false, true);
  };
  v.selectCell = function (t, e, i) {
    var n = this.queryCell(t);
    if (!n) {
      return;
    }
    var s = this.getCellSlideIndex(n);
    this.select(s, e, i);
  };
  v.getCellSlideIndex = function (t) {
    for (var e = 0; e < this.slides.length; e++) {
      var i = this.slides[e];
      var n = i.cells.indexOf(t);
      if (n != -1) {
        return e;
      }
    }
  };
  v.getCell = function (t) {
    for (var e = 0; e < this.cells.length; e++) {
      var i = this.cells[e];
      if (i.element == t) {
        return i;
      }
    }
  };
  v.getCells = function (t) {
    t = a.makeArray(t);
    var i = [];
    t.forEach(function (t) {
      var e = this.getCell(t);
      if (e) {
        i.push(e);
      }
    }, this);
    return i;
  };
  v.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  };
  v.getParentCell = function (t) {
    var e = this.getCell(t);
    if (e) {
      return e;
    }
    t = a.getParent(t, ".flickity-slider > *");
    return this.getCell(t);
  };
  v.getAdjacentCellElements = function (t, e) {
    if (!t) {
      return this.selectedSlide.getCellElements();
    }
    e = e === undefined ? this.selectedIndex : e;
    var i = this.slides.length;
    if (1 + t * 2 >= i) {
      return this.getCellElements();
    }
    var n = [];
    for (var s = e - t; s <= e + t; s++) {
      var r = this.options.wrapAround ? a.modulo(s, i) : s;
      var o = this.slides[r];
      if (o) {
        n = n.concat(o.getCellElements());
      }
    }
    return n;
  };
  v.queryCell = function (t) {
    if (typeof t == "number") {
      return this.cells[t];
    }
    if (typeof t == "string") {
      if (t.match(/^[#.]?[\d/]/)) {
        return;
      }
      t = this.element.querySelector(t);
    }
    return this.getCell(t);
  };
  v.uiChange = function () {
    this.emitEvent("uiChange");
  };
  v.childUIPointerDown = function (t) {
    if (t.type != "touchstart") {
      t.preventDefault();
    }
    this.focus();
  };
  v.onresize = function () {
    this.watchCSS();
    this.resize();
  };
  a.debounceMethod(p, "onresize", 150);
  v.resize = function () {
    if (!this.isActive || this.isAnimating || this.isDragging) {
      return;
    }
    this.getSize();
    if (this.options.wrapAround) {
      this.x = a.modulo(this.x, this.slideableWidth);
    }
    this.positionCells();
    this._getWrapShiftCells();
    this.setGallerySize();
    this.emitEvent("resize");
    var t = this.selectedElements && this.selectedElements[0];
    this.selectCell(t, false, true);
  };
  v.watchCSS = function () {
    var t = this.options.watchCSS;
    if (!t) {
      return;
    }
    var e = h(this.element, ":after").content;
    if (e.indexOf("flickity") != -1) {
      this.activate();
    } else {
      this.deactivate();
    }
  };
  v.onkeydown = function (t) {
    var e = document.activeElement && document.activeElement != this.element;
    if (!this.options.accessibility || e) {
      return;
    }
    var i = p.keyboardHandlers[t.keyCode];
    if (i) {
      i.call(this);
    }
  };
  p.keyboardHandlers = {
    37: function () {
      var t = this.options.rightToLeft ? "next" : "previous";
      this.uiChange();
      this[t]();
    },
    39: function () {
      var t = this.options.rightToLeft ? "previous" : "next";
      this.uiChange();
      this[t]();
    },
  };
  v.focus = function () {
    var t = n.pageYOffset;
    this.element.focus({ preventScroll: true });
    if (n.pageYOffset != t) {
      n.scrollTo(n.pageXOffset, t);
    }
  };
  v.deactivate = function () {
    if (!this.isActive) {
      return;
    }
    this.element.classList.remove("flickity-enabled");
    this.element.classList.remove("flickity-rtl");
    this.unselectSelectedSlide();
    this.cells.forEach(function (t) {
      t.destroy();
    });
    this.element.removeChild(this.viewport);
    u(this.slider.children, this.element);
    if (this.options.accessibility) {
      this.element.removeAttribute("tabIndex");
      this.element.removeEventListener("keydown", this);
    }
    this.isActive = false;
    this.emitEvent("deactivate");
  };
  v.destroy = function () {
    this.deactivate();
    n.removeEventListener("resize", this);
    this.allOff();
    this.emitEvent("destroy");
    if (l && this.$element) {
      l.removeData(this.element, "flickity");
    }
    delete this.element.flickityGUID;
    delete f[this.guid];
  };
  a.extend(v, r);
  p.data = function (t) {
    t = a.getQueryElement(t);
    var e = t && t.flickityGUID;
    return e && f[e];
  };
  a.htmlInit(p, "flickity");
  if (l && l.bridget) {
    l.bridget("flickity", p);
  }
  p.setJQuery = function (t) {
    l = t;
  };
  p.Cell = s;
  p.Slide = o;
  return p;
});
/*!
 * Unipointer v2.4.0
 * base class for doing one thing with pointer event
 * MIT license
 */
(function (e, i) {
  if (typeof define == "function" && define.amd) {
    define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (t) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("ev-emitter"));
  } else {
    e.Unipointer = i(e, e.EvEmitter);
  }
})(window, function t(s, e) {
  function i() {}
  function n() {}
  var r = (n.prototype = Object.create(e.prototype));
  r.bindStartEvent = function (t) {
    this._bindStartEvent(t, true);
  };
  r.unbindStartEvent = function (t) {
    this._bindStartEvent(t, false);
  };
  r._bindStartEvent = function (t, e) {
    e = e === undefined ? true : e;
    var i = e ? "addEventListener" : "removeEventListener";
    var n = "mousedown";
    if ("ontouchstart" in s) {
      n = "touchstart";
    } else if (s.PointerEvent) {
      n = "pointerdown";
    }
    t[i](n, this);
  };
  r.handleEvent = function (t) {
    var e = "on" + t.type;
    if (this[e]) {
      this[e](t);
    }
  };
  r.getTouch = function (t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e];
      if (i.identifier == this.pointerIdentifier) {
        return i;
      }
    }
  };
  r.onmousedown = function (t) {
    var e = t.button;
    if (e && e !== 0 && e !== 1) {
      return;
    }
    this._pointerDown(t, t);
  };
  r.ontouchstart = function (t) {
    this._pointerDown(t, t.changedTouches[0]);
  };
  r.onpointerdown = function (t) {
    this._pointerDown(t, t);
  };
  r._pointerDown = function (t, e) {
    if (t.button || this.isPointerDown) {
      return;
    }
    this.isPointerDown = true;
    this.pointerIdentifier =
      e.pointerId !== undefined ? e.pointerId : e.identifier;
    this.pointerDown(t, e);
  };
  r.pointerDown = function (t, e) {
    this._bindPostStartEvents(t);
    this.emitEvent("pointerDown", [t, e]);
  };
  var o = {
    mousedown: ["mousemove", "mouseup"],
    touchstart: ["touchmove", "touchend", "touchcancel"],
    pointerdown: ["pointermove", "pointerup", "pointercancel"],
  };
  r._bindPostStartEvents = function (t) {
    if (!t) {
      return;
    }
    var e = o[t.type];
    e.forEach(function (t) {
      s.addEventListener(t, this);
    }, this);
    this._boundPointerEvents = e;
  };
  r._unbindPostStartEvents = function () {
    if (!this._boundPointerEvents) {
      return;
    }
    this._boundPointerEvents.forEach(function (t) {
      s.removeEventListener(t, this);
    }, this);
    delete this._boundPointerEvents;
  };
  r.onmousemove = function (t) {
    this._pointerMove(t, t);
  };
  r.onpointermove = function (t) {
    if (t.pointerId == this.pointerIdentifier) {
      this._pointerMove(t, t);
    }
  };
  r.ontouchmove = function (t) {
    var e = this.getTouch(t.changedTouches);
    if (e) {
      this._pointerMove(t, e);
    }
  };
  r._pointerMove = function (t, e) {
    this.pointerMove(t, e);
  };
  r.pointerMove = function (t, e) {
    this.emitEvent("pointerMove", [t, e]);
  };
  r.onmouseup = function (t) {
    this._pointerUp(t, t);
  };
  r.onpointerup = function (t) {
    if (t.pointerId == this.pointerIdentifier) {
      this._pointerUp(t, t);
    }
  };
  r.ontouchend = function (t) {
    var e = this.getTouch(t.changedTouches);
    if (e) {
      this._pointerUp(t, e);
    }
  };
  r._pointerUp = function (t, e) {
    this._pointerDone();
    this.pointerUp(t, e);
  };
  r.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]);
  };
  r._pointerDone = function () {
    this._pointerReset();
    this._unbindPostStartEvents();
    this.pointerDone();
  };
  r._pointerReset = function () {
    this.isPointerDown = false;
    delete this.pointerIdentifier;
  };
  r.pointerDone = i;
  r.onpointercancel = function (t) {
    if (t.pointerId == this.pointerIdentifier) {
      this._pointerCancel(t, t);
    }
  };
  r.ontouchcancel = function (t) {
    var e = this.getTouch(t.changedTouches);
    if (e) {
      this._pointerCancel(t, e);
    }
  };
  r._pointerCancel = function (t, e) {
    this._pointerDone();
    this.pointerCancel(t, e);
  };
  r.pointerCancel = function (t, e) {
    this.emitEvent("pointerCancel", [t, e]);
  };
  n.getPointerPoint = function (t) {
    return { x: t.pageX, y: t.pageY };
  };
  return n;
});
/*!
 * Unidragger v2.4.0
 * Draggable base class
 * MIT license
 */
(function (e, i) {
  if (typeof define == "function" && define.amd) {
    define("unidragger/unidragger", ["unipointer/unipointer"], function (t) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("unipointer"));
  } else {
    e.Unidragger = i(e, e.Unipointer);
  }
})(window, function t(r, e) {
  function i() {}
  var n = (i.prototype = Object.create(e.prototype));
  n.bindHandles = function () {
    this._bindHandles(true);
  };
  n.unbindHandles = function () {
    this._bindHandles(false);
  };
  n._bindHandles = function (t) {
    t = t === undefined ? true : t;
    var e = t ? "addEventListener" : "removeEventListener";
    var i = t ? this._touchActionValue : "";
    for (var n = 0; n < this.handles.length; n++) {
      var s = this.handles[n];
      this._bindStartEvent(s, t);
      s[e]("click", this);
      if (r.PointerEvent) {
        s.style.touchAction = i;
      }
    }
  };
  n._touchActionValue = "none";
  n.pointerDown = function (t, e) {
    var i = this.okayPointerDown(t);
    if (!i) {
      return;
    }
    this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY };
    t.preventDefault();
    this.pointerDownBlur();
    this._bindPostStartEvents(t);
    this.emitEvent("pointerDown", [t, e]);
  };
  var s = { TEXTAREA: true, INPUT: true, SELECT: true, OPTION: true };
  var o = {
    radio: true,
    checkbox: true,
    button: true,
    submit: true,
    image: true,
    file: true,
  };
  n.okayPointerDown = function (t) {
    var e = s[t.target.nodeName];
    var i = o[t.target.type];
    var n = !e || i;
    if (!n) {
      this._pointerReset();
    }
    return n;
  };
  n.pointerDownBlur = function () {
    var t = document.activeElement;
    var e = t && t.blur && t != document.body;
    if (e) {
      t.blur();
    }
  };
  n.pointerMove = function (t, e) {
    var i = this._dragPointerMove(t, e);
    this.emitEvent("pointerMove", [t, e, i]);
    this._dragMove(t, e, i);
  };
  n._dragPointerMove = function (t, e) {
    var i = {
      x: e.pageX - this.pointerDownPointer.pageX,
      y: e.pageY - this.pointerDownPointer.pageY,
    };
    if (!this.isDragging && this.hasDragStarted(i)) {
      this._dragStart(t, e);
    }
    return i;
  };
  n.hasDragStarted = function (t) {
    return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
  };
  n.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]);
    this._dragPointerUp(t, e);
  };
  n._dragPointerUp = function (t, e) {
    if (this.isDragging) {
      this._dragEnd(t, e);
    } else {
      this._staticClick(t, e);
    }
  };
  n._dragStart = function (t, e) {
    this.isDragging = true;
    this.isPreventingClicks = true;
    this.dragStart(t, e);
  };
  n.dragStart = function (t, e) {
    this.emitEvent("dragStart", [t, e]);
  };
  n._dragMove = function (t, e, i) {
    if (!this.isDragging) {
      return;
    }
    this.dragMove(t, e, i);
  };
  n.dragMove = function (t, e, i) {
    t.preventDefault();
    this.emitEvent("dragMove", [t, e, i]);
  };
  n._dragEnd = function (t, e) {
    this.isDragging = false;
    setTimeout(
      function () {
        delete this.isPreventingClicks;
      }.bind(this)
    );
    this.dragEnd(t, e);
  };
  n.dragEnd = function (t, e) {
    this.emitEvent("dragEnd", [t, e]);
  };
  n.onclick = function (t) {
    if (this.isPreventingClicks) {
      t.preventDefault();
    }
  };
  n._staticClick = function (t, e) {
    if (this.isIgnoringMouseUp && t.type == "mouseup") {
      return;
    }
    this.staticClick(t, e);
    if (t.type != "mouseup") {
      this.isIgnoringMouseUp = true;
      setTimeout(
        function () {
          delete this.isIgnoringMouseUp;
        }.bind(this),
        400
      );
    }
  };
  n.staticClick = function (t, e) {
    this.emitEvent("staticClick", [t, e]);
  };
  i.getPointerPoint = e.getPointerPoint;
  return i;
});
(function (n, s) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/drag", [
      "./flickity",
      "unidragger/unidragger",
      "fizzy-ui-utils/utils",
    ], function (t, e, i) {
      return s(n, t, e, i);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = s(
      n,
      require("./flickity"),
      require("unidragger"),
      require("fizzy-ui-utils")
    );
  } else {
    n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils);
  }
})(window, function t(n, e, i, a) {
  a.extend(e.defaults, { draggable: ">1", dragThreshold: 3 });
  e.createMethods.push("_createDrag");
  var s = e.prototype;
  a.extend(s, i.prototype);
  s._touchActionValue = "pan-y";
  s._createDrag = function () {
    this.on("activate", this.onActivateDrag);
    this.on("uiChange", this._uiChangeDrag);
    this.on("deactivate", this.onDeactivateDrag);
    this.on("cellChange", this.updateDraggable);
  };
  s.onActivateDrag = function () {
    this.handles = [this.viewport];
    this.bindHandles();
    this.updateDraggable();
  };
  s.onDeactivateDrag = function () {
    this.unbindHandles();
    this.element.classList.remove("is-draggable");
  };
  s.updateDraggable = function () {
    if (this.options.draggable == ">1") {
      this.isDraggable = this.slides.length > 1;
    } else {
      this.isDraggable = this.options.draggable;
    }
    if (this.isDraggable) {
      this.element.classList.add("is-draggable");
    } else {
      this.element.classList.remove("is-draggable");
    }
  };
  s.bindDrag = function () {
    this.options.draggable = true;
    this.updateDraggable();
  };
  s.unbindDrag = function () {
    this.options.draggable = false;
    this.updateDraggable();
  };
  s._uiChangeDrag = function () {
    delete this.isFreeScrolling;
  };
  s.pointerDown = function (t, e) {
    if (!this.isDraggable) {
      this._pointerDownDefault(t, e);
      return;
    }
    var i = this.okayPointerDown(t);
    if (!i) {
      return;
    }
    this._pointerDownPreventDefault(t);
    this.pointerDownFocus(t);
    if (document.activeElement != this.element) {
      this.pointerDownBlur();
    }
    this.dragX = this.x;
    this.viewport.classList.add("is-pointer-down");
    this.pointerDownScroll = o();
    n.addEventListener("scroll", this);
    this._pointerDownDefault(t, e);
  };
  s._pointerDownDefault = function (t, e) {
    this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY };
    this._bindPostStartEvents(t);
    this.dispatchEvent("pointerDown", t, [e]);
  };
  var r = { INPUT: true, TEXTAREA: true, SELECT: true };
  s.pointerDownFocus = function (t) {
    var e = r[t.target.nodeName];
    if (!e) {
      this.focus();
    }
  };
  s._pointerDownPreventDefault = function (t) {
    var e = t.type == "touchstart";
    var i = t.pointerType == "touch";
    var n = r[t.target.nodeName];
    if (!e && !i && !n) {
      t.preventDefault();
    }
  };
  s.hasDragStarted = function (t) {
    return Math.abs(t.x) > this.options.dragThreshold;
  };
  s.pointerUp = function (t, e) {
    delete this.isTouchScrolling;
    this.viewport.classList.remove("is-pointer-down");
    this.dispatchEvent("pointerUp", t, [e]);
    this._dragPointerUp(t, e);
  };
  s.pointerDone = function () {
    n.removeEventListener("scroll", this);
    delete this.pointerDownScroll;
  };
  s.dragStart = function (t, e) {
    if (!this.isDraggable) {
      return;
    }
    this.dragStartPosition = this.x;
    this.startAnimation();
    n.removeEventListener("scroll", this);
    this.dispatchEvent("dragStart", t, [e]);
  };
  s.pointerMove = function (t, e) {
    var i = this._dragPointerMove(t, e);
    this.dispatchEvent("pointerMove", t, [e, i]);
    this._dragMove(t, e, i);
  };
  s.dragMove = function (t, e, i) {
    if (!this.isDraggable) {
      return;
    }
    t.preventDefault();
    this.previousDragX = this.dragX;
    var n = this.options.rightToLeft ? -1 : 1;
    if (this.options.wrapAround) {
      i.x %= this.slideableWidth;
    }
    var s = this.dragStartPosition + i.x * n;
    if (!this.options.wrapAround && this.slides.length) {
      var r = Math.max(-this.slides[0].target, this.dragStartPosition);
      s = s > r ? (s + r) * 0.5 : s;
      var o = Math.min(-this.getLastSlide().target, this.dragStartPosition);
      s = s < o ? (s + o) * 0.5 : s;
    }
    this.dragX = s;
    this.dragMoveTime = new Date();
    this.dispatchEvent("dragMove", t, [e, i]);
  };
  s.dragEnd = function (t, e) {
    if (!this.isDraggable) {
      return;
    }
    if (this.options.freeScroll) {
      this.isFreeScrolling = true;
    }
    var i = this.dragEndRestingSelect();
    if (this.options.freeScroll && !this.options.wrapAround) {
      var n = this.getRestingPosition();
      this.isFreeScrolling =
        -n > this.slides[0].target && -n < this.getLastSlide().target;
    } else if (!this.options.freeScroll && i == this.selectedIndex) {
      i += this.dragEndBoostSelect();
    }
    delete this.previousDragX;
    this.isDragSelect = this.options.wrapAround;
    this.select(i);
    delete this.isDragSelect;
    this.dispatchEvent("dragEnd", t, [e]);
  };
  s.dragEndRestingSelect = function () {
    var t = this.getRestingPosition();
    var e = Math.abs(this.getSlideDistance(-t, this.selectedIndex));
    var i = this._getClosestResting(t, e, 1);
    var n = this._getClosestResting(t, e, -1);
    var s = i.distance < n.distance ? i.index : n.index;
    return s;
  };
  s._getClosestResting = function (t, e, i) {
    var n = this.selectedIndex;
    var s = Infinity;
    var r =
      this.options.contain && !this.options.wrapAround
        ? function (t, e) {
            return t <= e;
          }
        : function (t, e) {
            return t < e;
          };
    while (r(e, s)) {
      n += i;
      s = e;
      e = this.getSlideDistance(-t, n);
      if (e === null) {
        break;
      }
      e = Math.abs(e);
    }
    return { distance: s, index: n - i };
  };
  s.getSlideDistance = function (t, e) {
    var i = this.slides.length;
    var n = this.options.wrapAround && i > 1;
    var s = n ? a.modulo(e, i) : e;
    var r = this.slides[s];
    if (!r) {
      return null;
    }
    var o = n ? this.slideableWidth * Math.floor(e / i) : 0;
    return t - (r.target + o);
  };
  s.dragEndBoostSelect = function () {
    if (
      this.previousDragX === undefined ||
      !this.dragMoveTime ||
      new Date() - this.dragMoveTime > 100
    ) {
      return 0;
    }
    var t = this.getSlideDistance(-this.dragX, this.selectedIndex);
    var e = this.previousDragX - this.dragX;
    if (t > 0 && e > 0) {
      return 1;
    } else if (t < 0 && e < 0) {
      return -1;
    }
    return 0;
  };
  s.staticClick = function (t, e) {
    var i = this.getParentCell(t.target);
    var n = i && i.element;
    var s = i && this.cells.indexOf(i);
    this.dispatchEvent("staticClick", t, [e, n, s]);
  };
  s.onscroll = function () {
    var t = o();
    var e = this.pointerDownScroll.x - t.x;
    var i = this.pointerDownScroll.y - t.y;
    if (Math.abs(e) > 3 || Math.abs(i) > 3) {
      this._pointerDone();
    }
  };
  function o() {
    return { x: n.pageXOffset, y: n.pageYOffset };
  }
  return e;
});
(function (n, s) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/prev-next-button", [
      "./flickity",
      "unipointer/unipointer",
      "fizzy-ui-utils/utils",
    ], function (t, e, i) {
      return s(n, t, e, i);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = s(
      n,
      require("./flickity"),
      require("unipointer"),
      require("fizzy-ui-utils")
    );
  } else {
    s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
  }
})(window, function t(e, i, n, s) {
  "use strict";
  var r = "http://www.w3.org/2000/svg";
  function o(t, e) {
    this.direction = t;
    this.parent = e;
    this._create();
  }
  o.prototype = Object.create(n.prototype);
  o.prototype._create = function () {
    this.isEnabled = true;
    this.isPrevious = this.direction == -1;
    var t = this.parent.options.rightToLeft ? 1 : -1;
    this.isLeft = this.direction == t;
    var e = (this.element = document.createElement("button"));
    e.className = "flickity-button flickity-prev-next-button";
    e.className += this.isPrevious ? " previous" : " next";
    e.setAttribute("type", "button");
    this.disable();
    e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
    var i = this.createSVG();
    e.appendChild(i);
    this.parent.on("select", this.update.bind(this));
    this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  };
  o.prototype.activate = function () {
    this.bindStartEvent(this.element);
    this.element.addEventListener("click", this);
    this.parent.element.appendChild(this.element);
  };
  o.prototype.deactivate = function () {
    this.parent.element.removeChild(this.element);
    this.unbindStartEvent(this.element);
    this.element.removeEventListener("click", this);
  };
  o.prototype.createSVG = function () {
    var t = document.createElementNS(r, "svg");
    t.setAttribute("class", "flickity-button-icon");
    t.setAttribute("viewBox", "0 0 100 100");
    var e = document.createElementNS(r, "path");
    var i = a(this.parent.options.arrowShape);
    e.setAttribute("d", i);
    e.setAttribute("class", "arrow");
    if (!this.isLeft) {
      e.setAttribute("transform", "translate(100, 100) rotate(180) ");
    }
    t.appendChild(e);
    return t;
  };
  function a(t) {
    if (typeof t == "string") {
      return t;
    }
    return (
      "M " +
      t.x0 +
      ",50" +
      " L " +
      t.x1 +
      "," +
      (t.y1 + 50) +
      " L " +
      t.x2 +
      "," +
      (t.y2 + 50) +
      " L " +
      t.x3 +
      ",50 " +
      " L " +
      t.x2 +
      "," +
      (50 - t.y2) +
      " L " +
      t.x1 +
      "," +
      (50 - t.y1) +
      " Z"
    );
  }
  o.prototype.handleEvent = s.handleEvent;
  o.prototype.onclick = function () {
    if (!this.isEnabled) {
      return;
    }
    this.parent.uiChange();
    var t = this.isPrevious ? "previous" : "next";
    this.parent[t]();
  };
  o.prototype.enable = function () {
    if (this.isEnabled) {
      return;
    }
    this.element.disabled = false;
    this.isEnabled = true;
  };
  o.prototype.disable = function () {
    if (!this.isEnabled) {
      return;
    }
    this.element.disabled = true;
    this.isEnabled = false;
  };
  o.prototype.update = function () {
    var t = this.parent.slides;
    if (this.parent.options.wrapAround && t.length > 1) {
      this.enable();
      return;
    }
    var e = t.length ? t.length - 1 : 0;
    var i = this.isPrevious ? 0 : e;
    var n = this.parent.selectedIndex == i ? "disable" : "enable";
    this[n]();
  };
  o.prototype.destroy = function () {
    this.deactivate();
    this.allOff();
  };
  s.extend(i.defaults, {
    prevNextButtons: true,
    arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 },
  });
  i.createMethods.push("_createPrevNextButtons");
  var l = i.prototype;
  l._createPrevNextButtons = function () {
    if (!this.options.prevNextButtons) {
      return;
    }
    this.prevButton = new o(-1, this);
    this.nextButton = new o(1, this);
    this.on("activate", this.activatePrevNextButtons);
  };
  l.activatePrevNextButtons = function () {
    this.prevButton.activate();
    this.nextButton.activate();
    this.on("deactivate", this.deactivatePrevNextButtons);
  };
  l.deactivatePrevNextButtons = function () {
    this.prevButton.deactivate();
    this.nextButton.deactivate();
    this.off("deactivate", this.deactivatePrevNextButtons);
  };
  i.PrevNextButton = o;
  return i;
});
(function (n, s) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/page-dots", [
      "./flickity",
      "unipointer/unipointer",
      "fizzy-ui-utils/utils",
    ], function (t, e, i) {
      return s(n, t, e, i);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = s(
      n,
      require("./flickity"),
      require("unipointer"),
      require("fizzy-ui-utils")
    );
  } else {
    s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
  }
})(window, function t(e, i, n, s) {
  function r(t) {
    this.parent = t;
    this._create();
  }
  r.prototype = Object.create(n.prototype);
  r.prototype._create = function () {
    this.holder = document.createElement("ol");
    this.holder.className = "flickity-page-dots";
    this.dots = [];
    this.handleClick = this.onClick.bind(this);
    this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  };
  r.prototype.activate = function () {
    this.setDots();
    this.holder.addEventListener("click", this.handleClick);
    this.bindStartEvent(this.holder);
    this.parent.element.appendChild(this.holder);
  };
  r.prototype.deactivate = function () {
    this.holder.removeEventListener("click", this.handleClick);
    this.unbindStartEvent(this.holder);
    this.parent.element.removeChild(this.holder);
  };
  r.prototype.setDots = function () {
    var t = this.parent.slides.length - this.dots.length;
    if (t > 0) {
      this.addDots(t);
    } else if (t < 0) {
      this.removeDots(-t);
    }
  };
  r.prototype.addDots = function (t) {
    var e = document.createDocumentFragment();
    var i = [];
    var n = this.dots.length;
    var s = n + t;
    for (var r = n; r < s; r++) {
      var o = document.createElement("li");
      o.className = "dot";
      o.setAttribute("aria-label", "Page dot " + (r + 1));
      e.appendChild(o);
      i.push(o);
    }
    this.holder.appendChild(e);
    this.dots = this.dots.concat(i);
  };
  r.prototype.removeDots = function (t) {
    var e = this.dots.splice(this.dots.length - t, t);
    e.forEach(function (t) {
      this.holder.removeChild(t);
    }, this);
  };
  r.prototype.updateSelected = function () {
    if (this.selectedDot) {
      this.selectedDot.className = "dot";
      this.selectedDot.removeAttribute("aria-current");
    }
    if (!this.dots.length) {
      return;
    }
    this.selectedDot = this.dots[this.parent.selectedIndex];
    this.selectedDot.className = "dot is-selected";
    this.selectedDot.setAttribute("aria-current", "step");
  };
  r.prototype.onTap = r.prototype.onClick = function (t) {
    var e = t.target;
    if (e.nodeName != "LI") {
      return;
    }
    this.parent.uiChange();
    var i = this.dots.indexOf(e);
    this.parent.select(i);
  };
  r.prototype.destroy = function () {
    this.deactivate();
    this.allOff();
  };
  i.PageDots = r;
  s.extend(i.defaults, { pageDots: true });
  i.createMethods.push("_createPageDots");
  var o = i.prototype;
  o._createPageDots = function () {
    if (!this.options.pageDots) {
      return;
    }
    this.pageDots = new r(this);
    this.on("activate", this.activatePageDots);
    this.on("select", this.updateSelectedPageDots);
    this.on("cellChange", this.updatePageDots);
    this.on("resize", this.updatePageDots);
    this.on("deactivate", this.deactivatePageDots);
  };
  o.activatePageDots = function () {
    this.pageDots.activate();
  };
  o.updateSelectedPageDots = function () {
    this.pageDots.updateSelected();
  };
  o.updatePageDots = function () {
    this.pageDots.setDots();
  };
  o.deactivatePageDots = function () {
    this.pageDots.deactivate();
  };
  i.PageDots = r;
  return i;
});
(function (t, n) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/player", [
      "ev-emitter/ev-emitter",
      "fizzy-ui-utils/utils",
      "./flickity",
    ], function (t, e, i) {
      return n(t, e, i);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = n(
      require("ev-emitter"),
      require("fizzy-ui-utils"),
      require("./flickity")
    );
  } else {
    n(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
  }
})(window, function t(e, i, n) {
  function s(t) {
    this.parent = t;
    this.state = "stopped";
    this.onVisibilityChange = this.visibilityChange.bind(this);
    this.onVisibilityPlay = this.visibilityPlay.bind(this);
  }
  s.prototype = Object.create(e.prototype);
  s.prototype.play = function () {
    if (this.state == "playing") {
      return;
    }
    var t = document.hidden;
    if (t) {
      document.addEventListener("visibilitychange", this.onVisibilityPlay);
      return;
    }
    this.state = "playing";
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.tick();
  };
  s.prototype.tick = function () {
    if (this.state != "playing") {
      return;
    }
    var t = this.parent.options.autoPlay;
    t = typeof t == "number" ? t : 3e3;
    var e = this;
    this.clear();
    this.timeout = setTimeout(function () {
      e.parent.next(true);
      e.tick();
    }, t);
  };
  s.prototype.stop = function () {
    this.state = "stopped";
    this.clear();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
  };
  s.prototype.clear = function () {
    clearTimeout(this.timeout);
  };
  s.prototype.pause = function () {
    if (this.state == "playing") {
      this.state = "paused";
      this.clear();
    }
  };
  s.prototype.unpause = function () {
    if (this.state == "paused") {
      this.play();
    }
  };
  s.prototype.visibilityChange = function () {
    var t = document.hidden;
    this[t ? "pause" : "unpause"]();
  };
  s.prototype.visibilityPlay = function () {
    this.play();
    document.removeEventListener("visibilitychange", this.onVisibilityPlay);
  };
  i.extend(n.defaults, { pauseAutoPlayOnHover: true });
  n.createMethods.push("_createPlayer");
  var r = n.prototype;
  r._createPlayer = function () {
    this.player = new s(this);
    this.on("activate", this.activatePlayer);
    this.on("uiChange", this.stopPlayer);
    this.on("pointerDown", this.stopPlayer);
    this.on("deactivate", this.deactivatePlayer);
  };
  r.activatePlayer = function () {
    if (!this.options.autoPlay) {
      return;
    }
    this.player.play();
    this.element.addEventListener("mouseenter", this);
  };
  r.playPlayer = function () {
    this.player.play();
  };
  r.stopPlayer = function () {
    this.player.stop();
  };
  r.pausePlayer = function () {
    this.player.pause();
  };
  r.unpausePlayer = function () {
    this.player.unpause();
  };
  r.deactivatePlayer = function () {
    this.player.stop();
    this.element.removeEventListener("mouseenter", this);
  };
  r.onmouseenter = function () {
    if (!this.options.pauseAutoPlayOnHover) {
      return;
    }
    this.player.pause();
    this.element.addEventListener("mouseleave", this);
  };
  r.onmouseleave = function () {
    this.player.unpause();
    this.element.removeEventListener("mouseleave", this);
  };
  n.Player = s;
  return n;
});
(function (i, n) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/add-remove-cell", [
      "./flickity",
      "fizzy-ui-utils/utils",
    ], function (t, e) {
      return n(i, t, e);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = n(i, require("./flickity"), require("fizzy-ui-utils"));
  } else {
    n(i, i.Flickity, i.fizzyUIUtils);
  }
})(window, function t(e, i, n) {
  function l(t) {
    var e = document.createDocumentFragment();
    t.forEach(function (t) {
      e.appendChild(t.element);
    });
    return e;
  }
  var s = i.prototype;
  s.insert = function (t, e) {
    var i = this._makeCells(t);
    if (!i || !i.length) {
      return;
    }
    var n = this.cells.length;
    e = e === undefined ? n : e;
    var s = l(i);
    var r = e == n;
    if (r) {
      this.slider.appendChild(s);
    } else {
      var o = this.cells[e].element;
      this.slider.insertBefore(s, o);
    }
    if (e === 0) {
      this.cells = i.concat(this.cells);
    } else if (r) {
      this.cells = this.cells.concat(i);
    } else {
      var a = this.cells.splice(e, n - e);
      this.cells = this.cells.concat(i).concat(a);
    }
    this._sizeCells(i);
    this.cellChange(e, true);
  };
  s.append = function (t) {
    this.insert(t, this.cells.length);
  };
  s.prepend = function (t) {
    this.insert(t, 0);
  };
  s.remove = function (t) {
    var e = this.getCells(t);
    if (!e || !e.length) {
      return;
    }
    var i = this.cells.length - 1;
    e.forEach(function (t) {
      t.remove();
      var e = this.cells.indexOf(t);
      i = Math.min(e, i);
      n.removeFrom(this.cells, t);
    }, this);
    this.cellChange(i, true);
  };
  s.cellSizeChange = function (t) {
    var e = this.getCell(t);
    if (!e) {
      return;
    }
    e.getSize();
    var i = this.cells.indexOf(e);
    this.cellChange(i);
  };
  s.cellChange = function (t, e) {
    var i = this.selectedElement;
    this._positionCells(t);
    this._getWrapShiftCells();
    this.setGallerySize();
    var n = this.getCell(i);
    if (n) {
      this.selectedIndex = this.getCellSlideIndex(n);
    }
    this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex);
    this.emitEvent("cellChange", [t]);
    this.select(this.selectedIndex);
    if (e) {
      this.positionSliderAtSelected();
    }
  };
  return i;
});
(function (i, n) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/lazyload", [
      "./flickity",
      "fizzy-ui-utils/utils",
    ], function (t, e) {
      return n(i, t, e);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = n(i, require("./flickity"), require("fizzy-ui-utils"));
  } else {
    n(i, i.Flickity, i.fizzyUIUtils);
  }
})(window, function t(e, i, o) {
  "use strict";
  i.createMethods.push("_createLazyload");
  var n = i.prototype;
  n._createLazyload = function () {
    this.on("select", this.lazyLoad);
  };
  n.lazyLoad = function () {
    var t = this.options.lazyLoad;
    if (!t) {
      return;
    }
    var e = typeof t == "number" ? t : 0;
    var i = this.getAdjacentCellElements(e);
    var n = [];
    i.forEach(function (t) {
      var e = s(t);
      n = n.concat(e);
    });
    n.forEach(function (t) {
      new r(t, this);
    }, this);
  };
  function s(t) {
    if (t.nodeName == "IMG") {
      var e = t.getAttribute("data-flickity-lazyload");
      var i = t.getAttribute("data-flickity-lazyload-src");
      var n = t.getAttribute("data-flickity-lazyload-srcset");
      if (e || i || n) {
        return [t];
      }
    }
    var s =
      "img[data-flickity-lazyload], " +
      "img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]";
    var r = t.querySelectorAll(s);
    return o.makeArray(r);
  }
  function r(t, e) {
    this.img = t;
    this.flickity = e;
    this.load();
  }
  r.prototype.handleEvent = o.handleEvent;
  r.prototype.load = function () {
    this.img.addEventListener("load", this);
    this.img.addEventListener("error", this);
    var t =
      this.img.getAttribute("data-flickity-lazyload") ||
      this.img.getAttribute("data-flickity-lazyload-src");
    var e = this.img.getAttribute("data-flickity-lazyload-srcset");
    this.img.src = t;
    if (e) {
      this.img.setAttribute("srcset", e);
    }
    this.img.removeAttribute("data-flickity-lazyload");
    this.img.removeAttribute("data-flickity-lazyload-src");
    this.img.removeAttribute("data-flickity-lazyload-srcset");
  };
  r.prototype.onload = function (t) {
    this.complete(t, "flickity-lazyloaded");
  };
  r.prototype.onerror = function (t) {
    this.complete(t, "flickity-lazyerror");
  };
  r.prototype.complete = function (t, e) {
    this.img.removeEventListener("load", this);
    this.img.removeEventListener("error", this);
    var i = this.flickity.getParentCell(this.img);
    var n = i && i.element;
    this.flickity.cellSizeChange(n);
    this.img.classList.add(e);
    this.flickity.dispatchEvent("lazyLoad", t, n);
  };
  i.LazyLoader = r;
  return i;
});
/*!
 * Flickity v2.3.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2021 Metafizzy
 */
(function (t, e) {
  if (typeof define == "function" && define.amd) {
    define("flickity/js/index", [
      "./flickity",
      "./drag",
      "./prev-next-button",
      "./page-dots",
      "./player",
      "./add-remove-cell",
      "./lazyload",
    ], e);
  } else if (typeof module == "object" && module.exports) {
    module.exports = e(
      require("./flickity"),
      require("./drag"),
      require("./prev-next-button"),
      require("./page-dots"),
      require("./player"),
      require("./add-remove-cell"),
      require("./lazyload")
    );
  }
})(window, function t(e) {
  return e;
});
/*!
 * Flickity asNavFor v2.0.2
 * enable asNavFor for Flickity
 */
(function (t, e) {
  if (typeof define == "function" && define.amd) {
    define("flickity-as-nav-for/as-nav-for", [
      "flickity/js/index",
      "fizzy-ui-utils/utils",
    ], e);
  } else if (typeof module == "object" && module.exports) {
    module.exports = e(require("flickity"), require("fizzy-ui-utils"));
  } else {
    t.Flickity = e(t.Flickity, t.fizzyUIUtils);
  }
})(window, function t(n, s) {
  n.createMethods.push("_createAsNavFor");
  var e = n.prototype;
  e._createAsNavFor = function () {
    this.on("activate", this.activateAsNavFor);
    this.on("deactivate", this.deactivateAsNavFor);
    this.on("destroy", this.destroyAsNavFor);
    var e = this.options.asNavFor;
    if (!e) {
      return;
    }
    var i = this;
    setTimeout(function t() {
      i.setNavCompanion(e);
    });
  };
  e.setNavCompanion = function (t) {
    t = s.getQueryElement(t);
    var e = n.data(t);
    if (!e || e == this) {
      return;
    }
    this.navCompanion = e;
    var i = this;
    this.onNavCompanionSelect = function () {
      i.navCompanionSelect();
    };
    e.on("select", this.onNavCompanionSelect);
    this.on("staticClick", this.onNavStaticClick);
    this.navCompanionSelect(true);
  };
  e.navCompanionSelect = function (t) {
    var e = this.navCompanion && this.navCompanion.selectedCells;
    if (!e) {
      return;
    }
    var i = e[0];
    var n = this.navCompanion.cells.indexOf(i);
    var s = n + e.length - 1;
    var r = Math.floor(a(n, s, this.navCompanion.cellAlign));
    this.selectCell(r, false, t);
    this.removeNavSelectedElements();
    if (r >= this.cells.length) {
      return;
    }
    var o = this.cells.slice(n, s + 1);
    this.navSelectedElements = o.map(function (t) {
      return t.element;
    });
    this.changeNavSelectedClass("add");
  };
  function a(t, e, i) {
    return (e - t) * i + t;
  }
  e.changeNavSelectedClass = function (e) {
    this.navSelectedElements.forEach(function (t) {
      t.classList[e]("is-nav-selected");
    });
  };
  e.activateAsNavFor = function () {
    this.navCompanionSelect(true);
  };
  e.removeNavSelectedElements = function () {
    if (!this.navSelectedElements) {
      return;
    }
    this.changeNavSelectedClass("remove");
    delete this.navSelectedElements;
  };
  e.onNavStaticClick = function (t, e, i, n) {
    if (typeof n == "number") {
      this.navCompanion.selectCell(n);
    }
  };
  e.deactivateAsNavFor = function () {
    this.removeNavSelectedElements();
  };
  e.destroyAsNavFor = function () {
    if (!this.navCompanion) {
      return;
    }
    this.navCompanion.off("select", this.onNavCompanionSelect);
    this.off("staticClick", this.onNavStaticClick);
    delete this.navCompanion;
  };
  return n;
});
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function (e, i) {
  "use strict";
  if (typeof define == "function" && define.amd) {
    define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (
      t
    ) {
      return i(e, t);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = i(e, require("ev-emitter"));
  } else {
    e.imagesLoaded = i(e, e.EvEmitter);
  }
})(typeof window !== "undefined" ? window : this, function t(e, i) {
  var s = e.jQuery;
  var r = e.console;
  function o(t, e) {
    for (var i in e) {
      t[i] = e[i];
    }
    return t;
  }
  var n = Array.prototype.slice;
  function a(t) {
    if (Array.isArray(t)) {
      return t;
    }
    var e = typeof t == "object" && typeof t.length == "number";
    if (e) {
      return n.call(t);
    }
    return [t];
  }
  function l(t, e, i) {
    if (!(this instanceof l)) {
      return new l(t, e, i);
    }
    var n = t;
    if (typeof t == "string") {
      n = document.querySelectorAll(t);
    }
    if (!n) {
      r.error("Bad element for imagesLoaded " + (n || t));
      return;
    }
    this.elements = a(n);
    this.options = o({}, this.options);
    if (typeof e == "function") {
      i = e;
    } else {
      o(this.options, e);
    }
    if (i) {
      this.on("always", i);
    }
    this.getImages();
    if (s) {
      this.jqDeferred = new s.Deferred();
    }
    setTimeout(this.check.bind(this));
  }
  l.prototype = Object.create(i.prototype);
  l.prototype.options = {};
  l.prototype.getImages = function () {
    this.images = [];
    this.elements.forEach(this.addElementImages, this);
  };
  l.prototype.addElementImages = function (t) {
    if (t.nodeName == "IMG") {
      this.addImage(t);
    }
    if (this.options.background === true) {
      this.addElementBackgroundImages(t);
    }
    var e = t.nodeType;
    if (!e || !h[e]) {
      return;
    }
    var i = t.querySelectorAll("img");
    for (var n = 0; n < i.length; n++) {
      var s = i[n];
      this.addImage(s);
    }
    if (typeof this.options.background == "string") {
      var r = t.querySelectorAll(this.options.background);
      for (n = 0; n < r.length; n++) {
        var o = r[n];
        this.addElementBackgroundImages(o);
      }
    }
  };
  var h = { 1: true, 9: true, 11: true };
  l.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (!e) {
      return;
    }
    var i = /url\((['"])?(.*?)\1\)/gi;
    var n = i.exec(e.backgroundImage);
    while (n !== null) {
      var s = n && n[2];
      if (s) {
        this.addBackground(s, t);
      }
      n = i.exec(e.backgroundImage);
    }
  };
  l.prototype.addImage = function (t) {
    var e = new c(t);
    this.images.push(e);
  };
  l.prototype.addBackground = function (t, e) {
    var i = new u(t, e);
    this.images.push(i);
  };
  l.prototype.check = function () {
    var n = this;
    this.progressedCount = 0;
    this.hasAnyBroken = false;
    if (!this.images.length) {
      this.complete();
      return;
    }
    function e(t, e, i) {
      setTimeout(function () {
        n.progress(t, e, i);
      });
    }
    this.images.forEach(function (t) {
      t.once("progress", e);
      t.check();
    });
  };
  l.prototype.progress = function (t, e, i) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
    this.emitEvent("progress", [this, t, e]);
    if (this.jqDeferred && this.jqDeferred.notify) {
      this.jqDeferred.notify(this, t);
    }
    if (this.progressedCount == this.images.length) {
      this.complete();
    }
    if (this.options.debug && r) {
      r.log("progress: " + i, t, e);
    }
  };
  l.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";
    this.isComplete = true;
    this.emitEvent(t, [this]);
    this.emitEvent("always", [this]);
    if (this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this);
    }
  };
  function c(t) {
    this.img = t;
  }
  c.prototype = Object.create(i.prototype);
  c.prototype.check = function () {
    var t = this.getIsImageComplete();
    if (t) {
      this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
      return;
    }
    this.proxyImage = new Image();
    this.proxyImage.addEventListener("load", this);
    this.proxyImage.addEventListener("error", this);
    this.img.addEventListener("load", this);
    this.img.addEventListener("error", this);
    this.proxyImage.src = this.img.src;
  };
  c.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  };
  c.prototype.confirm = function (t, e) {
    this.isLoaded = t;
    this.emitEvent("progress", [this, this.img, e]);
  };
  c.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    if (this[e]) {
      this[e](t);
    }
  };
  c.prototype.onload = function () {
    this.confirm(true, "onload");
    this.unbindEvents();
  };
  c.prototype.onerror = function () {
    this.confirm(false, "onerror");
    this.unbindEvents();
  };
  c.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this);
    this.proxyImage.removeEventListener("error", this);
    this.img.removeEventListener("load", this);
    this.img.removeEventListener("error", this);
  };
  function u(t, e) {
    this.url = t;
    this.element = e;
    this.img = new Image();
  }
  u.prototype = Object.create(c.prototype);
  u.prototype.check = function () {
    this.img.addEventListener("load", this);
    this.img.addEventListener("error", this);
    this.img.src = this.url;
    var t = this.getIsImageComplete();
    if (t) {
      this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
      this.unbindEvents();
    }
  };
  u.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this);
    this.img.removeEventListener("error", this);
  };
  u.prototype.confirm = function (t, e) {
    this.isLoaded = t;
    this.emitEvent("progress", [this, this.element, e]);
  };
  l.makeJQueryPlugin = function (t) {
    t = t || e.jQuery;
    if (!t) {
      return;
    }
    s = t;
    s.fn.imagesLoaded = function (t, e) {
      var i = new l(this, t, e);
      return i.jqDeferred.promise(s(this));
    };
  };
  l.makeJQueryPlugin();
  return l;
});
/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */
(function (i, n) {
  if (typeof define == "function" && define.amd) {
    define(["flickity/js/index", "imagesloaded/imagesloaded"], function (t, e) {
      return n(i, t, e);
    });
  } else if (typeof module == "object" && module.exports) {
    module.exports = n(i, require("flickity"), require("imagesloaded"));
  } else {
    i.Flickity = n(i, i.Flickity, i.imagesLoaded);
  }
})(window, function t(e, i, s) {
  "use strict";
  i.createMethods.push("_createImagesLoaded");
  var n = i.prototype;
  n._createImagesLoaded = function () {
    this.on("activate", this.imagesLoaded);
  };
  n.imagesLoaded = function () {
    if (!this.options.imagesLoaded) {
      return;
    }
    var n = this;
    function t(t, e) {
      var i = n.getParentCell(e.img);
      n.cellSizeChange(i && i.element);
      if (!n.options.freeScroll) {
        n.positionSliderAtSelected();
      }
    }
    s(this.slider).on("progress", t);
  };
  return i;
});