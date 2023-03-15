/*
@license
  Praise by Commence (https://commence.studio)

  document.addEventListener('page:loaded', function() {
    // Page has loaded and theme assets are ready
  });
*/

window.theme = window.theme || {};

theme.config = {
  mqlSmall: false,
  mediaQuerySmall: "screen and (max-width: 749px)",
  isTouch:
    "ontouchstart" in window ||
    (window.DocumentTouch && window.document instanceof DocumentTouch) ||
    window.navigator.maxTouchPoints ||
    window.navigator.msMaxTouchPoints
      ? true
      : false,
  rtl: document.documentElement.getAttribute("dir") === "rtl" ? true : false,
};

theme.Currency = (function () {
  const moneyFormat = "${{amount}}"; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === "string") {
      cents = cents.replace(".", "");
    }
    let value = "";
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ",";
      decimal = decimal || ".";

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      const parts = number.split(".");
      const dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        "$1" + thousands
      );
      const centsAmount = parts[1] ? decimal + parts[1] : "";

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case "amount":
        value = formatWithDelimiters(cents, 2);
        break;
      case "amount_no_decimals":
        value = formatWithDelimiters(cents, 0);
        break;
      case "amount_with_comma_separator":
        value = formatWithDelimiters(cents, 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(cents, 0, ".", ",");
        break;
      case "amount_no_decimals_with_space_separator":
        value = formatWithDelimiters(cents, 0, " ");
        break;
      case "amount_with_apostrophe_separator":
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  function getBaseUnit(variant) {
    if (!variant) {
      return;
    }

    if (
      !variant.unit_price_measurement ||
      !variant.unit_price_measurement.reference_value
    ) {
      return;
    }

    return variant.unit_price_measurement.reference_value === 1
      ? variant.unit_price_measurement.reference_unit
      : variant.unit_price_measurement.reference_value +
          variant.unit_price_measurement.reference_unit;
  }

  return {
    formatMoney: formatMoney,
    getBaseUnit: getBaseUnit,
  };
})();

// Init section function when it's visible, then disable observer
theme.initWhenVisible = function (options) {
  const threshold = options.threshold ? options.threshold : 0;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof options.callback === "function") {
            options.callback();
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { rootMargin: `0px 0px ${threshold}px 0px` }
  );

  observer.observe(options.element);
};

(function () {
  // Trigger events when going between breakpoints
  const mql = window.matchMedia(theme.config.mediaQuerySmall);
  theme.config.mqlSmall = mql.matches;
  mql.onchange = (e) => {
    if (e.matches) {
      theme.config.mqlSmall = true;
      document.dispatchEvent(new CustomEvent("matchSmall"));
    } else {
      theme.config.mqlSmall = false;
      document.dispatchEvent(new CustomEvent("unmatchSmall"));
    }
  };

  // Page transition
  window.addEventListener("beforeunload", () => {
    document.body.classList.add("unloading");
  });
  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");

    document.dispatchEvent(new CustomEvent("page:loaded"));
  });
  window.addEventListener("pageshow", (event) => {
    // Removes unload class when returning to page via history
    if (event.persisted) {
      document.body.classList.remove("unloading");
    }
  });

  // Viewport height
  function viewportHeight() {
    const platform = navigator?.userAgentData?.platform || navigator?.platform;
    if (
      /iPad|iPhone|iPod/.test(platform) ||
      (platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`
      );
    }
    setHeaderBottomPosition();
  }
  window.addEventListener("resize", viewportHeight);
  window.addEventListener("DOMContentLoaded", viewportHeight);

  if (document.body.getAttribute("data-page-rendering") !== null) {
    // Improve initial load time by skipping the rendering of offscreen content
    const observer = new IntersectionObserver(
      (entries, _observer) => {
        entries.forEach((entry) => {
          const el = entry.target;
          // Not currently in intersection area.
          if (entry.intersectionRatio == 0) {
            return;
          }
          // Trigger rendering for elements within scroll area that haven't already been marked.
          if (!el.markedVisible) {
            el.attributeStyleMap &&
              el.attributeStyleMap.set("content-visibility", "visible");
            el.markedVisible = true;
          }
        });
      },
      // Set a rendering 50px above and 100px below the main scroll area.
      { rootMargin: "50px 0px 100px 0px" }
    );
    const sections = document.querySelectorAll(
      ".shopify-section + .shopify-section"
    );
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  /*
  // Delay JavaScript until user interaction
  const loadScriptsTimer = setTimeout(loadScripts, 5000);
  const userInteractionEvents = ["mouseover", "mousemove", "keydown", "touchstart", "touchend", "touchmove", "wheel"];
  userInteractionEvents.forEach(function(event) {
    window.addEventListener(event, triggerScriptLoader, {
      passive: !0
    });
  });
  function triggerScriptLoader() {
    loadScripts();
    clearTimeout(loadScriptsTimer);
    userInteractionEvents.forEach(function(event) {
      window.removeEventListener(event, triggerScriptLoader, {
        passive: !0
      });
    });
  }
  function loadScripts() {
    document.querySelectorAll("script[data-type='lazy']").forEach(function(script) {
      script.setAttribute("src", script.getAttribute("data-src"));
    });
  }
  */
})();

// Prevent vertical scroll while using flickity sliders
(function () {
  var e = !1;
  var t;

  document.body.addEventListener("touchstart", function (i) {
    if (!i.target.closest(".flickity-slider")) {
      return (e = !1);
    }
    e = !0;
    t = {
      x: i.touches[0].pageX,
      y: i.touches[0].pageY,
    };
  });

  document.body.addEventListener(
    "touchmove",
    function (i) {
      if (e && i.cancelable) {
        var n = {
          x: i.touches[0].pageX - t.x,
          y: i.touches[0].pageY - t.y,
        };
        Math.abs(n.x) > Flickity.defaults.dragThreshold && i.preventDefault();
      }
    },
    { passive: !1 }
  );
})();

/* Featured Collection Logic */
///////////////////////////////
///////////////////////////////

class FeaturedCollection extends HTMLElement {
  constructor() {
    super();

    if (this.dataset.slider == "true") {
      this.slides = this.querySelector(".featured-collection__cards");
      this.controls = this.querySelector(".featured-collection__controls");
      this.background = this.querySelector(
        ".featured-collection__background-color"
      );

      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 600,
      });
      theme.initWhenVisible({
        element: this,
        callback: this.update.bind(this),
        threshold: 0,
      });
    }
  }

  init() {
    setTimeout(() => {
      this.flickity = new Flickity(this.slides, {
        accessibility: false,
        rightToLeft: theme.config.rtl,
        prevNextButtons: false,
        pageDots: this.dataset.customControls == "true" ? false : true,
        wrapAround: true,
        selectedAttraction: 0.2,
        prevNextButtons: this.dataset.customControls == "true" ? false : true,
        autoPlay: false,
        friction: 0.8,
        adaptiveHeight: false,
        arrowShape:
          "M38.39,17.65a3.91,3.91,0,0,0-1.12-1.51,3.83,3.83,0,0,0-1.69-.8A3.84,3.84,0,0,0,32.1,16.4L1.33,47.17a3.83,3.83,0,0,0-.83,4.2,3.85,3.85,0,0,0,.83,1.25L32.1,83.38a3.81,3.81,0,0,0,2.72,1.13,3.85,3.85,0,0,0,2.73-6.57L13.34,53.74h83a3.85,3.85,0,1,0,0-7.69h-83l24.21-24.2a3.8,3.8,0,0,0,1.05-2A3.86,3.86,0,0,0,38.39,17.65Z",
      });
      this.flickityBackground = new Flickity(this.background, {
        accessibility: false,
        rightToLeft: theme.config.rtl,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        draggable: false,
        cellAlign: "center",
        pauseAutoPlayOnHover: true,
      });
      this.flickityControls = new Flickity(this.controls, {
        accessibility: false,
        rightToLeft: theme.config.rtl,
        arrowShape:
          "M38.39,17.65a3.91,3.91,0,0,0-1.12-1.51,3.83,3.83,0,0,0-1.69-.8A3.84,3.84,0,0,0,32.1,16.4L1.33,47.17a3.83,3.83,0,0,0-.83,4.2,3.85,3.85,0,0,0,.83,1.25L32.1,83.38a3.81,3.81,0,0,0,2.72,1.13,3.85,3.85,0,0,0,2.73-6.57L13.34,53.74h83a3.85,3.85,0,1,0,0-7.69h-83l24.21-24.2a3.8,3.8,0,0,0,1.05-2A3.86,3.86,0,0,0,38.39,17.65Z",
        prevNextButtons: true,
        pageDots: false,
        wrapAround: false,
        contain: true,
        draggable: false,
        cellAlign: "center",
        pauseAutoPlayOnHover: true,
        asNavFor: this.slides && this.background,
      });

      this.flickityControls.on(
        "staticClick",
        (_event, _pointer, _cellElement, cellIndex) => {
          if (typeof cellIndex == "number") {
            this.flickity.select(cellIndex);
            this.flickityBackground.select(cellIndex);
          }
        }
      );

      // Do stuff based on a successful swipe and it's direction
      this.flickityControls.on("change", (index) => {
        this.flickity.select(index);
        this.flickityBackground.select(index);
        var themedTextColor = this.slides
          .querySelector(".is-selected")
          .getAttribute("data-text-color");
        this.slides.style.setProperty(
          "--featuredCollectionThemedTextColor",
          themedTextColor
        );
      });
    });
  }

  update() {
    setTimeout(() => {
      if (this.flickity && this.flickityNav) {
        this.flickityNav.next();
      }
    }, 300);
  }
}
customElements.define("featured-collection", FeaturedCollection);

/* Shop the Look Logic */
///////////////////////////////
///////////////////////////////

class ShopTheLook extends HTMLElement {
  constructor() {
    super();

    if (this.dataset.slider == "true") {
      this.slides = this.querySelector(".shop-the-look__products");
      this.controls = this.querySelector(".shop-the-look__dots");
      this.background = this.querySelector(".shop-the-look__background-color");

      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 600,
      });
      theme.initWhenVisible({
        element: this,
        callback: this.update.bind(this),
        threshold: 0,
      });
    }
  }

  init() {
    setTimeout(() => {
      this.flickity = new Flickity(this.slides, {
        accessibility: false,
        rightToLeft: theme.config.rtl,
        prevNextButtons: true,
        arrowShape:
          "M38.39,17.65a3.91,3.91,0,0,0-1.12-1.51,3.83,3.83,0,0,0-1.69-.8A3.84,3.84,0,0,0,32.1,16.4L1.33,47.17a3.83,3.83,0,0,0-.83,4.2,3.85,3.85,0,0,0,.83,1.25L32.1,83.38a3.81,3.81,0,0,0,2.72,1.13,3.85,3.85,0,0,0,2.73-6.57L13.34,53.74h83a3.85,3.85,0,1,0,0-7.69h-83l24.21-24.2a3.8,3.8,0,0,0,1.05-2A3.86,3.86,0,0,0,38.39,17.65Z",

        pageDots: true,
        wrapAround: false,
        cellAlign: "left",
        selectedAttraction: 0.2,
        autoPlay: false,
        friction: 0.8,
        adaptiveHeight: false,
      });
      this.flickityBackground = new Flickity(this.background, {
        accessibility: false,
        rightToLeft: theme.config.rtl,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        draggable: false,
        cellAlign: "center",
        pauseAutoPlayOnHover: true,
      });
      this.flickityControls = new Flickity(this.controls, {
        accessibility: false,
        rightToLeft: theme.config.rtl,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        contain: true,
        draggable: false,
        cellAlign: "center",
        pauseAutoPlayOnHover: true,
        asNavFor: this.slides && this.background,
      });

      this.flickity.on(
        "staticClick",
        (_event, _pointer, _cellElement, cellIndex) => {
          if (typeof cellIndex == "number") {
            this.flickityControls.select(cellIndex);
            this.flickityBackground.select(cellIndex);
          }
        }
      );

      this.flickityControls.on(
        "staticClick",
        (_event, _pointer, _cellElement, cellIndex) => {
          if (typeof cellIndex == "number") {
            this.flickity.select(cellIndex);
            this.flickityBackground.select(cellIndex);
          }
        }
      );

      // Do stuff based on a successful swipe and it's direction
      this.flickity.on("change", (index) => {
        this.flickityControls.select(index);
        this.flickityBackground.select(index);
      });
    });
  }

  update() {
    setTimeout(() => {
      if (this.flickity && this.flickityNav) {
        this.flickityNav.next();
      }
    }, 300);
  }
}
customElements.define("shop-the-look", ShopTheLook);

/* Content Marquee Logic */
///////////////////////////////
///////////////////////////////

class ContentMarquee extends HTMLElement {
  constructor() {
    super();

    this.marquee = this;

    this.isDown = false;

    this.mouseMoved = 0;

    this.leftPos = 0;

    theme.initWhenVisible({
      element: this,
      callback: this.init.bind(this),
      threshold: 600,
    });
  }

  init() {
    this.addEventListener(
      "mousedown",
      function (e) {
        this.isDown = true;
        this.marquee.style.transition = "none";
        this.marquee.parentElement.style.transform = "scale(1.05)";
      },
      true
    );

    this.addEventListener(
      "mouseup",
      function () {
        this.isDown = false;
        this.mouseMoved = 0;
        this.leftPos = parseInt(this.marquee.style.left);
        this.marquee.parentElement.style.transform = "none";
        this.returnToOriginalPos();
      },
      true
    );

    this.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (this.isDown) {
          this.mouseMoved = event.movementX + this.mouseMoved;
          this.marquee.style.left = this.mouseMoved + this.leftPos + "px";
        }
      },
      true
    );
  }

  returnToOriginalPos() {
    if (this.leftPos != 0) {
      this.marquee.style.transition = "left .25s ease";
      this.marquee.style.left = 0;
      this.leftPos = 0;
    }
  }
}
customElements.define("content-marquee", ContentMarquee);

/* Overflow Slider Logic */
///////////////////////////////
///////////////////////////////

class OverflowSlider extends HTMLElement {
  constructor() {
    super();

    this.slider = this;
    this.sliderContainer = this.querySelector(".overflow-slider__container");
    this.prevArrow = this.querySelector(".overflow-slider__arrow.prev");
    this.nextArrow = this.querySelector(".overflow-slider__arrow.next");

    if (!this.prevArrow || !this.nextArrow) return;

    theme.initWhenVisible({
      element: this,
      callback: this.init.bind(this),
      threshold: 600,
    });
  }

  init() {
    [this.prevArrow, this.nextArrow].forEach((arrow) => {
      arrow.addEventListener("click", () => {
        this.moveSlide(arrow.classList.contains("prev"));
      });
    });

    this.sliderContainer.addEventListener("scroll", () => {
      var scrollPercentage =
        (this.sliderContainer.scrollLeft /
          (this.sliderContainer.scrollWidth -
            this.sliderContainer.clientWidth)) *
        100;
      var hidePrev = scrollPercentage <= 2;
      var hideNext = scrollPercentage >= 98;

      if (hidePrev) {
        this.prevArrow.classList.add("disabled");
      } else {
        this.prevArrow.classList.remove("disabled");
      }

      if (hideNext) {
        this.nextArrow.classList.add("disabled");
      } else {
        this.nextArrow.classList.remove("disabled");
      }
    });
  }

  moveSlide(prevPressed) {
    var slideWidth =
      this.sliderContainer.firstElementChild.offsetWidth +
      this.sliderContainer.scrollLeft;
    var direction = prevPressed ? -1 : 1;
    var endPos = slideWidth * direction;
    this.sliderContainer.scrollLeft = endPos;
  }
}
customElements.define("overflow-slider", OverflowSlider);

/* Text Area Counter */
///////////////////////////////
///////////////////////////////

class TextareaCounter extends HTMLElement {
  constructor() {
    super();
    this.textarea = this.querySelector("textarea");
    this.current = this.querySelector(".textarea-counter__count__current");
    this.count = 1;

    if (!this.textarea || !this.current) return;
  }

  connectedCallback() {
    this.addEventListener("keyup", this.updateCount, true);
  }

  updateCount(e) {
    this.count = this.textarea.value.length;
    this.updateNumber();
  }

  updateNumber() {
    this.current.innerHTML = this.count;
  }
}
customElements.define("textarea-counter", TextareaCounter);

/* Number Input */
///////////////////////////////
///////////////////////////////

class NumberInput extends HTMLElement {
  constructor() {
    super();
    this.increment = this.querySelector(".increment");
    this.decrement = this.querySelector(".decrement");
    this.input = this.querySelector("input[type='number']");
    console.log(this.input);

    if (!this.increment || !this.decrement || !this.input) return;
    this.increment.addEventListener(
      "click",
      this.increaseInputValue.bind(this)
    );
    this.decrement.addEventListener(
      "click",
      this.decreaseInputValue.bind(this)
    );
  }

  increaseInputValue() {
    this.input.value = parseInt(this.input.value) + 1;
  }
  decreaseInputValue() {
    this.input.value = parseInt(this.input.value) - 1;
  }
}
customElements.define("number-input", NumberInput);

/* Logic the Shopify Starter Included */
////////////////////////////////////////
///////////////////////////////////////

document.querySelectorAll(".disclosure").forEach((details) => {
  const summary = details.querySelector("summary");
  const cancel = details.querySelector('button[type="reset"]');

  summary.setAttribute(
    "aria-expanded",
    summary.parentElement.hasAttribute("open")
  );

  summary.addEventListener("click", () => {
    summary.setAttribute("aria-expanded", !details.hasAttribute("open"));
  });

  cancel &&
    cancel.addEventListener("click", () => {
      details.removeAttribute("open");
      summary.setAttribute("aria-expanded", "false");
    });
});

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fetchConfig(type = "json") {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: `application/${type}`,
    },
  };
}

function pauseAllMedia() {
  document.querySelectorAll("product-model").forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

/* Supporting Functions from Be Yours Theme */
/////////////////////////////////////////////
/////////////////////////////////////////////

function setHeaderBottomPosition() {
  const header = document.getElementById("shopify-section-header");
  if (header) {
    document.documentElement.style.setProperty(
      "--header-bottom-position",
      `${parseInt(header.getBoundingClientRect().bottom)}px`
    );
  }
}
