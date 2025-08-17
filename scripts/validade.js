const title = document.querySelector("title");
const input = document.querySelector("input");
const button = document.querySelector("button");
const forms = document.forms;

Array.from(document.forms).forEach((form) => {
  const fields = form.querySelectorAll("input, textarea, select");
  const submits = form.querySelectorAll(
    'button[type="submit"], input[type="submit"]'
  );
  const errorMessageEl = form.querySelector("#errorMessage");
  const updateFieldClasses = (field) => {
    if (field.validity.valid) {
      field.classList.add("valid");
      field.classList.remove("invalid");
    } else {
      field.classList.add("invalid");
      field.classList.remove("valid");
    }
  };

  const updateSubmitState = () => {
    const isValid = form.checkValidity();
    submits.forEach((btn) => {
      btn.disabled = !isValid;
    });
  };

  const updateErrorMessage = () => {
    const firstInvalid = Array.from(fields).find((f) => !f.validity.valid);
    if (firstInvalid) {
      errorMessageEl.textContent = firstInvalid.validationMessage;
    } else {
      errorMessageEl.textContent = "";
    }
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      updateFieldClasses(field);
      updateSubmitState();
      updateErrorMessage();
    });

    field.addEventListener("blur", () => {
      field.reportValidity();
      updateSubmitState();
      updateErrorMessage();
    });
  });

  fields.forEach(updateFieldClasses);
  updateSubmitState();
  updateErrorMessage();

  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      updateErrorMessage();
    }
  });
});
