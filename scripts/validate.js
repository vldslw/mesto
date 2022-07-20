const showInputError = (formElement, inputElement, errorMessage) => {
  console.log(formElement);
  console.log(inputElement);
  console.log(errorMessage);
  console.log(inputElement.id);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__input_error');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove('popup__input_error');
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// сбросить сообщения об ошибках в форме
function resetErrors (form) {
  const errorElements = Array.from(form.querySelectorAll('.error'));
  const inputElements = Array.from(form.querySelectorAll('.popup__input'));

  errorElements.forEach((errorElement) => {
    errorElement.textContent = '';
  });

  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_error');
  });

};

const toggleButtonState = (formElement, buttonElement) => {

  if (formElement.checkValidity()) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.add('popup__submit-button_valid');
    buttonElement.classList.remove('popup__submit-button_invalid');
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.remove('popup__submit-button_valid');
    buttonElement.classList.add('popup__submit-button_invalid');
  };
};

const setInputEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const setFormEventListeners = (formList, formElement) => {
  const buttonElement = formElement.querySelector('.popup__submit-button');

    formList.forEach((formElement) => {
      formElement.addEventListener('input', () => {
        toggleButtonState(formElement, buttonElement);
      });
    });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputEventListeners(formElement);
    setFormEventListeners(formList, formElement);
  });
};

enableValidation();


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_invalid',
//   inputErrorClass: 'popup__input_error',
//   // errorClass: 'popup__error_visible'
// });
