// scripts/index.js
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { openPopup, closePopup } from "../scripts/utils.js";

// Dados iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Care...",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Seletores principais
const elementsContainer = document.querySelector(".elements");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const profileName = document.getElementById("profileName");
const profileTitle = document.getElementById("profileTitle");
const profileForm = document.getElementById("profileForm");

const placeModal = document.getElementById("placeModal");
const openPlaceModalBtn = document.getElementById("openPlaceModalBtn");
const closePlaceModalBtn = document.getElementById("closePlaceModalBtn");
const savePlaceBtn = document.getElementById("savePlaceBtn");
const titleInput = document.getElementById("placeTitleInput");
const imageUrlInput = document.getElementById("placeImageUrl");

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalImageTitle = document.getElementById("modalImageTitle");
const closeImageModal = document.getElementById("closeImageModal");

// Função para abrir imagem em modal
function handleImageClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalImageTitle.textContent = name;
  openPopup(imageModal);
}

// Função para criar card
function criarCard(name, link) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  return card.generateCard();
}

// Renderizar cards iniciais
initialCards.forEach((data) => {
  const cardElement = criarCard(data.name, data.link);
  elementsContainer.appendChild(cardElement);
});

// Eventos de modais
openModalBtn.addEventListener("click", () => openPopup(modal));
closeModalBtn.addEventListener("click", () => closePopup(modal));

openPlaceModalBtn.addEventListener("click", () => openPopup(placeModal));
closePlaceModalBtn.addEventListener("click", () => {
  closePopup(placeModal);
  titleInput.value = "";
  imageUrlInput.value = "";
});

closeImageModal.addEventListener("click", () => closePopup(imageModal));

// Submissão do formulário de perfil
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = document.getElementById("nameInput").value;
  profileTitle.textContent = document.getElementById("titleInput").value;
  closePopup(modal);
});

// Submissão do formulário de novo local
savePlaceBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!titleInput.value.trim() || !imageUrlInput.value.trim()) {
    return alert("Por favor, preencha todos os campos.");
  }
  const newCard = criarCard(
    titleInput.value.trim(),
    imageUrlInput.value.trim()
  );
  elementsContainer.prepend(newCard);
  closePopup(placeModal);
  titleInput.value = "";
  imageUrlInput.value = "";
});

// Validação de formulários
const config = {
  inputSelector: "input",
  submitButtonSelector: ".modal-save-button",
  inputErrorClass: "input-error",
};

const profileValidator = new FormValidator(config, profileForm);
const placeValidator = new FormValidator(
  config,
  document.getElementById("placeForm")
);

profileValidator.enableValidation();
placeValidator.enableValidation();

// Fechar modal de imagem ao clicar fora
imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closePopup(imageModal);
  }
});

[modal, placeModal].forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});
