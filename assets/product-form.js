if (!customElements.get("product-form")) {
  customElements.define(
    "product-form",
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector("form");
        this.form.querySelector("[name=id]").disabled = false;
        this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
        this.submitButton = this.querySelector('[type="submit"]');

        this.hideErrors = this.dataset.hideErrors === "true";
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute("aria-disabled") === "true") return;

        // Passing no argument will hide the error message if one was on screen because errorText defaults to false
        this.handleErrorMessage();

        // Disabling the button temporarily so that the request can be processed
        this.submitButton.setAttribute("aria-disabled", true);
        this.submitButton.classList.add("loading");

        const config = {
          method: "POST",
          headers: {
            Accept: "application/javascript",
            "X-Requested-With": "XMLHttpRequest",
          },
        };

        const formData = new FormData(this.form);
        formData.append("sections", ["cart-bubble", "cart-drawer"]);

        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              this.handleErrorMessage(response.description);

              this.error = true;

              return;
            }

            let cartBubbleOne = document.getElementById("CartBubble-1");

            if (cartBubbleOne) {
              cartBubbleOne.innerHTML = `${response.sections[
                "cart-bubble"
              ].match(/\d+/)}`;
            }

            let cartBubbleTwo = document.getElementById("CartBubble-2");

            if (cartBubbleTwo) {
              cartBubbleTwo.innerHTML = `${response.sections[
                "cart-bubble"
              ].match(/\d+/)}`;
            }

            let dialogCartOne = document
              .getElementById("dialog-cart-1")
              .querySelector(".dialog__content__body");

            if (dialogCartOne) {
              dialogCartOne.innerHTML = `${response.sections["cart-drawer"]}`;
            }

            let dialogCartTwo = document
              .getElementById("dialog-cart-2")
              .querySelector(".dialog__content__body");

            if (dialogCartTwo) {
              dialogCartTwo.innerHTML = `${response.sections["cart-drawer"]}`;
            }

            document.getElementById("dialog-cart-2").parentNode.open = true;

            this.error = false;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally((response) => {
            this.submitButton.classList.remove("loading");
            if (this.cart && this.cart.classList.contains("is-empty"))
              this.cart.classList.remove("is-empty");
            this.submitButton.removeAttribute("aria-disabled");
          });
      }

      handleErrorMessage(errorText = false) {
        console.log("THis is an error");
        if (this.hideErrors) return;

        this.errorMessage =
          this.errorMessage || this.querySelector(".message-error");
        if (!this.errorMessage) return;

        this.errorMessage.classList.toggle("hidden", !errorText);

        this.errorMessage.textContent = errorText ? errorText : "";
      }
    }
  );
}
