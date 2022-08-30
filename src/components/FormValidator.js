export default class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  //приватные методы, которые обрабатывают форму:
  // проверяют валидность поля, изменяют состояние кнопки сабмита
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState () {
    if (this._formElement.checkValidity()) {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    };
  }

  //устанавливают все обработчики;
  _setInputEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  _setFormEventListeners() {
    this._formElement.addEventListener('input', () => {
      this._toggleButtonState();
    });
  }

  //публичный метод enableValidation, который включает валидацию формы
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState();
    this._setInputEventListeners();
    this._setFormEventListeners();
  }

  //публичный метод resetValidation, который очищает ошибки и состояние кнопки при открытии попапа
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}
