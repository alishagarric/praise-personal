class QuickAddModal extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("click", this.openModal.bind(this));
    //TODO: add ability to add button to main-product
    //TODO: Figure out how to make main-product javascript work
    //TODO: Prevent quick add button for no javascript users

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
          document.body.appendChild(productElement);
          document.body.classList.add("__mobile-overflow-none");
          const closes = productElement.querySelectorAll(
            ".main-modal__close, .main-modal"
          );
          closes.forEach((close) => {
            close.addEventListener("click", () => {
              document.body.removeChild(productElement);
              document.body.classList.remove("__mobile-overflow-none");
            });
          });

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

  setInnerHTML(element, html) {
    element.innerHTML = html;

    // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
    element.querySelectorAll("script").forEach((oldScriptTag) => {
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
