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

function criarCard(titulo, imagemURL) {
  const card = document.createElement("div");
  card.classList.add("element");

  const img = document.createElement("img");
  img.classList.add("element-image");
  img.src = imagemURL;
  img.alt = titulo;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("element-delete-btn");
  deleteBtn.addEventListener("click", () => card.remove());

  const titleP = document.createElement("p");
  titleP.classList.add("element-image-title");
  titleP.textContent = titulo;

  const likeBtn = document.createElement("button");
  likeBtn.classList.add("element-image-like");

  titleP.appendChild(likeBtn);
  card.appendChild(img);
  card.appendChild(deleteBtn);
  card.appendChild(titleP);

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const elementsContainer = document.querySelector(".elements");

  initialCards.forEach((c) =>
    elementsContainer.appendChild(criarCard(c.name, c.link))
  );

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

  const isOpen = (m) => m && window.getComputedStyle(m).display !== "none";
  const modalsList = () => [modal, imageModal, placeModal];

  function handleEscKey(event) {
    if (event.key !== "Escape") return;
    modalsList().forEach((m) => {
      if (isOpen(m)) closePopup(m);
    });
  }

  function ensureEscListener() {
    document.addEventListener("keydown", handleEscKey);
  }

  function maybeRemoveEscListener() {
    const algumAberto = modalsList().some(isOpen);
    if (!algumAberto) {
      document.removeEventListener("keydown", handleEscKey);
    }
  }

  function openPopup(popup) {
    if (!popup) return;
    popup.style.display = "flex";
    ensureEscListener();
  }

  function closePopup(popup) {
    if (!popup) return;
    popup.style.display = "none";
    maybeRemoveEscListener();
  }

  openModalBtn.addEventListener("click", () => openPopup(modal));
  closeModalBtn.addEventListener("click", () => closePopup(modal));

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = document.getElementById("nameInput").value;
    profileTitle.textContent = document.getElementById("titleInput").value;
    closePopup(modal);
  });

  openPlaceModalBtn.addEventListener("click", () => openPopup(placeModal));

  closePlaceModalBtn.addEventListener("click", () => {
    closePopup(placeModal);
    titleInput.value = "";
    imageUrlInput.value = "";
  });

  savePlaceBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!titleInput.value.trim() || !imageUrlInput.value.trim()) {
      return alert("Por favor, preencha todos os campos.");
    }
    elementsContainer.prepend(
      criarCard(titleInput.value.trim(), imageUrlInput.value.trim())
    );
    closePopup(placeModal);
    titleInput.value = "";
    imageUrlInput.value = "";
  });

  elementsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("element-image-like")) {
      event.target.classList.toggle("liked");
    }
  });

  elementsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("element-image")) {
      modalImage.src = e.target.src;
      modalImage.alt = e.target.alt;
      modalImageTitle.textContent = e.target.alt;
      openPopup(imageModal);
    }
  });

  closeImageModal.addEventListener("click", () => closePopup(imageModal));

  modalsList().forEach((m) => {
    if (!m) return;
    m.addEventListener("click", (e) => {
      if (e.target === m) closePopup(m);
    });
  });
});
