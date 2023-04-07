class SubmitOnChange extends HTMLElement {
  constructor() {
    super();

    this.initiators = this.querySelectorAll(".submit-on-change__initiator");
    this.form = this.querySelector("form");
    if (!this.form || this.initiators.length <= 0) return;

    this.setupListener();
  }

  setupListener() {
    this.initiators.forEach((input) => {
      input.addEventListener("change", this.submitForm.bind(this));
    });
  }

  submitForm() {
    this.form.submit();
  }
}

customElements.define("submit-on-change", SubmitOnChange);
