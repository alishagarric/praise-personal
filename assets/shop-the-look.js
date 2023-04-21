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

      this.init();
    }
  }

  init() {
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
  }
}
customElements.define("shop-the-look", ShopTheLook);
