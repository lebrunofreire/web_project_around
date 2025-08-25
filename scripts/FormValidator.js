export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _updateFieldClasses(inputElement) {
    inputElement.classList.toggle("valid", inputElement.validity.valid);
    inputElement.classList.toggle("invalid", !inputElement.validity.valid);
  }

  _updateFieldError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-Message")) {
      errorElement.textContent = inputElement.validity.valid
        ? ""
        : inputElement.validationMessage;
    }
  }

  _updateFormState() {
    const isValid = this._formElement.checkValidity();
    this._submitButton.disabled = !isValid;
  }

  _handleInput = (evt) => {
    const inputElement = evt.target;
    this._updateFieldClasses(inputElement);
    this._updateFieldError(inputElement);
    this._updateFormState();
  };

  _handleBlur = (evt) => {
    const inputElement = evt.target;
    inputElement.reportValidity();
    this._updateFieldError(inputElement);
    this._updateFormState();
  };

  _handleSubmit = (evt) => {
    if (!this._formElement.checkValidity()) {
      evt.preventDefault();
      this._formElement.reportValidity();
    }
    this._inputList.forEach((input) => {
      this._updateFieldClasses(input);
      this._updateFieldError(input);
    });
    this._updateFormState();
  };

  enableValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", this._handleInput);
      input.addEventListener("blur", this._handleBlur);
    });
    this._formElement.addEventListener("submit", this._handleSubmit);

    // Estado inicial
    this._inputList.forEach((input) => {
      this._updateFieldClasses(input);
      this._updateFieldError(input);
    });
    this._updateFormState();
  }

  disableValidation() {
    this._inputList.forEach((input) => {
      input.removeEventListener("input", this._handleInput);
      input.removeEventListener("blur", this._handleBlur);
    });
    this._formElement.removeEventListener("submit", this._handleSubmit);
  }
}
