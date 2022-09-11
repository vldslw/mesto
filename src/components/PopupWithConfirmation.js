import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor (selector, {confirmationHandler}) {
    super(selector);
    this._submitButton = this._popup.querySelector('.popup__submit-button_type_delete');
    this._confirmationHandler = confirmationHandler;
  }

  open (id, button) {
    super.open();
    this._cardId = id;
    this._deleteButton = button;
  }

  setEventListeners () {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._confirmationHandler(this._cardId, this._deleteButton);
    });
  }

}
