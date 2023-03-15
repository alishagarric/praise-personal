if (!customElements.get("media-gallery")) {
  customElements.define(
    "media-gallery",
    class MediaGallery extends HTMLElement {
      constructor() {
        super();

        this.dots = this.querySelectorAll(`.main-product__media__dots__dot`);
        this.prev = this.querySelector(`.main-product__media__dots__prev`);
        this.next = this.querySelector(`.main-product__media__dots__next`);

        if (!this.dots.length != 0 || !this.prev || !this.next) return;

        this.setupListener();
      }

      setupListener() {
        this.dots.forEach((dot) => {
          dot.addEventListener("click", () => {
            console.log(dot.dataset);
            this.setActiveMedia(`${dot.dataset.mediaDotId}`);
          });
        });

        this.prev.addEventListener("click", () => {
          const activeDot = this.querySelector(
            `.main-product__media__dots__dot.__active`
          );
          this.setActiveMedia(activeDot.previousSibling.dataset.mediaDotId);
        });

        this.next.addEventListener("click", () => {
          const activeDot = this.querySelector(
            `.main-product__media__dots__dot.__active`
          );
          this.setActiveMedia(activeDot.nextSibling.dataset.mediaDotId);
        });
      }

      setActiveMedia(mediaId) {
        const activeMedia = this.querySelector(`[data-media-id="${mediaId}"]`);
        if (!activeMedia) return;

        activeMedia.parentElement.prepend(activeMedia);
        this.setActiveDot(mediaId);
      }

      setActiveDot(mediaDotId) {
        const activeDot = this.querySelector(
          `[data-media-dot-id="${mediaDotId}"]`
        );
        if (!activeDot) return;

        activeDot.classList.add("__active");
        this.dots.forEach((dot) => {
          if (dot != activeDot) {
            dot.classList.remove("__active");
          }
        });
      }
    }
  );
}
