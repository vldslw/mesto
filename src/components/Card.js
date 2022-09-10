import deleteCard from '../pages/index.js';

export default class Card {
  //конструктор принимает данные карточки и селектор её template-элемента
  constructor(data, templateSelector, handleCardClick, deletePopup, deletePopopSelector, userId) {
    this._text = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likesNumber = data.likes.length;
    this._cardTemplateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deletePopup = deletePopup;
    this._deletePopupButton = document.querySelector(deletePopopSelector).querySelector('.popup__submit-button_type_delete');
    this._userId = userId;
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

    console.log(this._userId);
    console.log(this._cardOwnerId);
    if (this._userId != this._cardOwnerId) {
      console.log('Карточка не моя');
      this._deleteButton.classList.add('element__delete-button_inactive');
    }

    return this._cardElement;
  }

  //приватные методы, которые устанавливают слушателей событий
  _setCardEventListeners = () => {
    this._likeButton.addEventListener ('click', () => {
      this._likePicture();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deletePopupOpen();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  //приватные методы для каждого обработчика
  _likePicture() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _deletePopupOpen () {
    this._deletePopup.open(this._cardId, this._deleteButton);
    // this._deletePopupButton.addEventListener('click', this._deletePicture);
    // this._deletePopup.setDeleteListener(this._cardId);
  }

  // _deletePicture = async () => {
  //   try {
  //     console.log(this._cardId);
  //     await deleteCard(this._cardId);
  //     this._deleteButton.closest('.element').remove();
  //     this._deletePopup.close();
  //     this._deletePopupButton.removeEventListener('click', this._deletePicture);
  //   } catch {
  //     console.log('Не удалось удалить карточку');
  //   }
  // }

}
