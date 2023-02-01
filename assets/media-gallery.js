if (!customElements.get("media-gallery")) {
  customElements.define(
    "media-gallery",
    class MediaGallery extends HTMLElement {
      constructor() {
        super();

        this.dots = this.querySelectorAll(`.main-product__media__dots li`);
      }

      init() {
        //TODO: why isn't this firing
        this.dots.addEventListener("click", console.log("click", this.dots));
      }

      setActiveMedia(mediaId) {
        const activeMedia = this.querySelector(`[data-media-id="${mediaId}"]`);
        if (!activeMedia) return;

        activeMedia.parentElement.prepend(activeMedia);
      }
    }
  );
}
