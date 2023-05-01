class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;

    poster.addEventListener("click", this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute("loaded")) {
      console.log("not loaded yet");
      const content = document.createElement("div");
      content.appendChild(
        this.querySelector("template").content.firstElementChild.cloneNode(true)
      );

      if (content.querySelector("video-section")) {
        console.log(content);
        const deferredElement = this.appendChild(content);
        if (focus) deferredElement.focus();
      } else {
        this.setAttribute("loaded", true);
        const deferredElement = this.appendChild(
          content.querySelector("video, model-viewer, iframe")
        );
        if (focus) deferredElement.focus();
      }
    }
  }
}

customElements.define("deferred-media", DeferredMedia);
