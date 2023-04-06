class FilterAndSort extends HTMLElement {
  constructor() {
    super();

    this.sortInputs = this.querySelectorAll(".filter-and-sort__sort input");
    this.form = this.querySelector("form");
    if (!this.form || this.sortInputs.length <= 0) return;

    this.setupListener();
  }

  setupListener() {
    this.sortInputs.forEach((input) => {
      input.addEventListener("change", this.submitForm.bind(this));
    });
  }

  submitForm() {
    this.form.submit();
  }
}

customElements.define("filter-and-sort", FilterAndSort);
