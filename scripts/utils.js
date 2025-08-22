// Seleciona todos os modais visíveis
function handleEscKey(event) {
  function handleEscKey(event) {
    console.log("ESC pressionado");
    // resto do código...
  }

  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal, .image-modal");
    modals.forEach((modal) => {
      const isVisible = getComputedStyle(modal).display === "flex";
      if (isVisible) {
        closePopup(modal);
      }
    });
  }
}

export function openPopup(popup) {
  popup.style.display = "flex";
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.style.display = "none";
  document.removeEventListener("keydown", handleEscKey);
}
