import '../pages/index.css';
import Api  from '../components/Api.js';
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section  from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  profileName,
  profileAbout,
  profileAvatar,
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

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// const cardsList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     cardsList.addItem(createCard(item));
//     }
//   },
//     cardListSection
// );

// cardsList.renderItems();

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
//   headers: {
//     authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a',
//     'Content-Type': 'application/json'
//   }
// });

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
cardListSection
);

function getInitialCards() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
    headers: {
      authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    cardsList.renderItems(data);
  })
  .catch(() => {
    console.log('Не удалось загрузить карточки')
  })
}

getInitialCards();

function getProfileInfo() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
    headers: {
      authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    profileInfo.setUserInfo(data);
  })
  .catch(() => {
    console.log('Не удалось загрузить информацию профиля');
  })
}

getProfileInfo();

async function updateProfileInfo(data) {
  const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  });

  const profileInfo = await res.json();
  return profileInfo;
}

// создать попап для большой картинки
const popup = new PopupWithImage(largePictureSelector);
// навесить на него слушатели
popup.setEventListeners();

// открыть большую картинку
function handleCardClick(name, link) {
  popup.open(name, link);
}

async function postCard(data) {
  const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
      method: "post",
      headers: {
        authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
  });

  const cardData = await res.json();
  return cardData;
}

// создать попап для добавления фотографии
const picturePopup = new PopupWithForm(popupPicture, {
  submitForm: async (evt) => {
    evt.preventDefault();

    try {
      const inputs = picturePopup.getInputValues();
      const cardData = await postCard(inputs);
      cardsList.addItem(createCard(cardData));
      picturePopup.close();
    } catch {
      console.log('Не удалось создать карточку');
    }
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
  profileAboutSelector: profileAbout,
  profileAvatarSelector: profileAvatar
});

// создать попап для редактирования профиля
const profilePopup = new PopupWithForm(popupProfile, {
  submitForm: async (evt) => {
    evt.preventDefault();

    try {
      const profileInputValues = profilePopup.getInputValues();
      console.log(profileInputValues);
      const profileData = await updateProfileInfo(profileInputValues);
      profileInfo.setUserInfo(profileData);
      profilePopup.close();
    } catch {

    }
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
