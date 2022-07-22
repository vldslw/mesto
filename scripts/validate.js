//показать сообщения об ошибках
const showInputError = (formElement, inputElement, errorMessage, parameters) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(parameters.inputErrorClass);
};

//скрыть сообщения об ошибках
const hideInputError = (formElement, inputElement, parameters) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(parameters.inputErrorClass);
};

//проверить инпуты на валидность
const checkInputValidity = (formElement, inputElement, parameters) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
};

//проверить и переключить состояния кнопки
const toggleButtonState = (formElement, buttonElement, parameters) => {

  if (formElement.checkValidity()) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(parameters.inactiveButtonClass);
  };
};

//сбросить сообщения об ошибках и состояния кнопки
function resetValidation (formElement, parameters) {
  // найти кнопку сабмита
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  // вызывать toggleButtonState для кнопки сабмита
  toggleButtonState(formElement, buttonElement, parameters);
  // найти список инпутов
  const inputElements = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  // в цикле для каждого инпута вызывать hideInputError
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, parameters);
  });
};

//установить слушатели на все формы
const setFormEventListeners = (formList, formElement, parameters) => {
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);

    formList.forEach((formElement) => {
      formElement.addEventListener('input', () => {
        toggleButtonState(formElement, buttonElement, parameters);
      });
    });
};

//установить слушатели на все инпуты
const setInputEventListeners = (formElement, parameters) => {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, parameters);
    });
  });
};

//включить валидацию
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

//запустить функцию включения валидации
enableValidation(validationConfig);
