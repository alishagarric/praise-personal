class DeferredMedia extends HTMLElement {
  constructor() {
    super();

    this.poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!this.poster) return;

    this.poster.addEventListener("click", this.loadContent.bind(this));
  }

  loadContent() {
    window.pauseAllMedia();
    if (!this.getAttribute("loaded")) {
      const content = document.createElement("div");
      content.appendChild(
        this.querySelector("template").content.firstElementChild.cloneNode(true)
      );

      if (content.querySelector("video-section")) {
        this.appendChild(content).focus();
      } else {
        this.setAttribute("loaded", true);
        this.appendChild(
          content.querySelector("video, model-viewer, iframe")
        ).focus();
      }
    }
  }
}
customElements.define("deferred-media", DeferredMedia);
