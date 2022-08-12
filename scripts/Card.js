export class Card {
  //конструктор принимает данные карточки и селектор её template-элемента
  constructor(data, templateSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardTemplateSelector = templateSelector;
  }

  //приватный метод, который работает с разметкой
  _getTemplate = () => {
    const newCardTemplate = document
    .querySelector(this._cardTemplateSelector)
    .content
    .firstElementChild
    .cloneNode(true);

    return newCardTemplate;
  }

  //публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._setCardEventListeners();
    this._cardElement.querySelector('.element__title').textContent = this._text;
    this._cardElement.querySelector('.element__photo').alt = this._text;
    this._cardElement.querySelector('.element__photo').src = this._link;

    return this._cardElement;
  }

  //приватные методы, которые устанавливают слушателей событий
  _setCardEventListeners = () => {
    this._cardElement.querySelector('.element__like').addEventListener ('click', () => {
      this._likePicture();
    });

    this._cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deletePicture();
    });

    this._cardElement.querySelector('.element__photo').addEventListener('click', () => {
      this._openLargePicture();
    });
  }

  //приватные методы для каждого обработчика

  _likePicture() {
    this._cardElement.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deletePicture() {
    this._cardElement.querySelector('.element__delete-button').closest('.element').remove();
  }

  _openLargePicture() {
    const largePicture = document.querySelector('.popup_type_largepicture');

    largePicture.querySelector('.popup__title_largepicture').textContent = this._text;
    largePicture.querySelector('.popup__photo').src = this._link;
    largePicture.querySelector('.popup__photo').alt = this._text;
    largePicture.classList.add('popup_opened');
    document.addEventListener('keydown', _closeLargePictureEsc)

    function _closeLargePictureEsc(evt) {
      if (evt.key === 'Escape') {
      largePicture.classList.remove('popup_opened');
      document.removeEventListener('keydown', _closeLargePictureEsc);
      }
    }

  }

}
