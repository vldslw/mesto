export default class Card {
  //конструктор принимает данные карточки и селектор её template-элемента
  constructor(data, templateSelector, handleCardClick, deletePopopSelector, userId, {pictureLikeHandler, pictureDeleteLikeHandler}, handleCardDeleteClick) {
    this._data = data;
    this._text = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._likesNumber = this._likes.length;
    this._cardTemplateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deletePopupButton = document.querySelector(deletePopopSelector).querySelector('.popup__submit-button_type_delete');
    this._userId = userId;
    this._pictureLikeHandler = pictureLikeHandler;
    this._pictureDeleteLikeHandler = pictureDeleteLikeHandler;
    this._handleCardDeleteClick = handleCardDeleteClick;
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

    if (this._userId === this._cardOwnerId) {
      this._deleteButton.classList.add('element__delete-button_active');
    }

    if (this._likes.some(el => el._id === this._userId)) {
      this._likeButton.classList.add('element__like_active');
    }


    return this._cardElement;
  }

  //приватные методы, которые устанавливают слушателей событий
  _setCardEventListeners = () => {
    this._likeButton.addEventListener ('click', () => {
      this._likePicture();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDeleteClick(this._cardId, this._deleteButton);
    }
    );

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  _likePicture() {
    if (this._likeButton.classList.contains('element__like_active')) {
      this._pictureDeleteLikeHandler(this._cardId, this._cardElement);
      this._likeButton.classList.toggle('element__like_active');
    } else {
      this._likeButton.classList.toggle('element__like_active');
      this._pictureLikeHandler(this._cardId, this._cardElement);
    }
  }

}
