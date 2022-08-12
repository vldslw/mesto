export class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  constructor(validationConfig, formElement) {
    this.formSelector = validationConfig.formSelector;
    this.inputSelector = validationConfig.inputSelector;
    this.submitButtonSelector = validationConfig.submitButtonSelector;
    this.inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.inputErrorClass = validationConfig.inputErrorClass;
    this.formElement = formElement;
  }

  //приватные методы, которые обрабатывают форму:
  // проверяют валидность поля, изменяют состояние кнопки сабмита
  _showInputError (inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this.inputErrorClass);
  }


  _hideInputError (inputElement) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this.inputErrorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState () {
    if (this.formElement.checkValidity()) {
      this.formElement.querySelector(this.submitButtonSelector).removeAttribute('disabled');
      this.formElement.querySelector(this.submitButtonSelector).classList.remove(this.inactiveButtonClass);
    } else {
      this.formElement.querySelector(this.submitButtonSelector).setAttribute('disabled', true);
      this.formElement.querySelector(this.submitButtonSelector).classList.add(this.inactiveButtonClass);
    };
  }

  //устанавливают все обработчики;

  _setInputEventListeners() {
    Array.from(this.formElement.querySelectorAll(this.inputSelector)).forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  _setFormEventListeners() {
    this.formElement.addEventListener('input', () => {
      this._toggleButtonState();
    });
  }

  //публичный метод enableValidation, который включает валидацию формы

  enableValidation = () => {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setInputEventListeners();
    this._setFormEventListeners();
  }

  //публичный метод resetValidation, который очищает ошибки и состояние кнопки при открытии папапа
  resetValidation() {
    this._toggleButtonState();
    Array.from(this.formElement.querySelectorAll(this.inputSelector)).forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}
