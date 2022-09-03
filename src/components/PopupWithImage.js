import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor (selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__photo');
    this._popupTitle = this._popup.querySelector('.popup__title_largepicture');

  }

  open (name, link) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }

}
