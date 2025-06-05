const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const form = document.getElementById("profileForm");

// Campos da página
const profileName = document.getElementById("profileName");
const profileTitle = document.getElementById("profileTitle");

// Abrir modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Fechar modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Salvar alterações
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value;
  const title = document.getElementById("titleInput").value;

  profileName.textContent = name;
  profileTitle.textContent = title;

  modal.style.display = "none";
});
