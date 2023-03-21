class QuickAddModal extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", this.openModal.bind(this));

    //  new IntersectionObserver(this.handleIntersection.bind(this)).observe(this);
  }

  openModal() {
    console.log("click");
    const productUrl = this.dataset.productUrl.split("?")[0];
    let sectionUrl = `${productUrl}?view=modal`;

    // remove double `/` in case shop might have /en or language in URL
    sectionUrl = sectionUrl.replace("//", "/");

    fetch(sectionUrl)
      .then((response) => response.text())
      .then((responseText) => {
        setTimeout(() => {
          const responseHTML = new DOMParser().parseFromString(
            responseText,
            "text/html"
          );
          const selector = ".main-product__wrapper";
          const productElement = responseHTML.querySelector(selector);

          this.appendChild(productElement);

          if (window.Shopify && Shopify.PaymentButton) {
            //TODO: what is this?
            Shopify.PaymentButton.init();
          }
        }, 200);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  handleIntersection(entries, _observer) {
    if (!entries[0].isIntersecting) return;

    const selector = ".quick-view__content";
    const drawerContent = this.querySelector(selector);
    const productUrl = this.dataset.productUrl.split("?")[0];
    let sectionUrl = `${window.routes.root_url}${productUrl}?view=modal`;

    // remove double `/` in case shop might have /en or language in URL
    sectionUrl = sectionUrl.replace("//", "/");

    fetch(sectionUrl)
      .then((response) => response.text())
      .then((responseText) => {
        setTimeout(() => {
          const responseHTML = new DOMParser().parseFromString(
            responseText,
            "text/html"
          );
          const productElement = responseHTML.querySelector(selector);
          this.setInnerHTML(drawerContent, productElement.innerHTML);

          if (window.Shopify && Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
          }
        }, 200);

        setTimeout(() => {
          drawerContent.classList.add("hide-cover");

          document.dispatchEvent(
            new CustomEvent("quickview:loaded", {
              detail: {
                productUrl: this.dataset.productUrl,
              },
            })
          );
        }, 500);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  appendChild(child) {
    document.body.appendChild(child);
    document.body.classList.add("__mobile-overflow-none");

    const close = child.querySelector(".main-modal__close");

    close.addEventListener("click", () => {
      document.body.removeChild(child);
      document.body.classList.remove("__mobile-overflow-none");
    });

    // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
    child.querySelectorAll("script").forEach((oldScriptTag) => {
      const newScriptTag = document.createElement("script");
      Array.from(oldScriptTag.attributes).forEach((attribute) => {
        newScriptTag.setAttribute(attribute.name, attribute.value);
      });
      newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
      oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
    });
  }
}
customElements.define("quick-add-modal", QuickAddModal);
