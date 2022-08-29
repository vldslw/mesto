import Card  from './Card.js';
import FormValidator from './FormValidator.js';
import Section  from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// список названий и ссылок для первоначальных карточек
const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileName = '.profile__name';
const profileAbout = '.profile__about';
const profileEdit = document.querySelector('.profile__edit');

const popupProfile = '.popup_type_profile';

const pictureAddButton = document.querySelector('.profile__add');
const popupPicture = '.popup_type_picture';

const largePictureSelector = '.popup_type_largepicture';


const cardTemplateSelector = '#element-template';
const cardListSection = '.elements';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_error'
};

const formValidators = {};

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
