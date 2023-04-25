if (
  !customElements.get("variant-selects") &&
  !customElements.get("variant-radios")
) {
  class VariantSelects extends HTMLElement {
    constructor() {
      super();
      this.addEventListener("change", this.onVariantChange);
    }

    onVariantChange() {
      this.updateOptions();
      this.updateVariantId();
      this.toggleAddButton(true);
      this.updatePickupAvailability();
      this.removeErrorMessage();

      //if we couldn't find a currently selected variant for whatever reason
      if (!this.currentVariant) {
        this.toggleAddButton(true);
        this.setUnavailable();
      } else {
        this.updateMedia();
        this.updateURL();
        this.updateVariantInput();
        this.renderProductInfo();
        this.updateShareUrl();
      }
    }

    // Updates currently selected options such as, this.options = [ Red, Small ]
    updateOptions() {
      this.options = Array.from(
        this.querySelectorAll("select"),
        (select) => select.value
      );
    }

    // Using currently selected options, get currently selected variant
    updateVariantId() {
      this.currentVariant = this.getVariantData().find((variant) => {
        return !variant.options
          .map((option, index) => {
            return this.options[index] === option;
          })
          .includes(false);
      });
    }

    //if currently selected variant has featured media, put it first
    updateMedia() {
      if (!this.currentVariant) return;
      if (!this.currentVariant.featured_media) return;

      const mediaGallery = document.getElementById(
        `Product-MediaGallery-${this.dataset.section}${this.dataset.productId}`
      );
      if (!mediaGallery) return;

      mediaGallery.setActiveMedia(
        `${this.dataset.section}${this.dataset.productId}-${this.currentVariant.featured_media.id}`
      );
    }

    //update the url to include the variant query
    updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === "false") return;
      window.history.replaceState(
        {},
        "",
        `${this.dataset.url}?variant=${this.currentVariant.id}`
      );
    }

    //TODO unaware of a share component exsiting in starter, we may have to build it
    updateShareUrl() {
      const shareButton = document.getElementById(
        `Share-${this.dataset.section}${this.dataset.productId}`
      );
      if (!shareButton || !shareButton.updateUrl) return;
      shareButton.updateUrl(
        `${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`
      );
    }

    //Update the current variant id value on all product forms that use it
    updateVariantInput() {
      const productForms = document.querySelectorAll(
        `#Product-Form-${this.dataset.section}${this.dataset.productId}, #Installment-${this.dataset.section}${this.dataset.productId}`
      );

      productForms.forEach((productForm) => {
        const input = productForm.querySelector('input[name="id"]');
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }

    //removes any error messages from the product form customElement
    removeErrorMessage() {
      const section = this.closest("section");
      if (!section) return;

      const productForm = section
        .querySelector(
          `#Product-Form-${this.dataset.section}${this.dataset.productId}, #Installment-${this.dataset.section}${this.dataset.productId}`
        )
        .closest("product-form");
      if (productForm) productForm.handleErrorMessage();
    }

    //WOWWW, brilliant. Store new variant page DOM in variable, and populate current page's price with it, and call the toggle add to cart button using new variants avialability variable
    renderProductInfo() {
      fetch(
        `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
      )
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(
            responseText,
            "text/html"
          );
          const destination = document.getElementById(
            `Price-${this.dataset.section}${this.dataset.productId}`
          );
          const source = html.getElementById(
            `Price-${this.dataset.section}${this.dataset.productId}`
          );
          if (source && destination) destination.innerHTML = source.innerHTML;

          const price = document.getElementById(
            `Price-${this.dataset.section}${this.dataset.productId}`
          );

          if (price) price.classList.remove("visibility-hidden");
          this.toggleAddButton(
            !this.currentVariant.available,
            window.variantStrings.soldOut
          );
        });
    }

    // update add to cart button's text and disabled state
    toggleAddButton(disable = true, text) {
      const productForm = document.getElementById(
        `Product-Form-${this.dataset.section}${this.dataset.productId}`
      );
      if (!productForm) return;

      const addButton = productForm.querySelector('[name="add"]');
      const addButtonText = productForm.querySelector('[name="add"] > span');

      if (!addButton) return;

      if (disable) {
        addButton.setAttribute("disabled", "disabled");
        if (text) addButtonText.textContent = text;
      } else {
        addButton.removeAttribute("disabled");
        addButtonText.textContent = window.variantStrings.addToCart;
      }
    }

    // Change button text to unavailable and hide price
    setUnavailable() {
      const button = document.getElementById(
        `Product-Form-${this.dataset.section}${this.dataset.productId}`
      );
      const addButton = button.querySelector('[name="add"]');
      const addButtonText = button.querySelector('[name="add"] > span');
      const price = document.getElementById(
        `Price-${this.dataset.section}${this.dataset.productId}`
      );

      if (!addButton) return;
      addButtonText.textContent = window.variantStrings.unavailable;
      if (price) price.classList.add("visibility-hidden");
    }

    // Get all product variant data so we can loop through it in other functions
    getVariantData() {
      this.variantData =
        this.variantData ||
        JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }

    updatePickupAvailability() {
      const pickUpAvailability = document.querySelector("pickup-availability");
      if (!pickUpAvailability) return;

      if (this.currentVariant && this.currentVariant.available) {
        pickUpAvailability.render(this.currentVariant.id);
      } else {
        pickUpAvailability.innerHTML = "";
      }
    }
  }
  customElements.define("variant-selects", VariantSelects);

  class VariantRadios extends VariantSelects {
    constructor() {
      super();
    }

    updateOptions() {
      const fieldsets = Array.from(this.querySelectorAll("fieldset"));
      this.options = fieldsets.map((fieldset) => {
        return Array.from(fieldset.querySelectorAll("input")).find(
          (radio) => radio.checked
        ).value;
      });
    }
  }
  customElements.define("variant-radios", VariantRadios);
}
