export default class Popup {
  constructor (selector) {
    this.popup = document.querySelector(selector);
  }

  open (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  close () {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      close(popupOpened);
    }
  }

  setEventListeners (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        close(popup)
      }
    });
  }

}
