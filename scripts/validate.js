function enableValidation(form) {
  const submits = form.querySelectorAll(
    'button[type="submit"], input[type="submit"]'
  );

  // Mantida conforme solicitado
  const errorMessageElement = form.querySelector(".error-Message");

  const fieldsSelector = "input, textarea, select";
  const fields = form.querySelectorAll(fieldsSelector);

  const updateFieldClasses = (field) => {
    field.classList.toggle("valid", field.validity.valid);
    field.classList.toggle("invalid", !field.validity.valid);
  };

  const updateFieldError = (field) => {
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-Message")) {
      errorEl.textContent = field.validity.valid ? "" : field.validationMessage;
    }
  };

  const updateFormState = () => {
    const isValid = form.checkValidity();
    submits.forEach((btn) => {
      btn.disabled = !isValid;
    });

    // Essa linha mantém a compatibilidade se você usar um erro "geral" no form
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
    // Atualiza todos os campos no submit
    fields.forEach((field) => {
      updateFieldClasses(field);
      updateFieldError(field);
    });
    updateFormState();
  };

  form.addEventListener("input", onInput);
  form.addEventListener("blur", onBlur, true);
  form.addEventListener("submit", onSubmit);

  // Estado inicial
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

// Ativar para todos os formulários
const disableFns = Array.from(document.forms).map(enableValidation);
