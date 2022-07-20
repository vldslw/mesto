const showInputError = (formElement, inputElement, errorMessage, parameters) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(parameters.inputErrorClass);
};

const hideInputError = (formElement, inputElement, parameters) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(parameters.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, parameters) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
};

const toggleButtonState = (formElement, buttonElement, parameters) => {

  if (formElement.checkValidity()) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.add(parameters.activeButtonClass);
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.remove(parameters.activeButtonClass);
    buttonElement.classList.add(parameters.inactiveButtonClass);
  };
};

function resetErrors (formElement) {
  const buttonElement = formElement.querySelector('.popup__submit-button');
  const parameters = {
    activeButtonClass: 'popup__submit-button_valid',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__input_error'
  };
  const errorElements = Array.from(formElement.querySelectorAll('.error'));
  const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));

  toggleButtonState(formElement, buttonElement, parameters);

  errorElements.forEach((errorElement) => {
    errorElement.textContent = '';
  });

  inputElements.forEach((inputElement) => {
    inputElement.classList.remove(parameters.inputErrorClass);
  });

};

const setFormEventListeners = (formList, formElement, parameters) => {
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);

    formList.forEach((formElement) => {
      formElement.addEventListener('input', () => {
        toggleButtonState(formElement, buttonElement, parameters);
      });
    });
};

const setInputEventListeners = (formElement, parameters) => {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, parameters);
    });
  });
};

const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputEventListeners(formElement, parameters);
    setFormEventListeners(formList, formElement, parameters);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  activeButtonClass: 'popup__submit-button_valid',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_error'
});
