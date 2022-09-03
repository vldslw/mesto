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

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
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
    const card = new Card(picturePopup._getInputValues(), cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
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
    const profileInputValues = profilePopup._getInputValues();
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
  profilePopup._popupInputName.value = userInfo.name;
  profilePopup._popupInputAbout.value = userInfo.about;
  //открыть попап
   profilePopup.open();
}

profileEdit.addEventListener('click', editProfilePopup);
pictureAddButton.addEventListener('click', addPicturePopup);
