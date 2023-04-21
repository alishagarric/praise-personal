class QuickAddDropdown extends HTMLElement {
  constructor() {
    super();

    this.disclosure = this.querySelector("details");
    this.disclosureContent = this.querySelector(".disclosure__content");
    this.section = this.closest("section").querySelector("div");
    this.closestOverflowParent = this.findClosestOverflowParent(
      this.disclosure
    );

    this.disclosure.addEventListener("toggle", this.openDisclosure.bind(this));
  }

  openDisclosure() {
    console.log("click");
    if (this.disclosure.getAttribute("open") == false) {
      // Get the top, left coordinates of two elements
      let sectionBounds = this.section.getBoundingClientRect();
      let disclosureBounds = this.disclosure.getBoundingClientRect();

      // Calculate the top and left positions
      let top = disclosureBounds.bottom - sectionBounds.top;
      let left = disclosureBounds.left - sectionBounds.left;
      let right = sectionBounds.right - disclosureBounds.right;
      this.disclosureContent.style.top = top + "px";
      this.disclosureContent.style.left = left + "px";
      this.disclosureContent.style.right = right + "px";
      this.disclosureContent.classList.add(
        "product-card-relocated-dosclosure-content"
      );
      console.log(top, left, this.disclosureContent.style);
      this.section.appendChild(this.disclosureContent);

      if (this.closestOverflowParent) {
        this.closestOverflowParent.addEventListener(
          "scroll",
          this.onScroll.bind(this),
          false
        );
      }
      window.addEventListener("resize", this.closeDisclosure.bind(this), false);
    } else {
      this.closeDisclosure();
    }
  }

  onScroll() {
    this.closeDisclosure();
    if (this.closestOverflowParent) {
      this.closestOverflowParent.removeEventListener(
        "scroll",
        this.onScroll.bind(this),
        false
      );
    }
  }

  findClosestOverflowParent(element) {
    let parent = element.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      const overflow = style.getPropertyValue("overflow");
      const overflowX = style.getPropertyValue("overflow-x");
      const overflowY = style.getPropertyValue("overflow-y");

      if (
        (overflow === "auto" ||
          overflow === "scroll" ||
          overflowX === "auto" ||
          overflowX === "scroll" ||
          overflowY === "auto" ||
          overflowY === "scroll") &&
        parent !== document.body
      ) {
        return parent;
      }

      if (parent.tagName === "SECTION") {
        break;
      }

      parent = parent.parentElement;
    }

    return null;
  }

  closeDisclosure() {
    window.removeEventListener(
      "resize",
      this.closeDisclosure.bind(this),
      false
    );

    this.disclosure.open = false;
    this.disclosure.appendChild(this.disclosureContent);
  }
}
customElements.define("quick-add-dropdown", QuickAddDropdown);
