class CartRecommendations extends HTMLElement {
  constructor() {
    super();

    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.unobserve(this);

      fetch(this.dataset.url)
        .then((response) => response.text())
        .then((text) => {
          const recommendations = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("cart-recommendations");
          if (recommendations && recommendations.innerHTML.trim().length) {
            this.innerHTML = recommendations.innerHTML;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    };

    // load recommendations when 200px from bottom of viewport
    new IntersectionObserver(handleIntersection.bind(this), {
      rootMargin: "0px 0px 200px 0px",
    }).observe(this);
  }
}

customElements.define("cart-recommendations", CartRecommendations);
