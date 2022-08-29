import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor (name, link, selector) {
    super(selector);
    this._name = name;
    this._link = link;
    this._popupImage = this._popup.querySelector('.popup__photo');
    this._popupTitle = this._popup.querySelector('.popup__title_largepicture');

  }

  open () {
    this._popupImage.src = this._link;
    this._popupTitle.textContent = this._name;
    this._popupImage.alt = this._name;
    super.open();
  }

}
