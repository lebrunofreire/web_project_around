export function openPopup(popup) {
  popup.style.display = "flex";
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.style.display = "none";
  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal, .image-modal");
    modals.forEach((modal) => {
      if (window.getComputedStyle(modal).display !== "none") {
        closePopup(modal);
      }
    });
  }
}
