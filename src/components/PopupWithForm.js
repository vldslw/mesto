import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor (selector, {submitForm, formValidators}) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputTitle = this._popupForm.querySelector('.popup__input_type_title');
    this._popupInputLink = this._popupForm.querySelector('.popup__input_type_link');
    this._popupInputName = this._popupForm.querySelector('.popup__input_type_name');
    this._popupInputAbout = this._popupForm.querySelector('.popup__input_type_about');
    this._submitForm = submitForm;
    this._formValidators = formValidators;
  }

  _getInputValues () {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');

    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitForm);
  }

  close () {
    super.close();
    this._popupForm.reset();
    this._formValidators[this._popupForm.getAttribute('name')].resetValidation();
    this._popupForm.removeEventListener('submit', this._submitForm);
  }

}
