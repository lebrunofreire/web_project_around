export class Card {
  constructor({ _id, name, link }, templateSelector,
              handleCardClick, handleDeleteClick) {
    this._id = _id;                       // ID do card na API
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }


  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Botão de delete agora chama o callback, não remove direto
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    // Like continua local (pode evoluir para API)
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("liked");
    });

    // Abre modal de imagem
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
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

