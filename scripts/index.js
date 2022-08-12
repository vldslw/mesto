// список названий и ссылок для первоначальных карточек
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

const cardTemplateSelector = '#element-template';
const elements = document.querySelector('.elements');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_error'
};

Array.from(document.querySelectorAll(validationConfig.formSelector)).forEach((formElement) => {
    const newFormValidator = new FormValidator(validationConfig, formElement);
    newFormValidator.enableValidation();
});

// функция добавления карточки
const addCard = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
};

// функция добавления набора первоначальных карточек
const addInitialCards = () => {
  initialCards.forEach((card) => {
    addCard(card, cardTemplateSelector);
  });
};

addInitialCards();


// функция отправки новой фотографии
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
  const popupPictureFormValidator = new FormValidator(validationConfig, popupPictureForm);
  popupPictureFormValidator.resetValidation();
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
  const popupProfileFormValidator = new FormValidator(validationConfig, popupProfileForm);
  popupProfileFormValidator.resetValidation();
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
