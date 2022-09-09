export default class Card {
  //конструктор принимает данные карточки и селектор её template-элемента
  constructor(data, templateSelector, handleCardClick, deletePopup) {
    this._text = data.name;
    this._link = data.link;
    this._likesNumber = data.likes.length;
    this._cardTemplateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deletePopup = deletePopup;
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
    this._cardImage = this._cardElement.querySelector('.element__photo');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._likeCount = this._cardElement.querySelector('.element__like-count');

    this._setCardEventListeners();
    this._cardTitle.textContent = this._text;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._link;
    this._likeCount.textContent = this._likesNumber;

    return this._cardElement;
  }

  //приватные методы, которые устанавливают слушателей событий
  _setCardEventListeners = () => {
    this._likeButton.addEventListener ('click', () => {
      this._likePicture();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deletePicture();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  //приватные методы для каждого обработчика
  _likePicture() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deletePicture() {
    this._deletePopup.open();
    // this._deleteButton.closest('.element').remove();
  }

}
