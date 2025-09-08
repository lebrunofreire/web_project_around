export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("liked");
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element-image");
    this._cardTitle = this._element.querySelector(".element-image-title span");
    this._likeButton = this._element.querySelector(".element-image-like");
    this._deleteButton = this._element.querySelector(".element-delete-btn");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this._cardTitle) this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
