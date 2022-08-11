const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEdit = document.querySelector('.profile__edit');

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfileAbout = popupProfileForm.querySelector('.popup__input_type_about');

const pictureAddButton = document.querySelector('.profile__add');
const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureForm = popupPicture.querySelector('.popup__form');
const popupPictureTitle = popupPictureForm.querySelector('.popup__input_type_title');
const popupPictureLink = popupPictureForm.querySelector('.popup__input_type_link');

const popupLargePicture = document.querySelector('.popup_type_largepicture');

const cardTemplateSelector = '#element-template';
const elements = document.querySelector('.elements');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_error'
};

//класс создаёт карточку с текстом и ссылкой на изображение и возвращает элемент карточки
class Card {
  //конструктор принимает данные карточки и селектор её template-элемента
  constructor(data, templateSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardTemplateSelector = templateSelector;
  }

  //приватные методы, которые работают с разметкой

  _getTemplate = () => {
    const newCardTemplate = document
    .querySelector(this._cardTemplateSelector)
    .content
    .firstElementChild
    .cloneNode(true);

    return newCardTemplate;
  }

  //публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

  _generateCard = () => {
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
      this._openLargePicturePopup();
    });
  }

  //приватные методы для каждого обработчика

  _likePicture() {
    this._cardElement.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deletePicture() {
    this._cardElement.querySelector('.element__delete-button').closest('.element').remove();
  }

  _openLargePicturePopup() {
    popupLargePicture.querySelector('.popup__title_largepicture').textContent = this._text;
    popupLargePicture.querySelector('.popup__photo').src = this._link;
    popupLargePicture.querySelector('.popup__photo').alt = this._text;
    openPopup(popupLargePicture);
  }

}

// добавить карточку
const addCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  const cardElement = card._generateCard();
  elements.prepend(cardElement);
};

// добавить набор первоначальных карточек
const addInitialCards = () => {
  initialCards.forEach((card) => {
    addCard(card, cardTemplateSelector);
  });
};

// запустить функцию добавления первоначальных карточек
addInitialCards();


// добавить новую фотографию
function submitPictureForm (evt) {
  evt.preventDefault();
  const newCard = {
  };
  newCard.name = popupPictureTitle.value;
  newCard.link = popupPictureLink.value;
  addCard(newCard, cardTemplateSelector);
  closePopup(popupPicture);
}


// открыть попап для добавления фотографии
function openPicturePopup () {
  openPopup(popupPicture);
  popupPictureForm.reset();
  resetValidation(popupPictureForm, validationConfig);
}

// открыть любой попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// закрыть любой попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// закрыть попап с помощью клавиши Esc
function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

// открыть и заполнить попап данными профиля
function openProfilePopup () {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
  resetValidation(popupProfileForm, validationConfig);
}

// отправить данные профиля
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;
  closePopup(popupProfile);
}

function setPopupEventListeners () {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
    });

  });
}

setPopupEventListeners();
popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupPictureForm.addEventListener('submit', submitPictureForm);
pictureAddButton.addEventListener('click', openPicturePopup);
