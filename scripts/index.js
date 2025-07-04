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
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const form = document.getElementById("profileForm", "placeForm");
const profileName = document.getElementById("profileName");
const profileTitle = document.getElementById("profileTitle");

document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openPlaceModalBtn");
  const closeModalBtn = document.getElementById("closePlaceModalBtn");
  const placeModal = document.getElementById("placeModal");
  const savePlaceBtn = document.getElementById("savePlaceBtn");
  const titleInput = document.getElementById("placeTitleInput");
  const imageUrlInput = document.getElementById("placeImageUrl");
  const elementsContainer = document.querySelector(".elements");

  openModalBtn.addEventListener("click", () => {
    placeModal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    placeModal.style.display = "none";
    titleInput.value = "";
    imageUrlInput.value = "";
  });

  savePlaceBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const imageUrl = imageUrlInput.value;

    if (!title || !imageUrl) {
      return alert("Por favor, preencha todos os campos.");
    }

    const newCard = document.createElement("div");
    newCard.classList.add("element");

    newCard.innerHTML = `
          <img class="element-image" src="${imageUrl}" alt="${title}" />
          <button class="element-delete-btn"></button>
          <p class="element-image-title">
            ${title}
            <button class="element-image-like"></button>
          </p>
      `;

    // Adiciona evento de remover
    newCard
      .querySelector(".element-delete-btn")
      .addEventListener("click", (e) => {
        e.target.closest(".element").remove();
      });

    elementsContainer.prepend(newCard); // ou appendChild para adicionar no final

    // Fecha o modal e limpa os campos
    placeModal.style.display = "none";
    titleInput.value = "";
    imageUrlInput.value = "";
  });
});

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value;
  const title = document.getElementById("titleInput").value;

  profileName.textContent = name;
  profileTitle.textContent = title;

  modal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".element-delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".element");
      console.log("Removendo:", card);
      if (card) {
        card.remove();
      }
    });
  });
});

document.querySelector(".elements").addEventListener("click", (event) => {
  if (event.target.classList.contains("element-image-like")) {
    event.target.classList.toggle("liked");
  }
});

const elementImage = document.querySelector(".element-image");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup-close");

elementImage.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Opcional: fechar ao clicar fora da área de conteúdo
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});
