import Api from "../scripts/API.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

// 1. Instância da API
const api = new Api({
  baseUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
  headers: {
    authorization: "ddeac610-fcfa-44e9-a507-b3527c169943",
    "Content-Type": "application/json"
  }
});

// 2. Instância do gerenciador de informações do usuário
const userInfo = new UserInfo({
  nameSelector: "#profileName",
  jobSelector: "#profileTitle",
  avatarSelector: ".author-image"
});

// 3. Popup de imagem
const popupWithImage = new PopupWithImage("#imageModal");
popupWithImage.setEventListeners();

// Função para criar card
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) =>
    popupWithImage.open(name, link)
  );
  return card.generateCard();
}

// 4. Seção de cards
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

// 5. Carregar dados iniciais da API
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    userInfo.setAvatar(userData.avatar);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("Erro ao carregar dados iniciais:", err));

// 6. Popup de editar avatar
const popupEditAvatar = new PopupWithForm("#avatarModal", (formData) => {
  api.updateAvatar(formData.avatarUrlInput)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => console.error("Erro ao atualizar avatar:", err));
});
popupEditAvatar.setEventListeners();

document
  .querySelector(".author-avatar-edit-button")
  .addEventListener("click", () => {
    popupEditAvatar.open();
  });

// 7. Popup de editar perfil
const popupEditProfile = new PopupWithForm("#modal", (formData) => {
  api.updateProfile({
    name: formData.nameInput,
    about: formData.titleInput
  })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
      popupEditProfile.close();
    })
    .catch((err) => console.error("Erro ao atualizar perfil:", err));
});
popupEditProfile.setEventListeners();

document.getElementById("openModalBtn").addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.getElementById("nameInput").value = currentUser.name;
  document.getElementById("titleInput").value = currentUser.job;
  popupEditProfile.open();
});

// 8. Popup de adicionar novo local
const popupAddPlace = new PopupWithForm("#placeModal", (formData) => {
  api.addCard({
    name: formData.placeTitleInput,
    link: formData.placeImageUrl
  })
    .then((card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);
      popupAddPlace.close();
    })
    .catch((err) => console.error("Erro ao adicionar card:", err));
});
popupAddPlace.setEventListeners();

document.getElementById("openPlaceModalBtn").addEventListener("click", () => {
  popupAddPlace.open();
});

// 9. Validação de formulários
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
