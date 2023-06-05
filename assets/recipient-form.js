if (!customElements.get("recipient-form")) {
  customElements.define(
    "recipient-form",
    class RecipientForm extends HTMLElement {
      constructor() {
        super();
        this.checkboxInput = this.querySelector(
          `#Recipient-Checkbox-${this.dataset.sectionId}`
        );
        this.checkboxInput.disabled = false;
        this.hiddenControlField = this.querySelector(
          `#Recipient-Control-${this.dataset.sectionId}`
        );
        this.hiddenControlField.disabled = true;
        this.emailInput = this.querySelector(
          `#Recipient-email-${this.dataset.sectionId}`
        );
        this.nameInput = this.querySelector(
          `#Recipient-name-${this.dataset.sectionId}`
        );
        this.messageInput = this.querySelector(
          `#Recipient-message-${this.dataset.sectionId}`
        );
        this.currentProductVariantId = this.dataset.productVariantId;
        this.validEmail = false;
        this.emailInput.addEventListener("input", this.emailChange.bind(this));
        this.addEventListener("change", this.onChange.bind(this));
      }

      emailChange() {
        if (
          this.validateEmail(this.emailInput.value) &&
          this.validEmail == false
        ) {
          this.validEmail = true;
          this.setAvailable();
        }
      }

      validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      onChange() {
        if (!this.checkboxInput.checked) {
          this.clearInputFields();
          this.classList.add("__hide-fields");
          this.setAvailable();
          this.validEmail = false;
        } else {
          this.classList.remove("__hide-fields");
          if (this.validEmail == false) {
            this.setUnavailable();
          }
        }
      }

      clearInputFields() {
        console.log("clearInputFields");
        this.emailInput.value = "";
        this.nameInput.value = "";
        this.messageInput.value = "";
      }

      // Change button text to unavailable and hide price
      setUnavailable() {
        const button = document.getElementById(
          `Product-Form-${this.dataset.sectionId}${this.dataset.productId}`
        );
        const addButton = button.querySelector('[name="add"]');
        const addButtonText = button.querySelector('[name="add"] > span');

        if (!addButton) return;
        addButtonText.textContent =
          window.recipientStrings.provideRecipientEmail;
        addButton.setAttribute("disabled", "disabled");
      }

      setAvailable() {
        const button = document.getElementById(
          `Product-Form-${this.dataset.sectionId}${this.dataset.productId}`
        );
        const addButton = button.querySelector('[name="add"]');
        const addButtonText = button.querySelector('[name="add"] > span');

        if (!addButton) return;
        addButtonText.textContent = window.variantStrings.addToCart;
        addButton.removeAttribute("disabled");
      }
    }
  );
}
