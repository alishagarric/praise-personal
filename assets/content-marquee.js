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
