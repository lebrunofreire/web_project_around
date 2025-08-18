function enableValidation(form) {
  const submits = form.querySelectorAll(
    'button[type="submit"], input[type="submit"]'
  );

  const errorMessageElement = form.querySelector(".error-Message");

  const fieldsSelector = "input, textarea, select";
  const fields = form.querySelectorAll(fieldsSelector);

  const updateFieldClasses = (field) => {
    field.classList.toggle("valid", field.validity.valid);
    field.classList.toggle("invalid", !field.validity.valid);
  };

  const updateFieldError = (field) => {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-Message")) {
      errorElement.textContent = field.validity.valid
        ? ""
        : field.validationMessage;
    }
  };

  const updateFormState = () => {
    const isValid = form.checkValidity();
    submits.forEach((btn) => {
      btn.disabled = !isValid;
    });

    const firstInvalid = form.querySelector(`${fieldsSelector}:invalid`);
    if (errorMessageElement) {
      errorMessageElement.textContent = firstInvalid
        ? firstInvalid.validationMessage
        : "";
    }
  };

  const onInput = (e) => {
    if (e.target.matches(fieldsSelector)) {
      updateFieldClasses(e.target);
      updateFieldError(e.target);
      updateFormState();
    }
  };

  const onBlur = (e) => {
    if (e.target.matches(fieldsSelector)) {
      e.target.reportValidity();
      updateFieldError(e.target);
      updateFormState();
    }
  };

  const onSubmit = (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    }

    fields.forEach((field) => {
      updateFieldClasses(field);
      updateFieldError(field);
    });
    updateFormState();
  };

  form.addEventListener("input", onInput);
  form.addEventListener("blur", onBlur, true);
  form.addEventListener("submit", onSubmit);

  fields.forEach((field) => {
    updateFieldClasses(field);
    updateFieldError(field);
  });
  updateFormState();

  return function disableValidation() {
    form.removeEventListener("input", onInput);
    form.removeEventListener("blur", onBlur, true);
    form.removeEventListener("submit", onSubmit);
  };
}

const disableFns = Array.from(document.forms).map(enableValidation);
