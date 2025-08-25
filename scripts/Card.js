import { openPopup } from "./utils.js";

export class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return template;
  }

  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".element-delete-btn")
      .addEventListener("click", () => cardElement.remove());

    cardElement
      .querySelector(".element-image-like")
      .addEventListener("click", (e) => {
        e.target.classList.toggle("liked");
      });

    cardElement
      .querySelector(".element-image")
      .addEventListener("click", () => {
        const modalImage = document.getElementById("modalImage");
        const modalImageTitle = document.getElementById("modalImageTitle");
        const imageModal = document.getElementById("imageModal");

        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalImageTitle.textContent = this._name;

        openPopup(imageModal);
      });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const img = cardElement.querySelector(".element-image");
    const titleSpan = cardElement.querySelector(".element-image-title span");

    img.src = this._link;
    img.alt = this._name;
    if (titleSpan) titleSpan.textContent = this._name;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}
