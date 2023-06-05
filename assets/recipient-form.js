if (!customElements.get("recipient-form")) {
  customElements.define(
    "recipient-form",
    class RecipientForm extends HTMLElement {
      constructor() {
        super();
        console.log("constructor");
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
        this.errorMessageWrapper = this.querySelector(
          `#Recipient-errors-${this.dataset.sectionId}`
        );
        this.errorMessageList = this.errorMessageWrapper?.querySelector("ul");
        this.errorMessage =
          this.errorMessageWrapper?.querySelector(".message-error");
        this.defaultErrorHeader = this.errorMessage?.innerText;
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
          this.clearErrorMessage();
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

      displayErrorMessage(title, body) {
        console.log("displayErrorMessage");
        this.clearErrorMessage();
        this.errorMessageWrapper.hidden = false;
        if (typeof body === "object") {
          this.errorMessage.innerText = this.defaultErrorHeader;
          return Object.entries(body).forEach(([key, value]) => {
            const errorMessageId = `RecipientForm-${key}-error-${this.dataset.sectionId}`;
            const fieldSelector = `#Recipient-${key}-${this.dataset.sectionId}`;
            const placeholderElement = this.querySelector(`${fieldSelector}`);
            const label =
              placeholderElement?.getAttribute("placeholder") || key;
            const message = `${label} ${value}`;
            const errorMessageElement = this.querySelector(
              `#${errorMessageId}`
            );
            const errorTextElement =
              errorMessageElement?.querySelector(".message-error");
            if (!errorTextElement) return;

            if (this.errorMessageList) {
              this.errorMessageList.appendChild(
                this.createErrorListItem(fieldSelector, message)
              );
            }

            errorTextElement.innerText = `${message}.`;
            errorMessageElement.classList.remove("hidden");

            const inputElement = this[`${key}Input`];
            if (!inputElement) return;

            inputElement.setAttribute("aria-invalid", true);
            inputElement.setAttribute("aria-describedby", errorMessageId);
          });
        }

        this.errorMessage.innerText = body;
      }

      createErrorListItem(target, message) {
        console.log("createErrorListItem");
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", target);
        a.innerText = message;
        li.appendChild(a);
        li.className = "message-error";
        return li;
      }

      clearErrorMessage() {
        console.log("clearErrorMessage");
        this.errorMessageWrapper.hidden = true;

        if (this.errorMessageList) this.errorMessageList.innerHTML = "";

        this.querySelectorAll(".recipient-fields__error").forEach((field) => {
          field.classList.add("hidden");
          const textField = field.querySelector(".message-error");
          if (textField) textField.innerText = "";
        });

        [this.emailInput, this.messageInput, this.nameInput].forEach(
          (inputElement) => {
            inputElement.setAttribute("aria-invalid", false);
            inputElement.removeAttribute("aria-describedby");
          }
        );
      }
    }
  );
}
