class CartRecommendations extends HTMLElement {
  constructor() {
    super();
    this.render(this.dataset.url);
  }

  render(url) {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const html = new DOMParser()
          .parseFromString(text, "text/html")
          .querySelector(".cart-recommendations");
        this.innerHTML = html.innerHTML;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

customElements.define("cart-recommendations", CartRecommendations);
