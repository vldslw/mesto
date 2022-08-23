export default class Popup {
  constructor (selector) {
    this._popup = document.querySelector(selector);
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose (evt)  {
    if (evt.key === 'Escape') {
    this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}
