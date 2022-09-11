import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor (selector, {submitForm, formValidators}) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputTitle = this._popupForm.querySelector('.popup__input_type_title');
    this._popupInputLink = this._popupForm.querySelector('.popup__input_type_link');
    this._popupInputName = this._popupForm.querySelector('.popup__input_type_name');
    this._popupInputAbout = this._popupForm.querySelector('.popup__input_type_about');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitForm = submitForm;
    this._formValidators = formValidators;
  }

  _getInputValues () {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._submitForm(evt, this._getInputValues())
    });
  }

  close () {
    super.close();
    this._popupForm.reset();
    this._formValidators[this._popupForm.getAttribute('name')].resetValidation();
  }

  renderLoading (isLoading, defaultText) {
    this._defaultText = defaultText;
    if (isLoading) {
      this._popup.querySelector('.popup__submit-button').textContent = 'Сохранение...';
    } else {
      this._popup.querySelector('.popup__submit-button').textContent = this._defaultText;
    }
  }

}
