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

function handleCardClick(name, link) {
  const popup = new PopupWithImage(name, link, largePictureSelector);
  popup.setEventListeners();
  popup.open();
}

cardsList.renderItems();


// открыть попап для добавления фотографии
function addPicturePopup () {
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

  picturePopup.setEventListeners();
  picturePopup.open();

}


function editProfilePopup () {

  // создать новый попап

  const profilePopup = new PopupWithForm(popupProfile, {
    submitForm: submitProfileForm,
    formValidators: formValidators
  });
  profilePopup.setEventListeners();

  //заполнить поля данными из профиля

  const profileInfo = new UserInfo ({
    profileNameSelector: profileName,
    profileAboutSelector: profileAbout
  });

  const userInfo = profileInfo.getUserInfo();
  profilePopup._popupInputName.value = userInfo.name;
  profilePopup._popupInputAbout.value = userInfo.about;

  //открыть попап

   profilePopup.open();

  //отправить в профиль то, что было вписано в поля, и закрыть попап

  function submitProfileForm (evt) {
    evt.preventDefault();

    const profileInputValues = profilePopup._getInputValues();

    profileInfo.setUserInfo(profileInputValues);
    profilePopup.close();
  }

}

profileEdit.addEventListener('click', editProfilePopup);
pictureAddButton.addEventListener('click', addPicturePopup);
