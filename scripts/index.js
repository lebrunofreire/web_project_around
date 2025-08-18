// ---------- Dados iniciais ----------
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

// ---------- Função para criar cards ----------
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

// ---------- Lógica principal ----------
document.addEventListener("DOMContentLoaded", () => {
  const elementsContainer = document.querySelector(".elements");

  // Renderizar cards iniciais
  initialCards.forEach((c) =>
    elementsContainer.appendChild(criarCard(c.name, c.link))
  );

  // Modal de perfil
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const profileName = document.getElementById("profileName");
  const profileTitle = document.getElementById("profileTitle");
  const profileForm = document.getElementById("profileForm");

  openModalBtn.addEventListener("click", () => (modal.style.display = "flex"));
  closeModalBtn.addEventListener("click", () => (modal.style.display = "none"));

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = document.getElementById("nameInput").value;
    profileTitle.textContent = document.getElementById("titleInput").value;
    modal.style.display = "none";
  });

  // Modal de novo lugar
  const placeModal = document.getElementById("placeModal");
  const openPlaceModalBtn = document.getElementById("openPlaceModalBtn");
  const closePlaceModalBtn = document.getElementById("closePlaceModalBtn");
  const savePlaceBtn = document.getElementById("savePlaceBtn");
  const titleInput = document.getElementById("placeTitleInput");
  const imageUrlInput = document.getElementById("placeImageUrl");

  openPlaceModalBtn.addEventListener(
    "click",
    () => (placeModal.style.display = "flex")
  );

  closePlaceModalBtn.addEventListener("click", () => {
    placeModal.style.display = "none";
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
    placeModal.style.display = "none";
    titleInput.value = "";
    imageUrlInput.value = "";
  });

  // Like nos cards (delegação de evento)
  elementsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("element-image-like")) {
      event.target.classList.toggle("liked");
    }
  });

  // Modal de imagem
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalImageTitle = document.getElementById("modalImageTitle");
  const closeImageModal = document.getElementById("closeImageModal");

  elementsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("element-image")) {
      modalImage.src = e.target.src;
      modalImage.alt = e.target.alt;
      modalImageTitle.textContent = e.target.alt;
      imageModal.style.display = "flex";
    }
  });

  closeImageModal.addEventListener(
    "click",
    () => (imageModal.style.display = "none")
  );

  // Fechar modais clicando fora
  [modal, imageModal, placeModal].forEach((m) => {
    if (m) {
      m.addEventListener("click", (e) => {
        if (e.target === m) m.style.display = "none";
      });
    }
  });

  // Fechar modais com ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      [modal, imageModal, placeModal].forEach((m) => {
        if (m && window.getComputedStyle(m).display !== "none") {
          m.style.display = "none";
        }
      });
    }
  });
});
