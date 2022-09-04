import '../pages/index.css';
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section  from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  profileName,
  profileAbout,
  profileEdit,
  popupProfile,
  pictureAddButton,
  popupPicture,
  largePictureSelector,
  cardTemplateSelector,
  cardListSection,
  validationConfig,
  formValidators
} from '../utils/constants.js';

// функция включения валидации
const turnOnValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

turnOnValidation(validationConfig);

function createCard(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
    }
  },
    cardListSection
);

cardsList.renderItems();

// создать попап для большой картинки
const popup = new PopupWithImage(largePictureSelector);
// навесить на него слушатели
popup.setEventListeners();

// открыть большую картинку
function handleCardClick(name, link) {
  popup.open(name, link);
}

// создать попап для добавления фотографии
const picturePopup = new PopupWithForm(popupPicture, {
  submitForm: (evt) => {
    evt.preventDefault();
    cardsList.addItem(createCard(picturePopup.getInputValues()));
    picturePopup.close();
  },
  formValidators: formValidators
});
// навесить на него слушатели
picturePopup.setEventListeners();

// открыть попап для добавления фотографии
function addPicturePopup () {
  picturePopup.open();
}

// создать класс управления информацией о пользователе
const profileInfo = new UserInfo ({
  profileNameSelector: profileName,
  profileAboutSelector: profileAbout
});

// создать попап для редактирования профиля
const profilePopup = new PopupWithForm(popupProfile, {
  submitForm: (evt) => {
    evt.preventDefault();
    const profileInputValues = profilePopup.getInputValues();
    profileInfo.setUserInfo(profileInputValues);
    profilePopup.close();
  },
  formValidators: formValidators
});
// навесить на него слушатели
profilePopup.setEventListeners();

// открыть попап для редактирования профиля
function editProfilePopup () {
  //заполнить поля данными из профиля
  const userInfo = profileInfo.getUserInfo();
  profilePopup.setInputValues(userInfo);
  //открыть попап
   profilePopup.open();
}

profileEdit.addEventListener('click', editProfilePopup);
pictureAddButton.addEventListener('click', addPicturePopup);
