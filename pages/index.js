import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

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

// ---------- Instâncias principais ----------
const userInfo = new UserInfo({
  nameSelector: "#profileName",
  jobSelector: "#profileTitle",
});

const popupWithImage = new PopupWithImage("#imageModal");
popupWithImage.setEventListeners();

function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) =>
    popupWithImage.open(name, link)
  );
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderItems();

const popupEditProfile = new PopupWithForm("#modal", (formData) => {
  userInfo.setUserInfo({
    name: formData.nameInput,
    job: formData.titleInput,
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm("#placeModal", (formData) => {
  const newCard = createCard({
    name: formData.placeTitleInput,
    link: formData.placeImageUrl,
  });
  cardSection.addItem(newCard);
  popupAddPlace.close();
});
popupAddPlace.setEventListeners();

// ---------- Botões ----------
document.getElementById("openModalBtn").addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.getElementById("nameInput").value = currentUser.name;
  document.getElementById("titleInput").value = currentUser.job;
  popupEditProfile.open();
});

document.getElementById("openPlaceModalBtn").addEventListener("click", () => {
  popupAddPlace.open();
});

// ---------- Validação ----------
const config = {
  inputSelector: "input",
  submitButtonSelector: ".modal-save-button",
  inputErrorClass: "input-error",
};

const profileValidator = new FormValidator(
  config,
  document.getElementById("profileForm")
);
const placeValidator = new FormValidator(
  config,
  document.getElementById("placeForm")
);

profileValidator.enableValidation();
placeValidator.enableValidation();
