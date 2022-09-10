import '../pages/index.css';
import Api  from '../components/Api.js';
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section  from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';

import {
  profileName,
  profileAbout,
  profileAvatar,
  profileEdit,
  avatarImg,
  avatarEdit,
  popupProfile,
  pictureAddButton,
  popupPicture,
  popupAvatarSelector,
  largePictureSelector,
  cardTemplateSelector,
  deletePopopSelector,
  cardListSection,
  // thisUserId,
  validationConfig,
  formValidators
} from '../utils/constants.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a',
    'Content-Type': 'application/json'
  }
});

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

let userId = api.getUserId().then(res => userId = res);

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick, deletePopup, deletePopopSelector, userId);
  const cardElement = card.generateCard();
  return cardElement
}

export const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
cardListSection
);



// function getUserId() {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
//     headers: {
//       authorization: '0709850e-2cbd-4a8e-8f4e-5a01f045740a'
//     }
//   })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     const userId = data._id;
//     return userId;
//   })
//   .catch(() => {
//     console.log('Не удалось загрузить id пользователя');
//   })
// }



api.getProfileInfo();



api.getInitialCards();



// создать попап для большой картинки
export const popup = new PopupWithImage(largePictureSelector);
// навесить на него слушатели
popup.setEventListeners();

// открыть большую картинку
function handleCardClick(name, link) {
  popup.open(name, link);
}


// создать попап для добавления фотографии
export const picturePopup = new PopupWithForm(popupPicture, {
  submitForm: async (evt) => {
    evt.preventDefault();

    try {
      const inputs = picturePopup.getInputValues();
      const cardData = await api.postCard(inputs);
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
export const profileInfo = new UserInfo ({
  profileNameSelector: profileName,
  profileAboutSelector: profileAbout,
  profileAvatarSelector: profileAvatar
  // thisUserId: thisUserId
});

// создать попап для редактирования профиля
export const profilePopup = new PopupWithForm(popupProfile, {
  submitForm: async (evt) => {
    evt.preventDefault();

    try {
      const profileInputValues = profilePopup.getInputValues();
      console.log(profileInputValues);
      const profileData = await api.updateProfileInfo(profileInputValues);
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

export const avatarPopup = new PopupWithForm(popupAvatarSelector, {
  submitForm: async (evt) => {
    evt.preventDefault();

    try {
      const inputs = avatarPopup.getInputValues();
      console.log(inputs.link);
      const avatarData = await api.updateAvatar(inputs.link);
      console.log(avatarData);
      avatarImg.src = avatarData.avatar;
      avatarPopup.close();
    } catch {
      console.log('Не удалось обновить аватар');
    }
  },
  formValidators: formValidators
});

avatarPopup.setEventListeners();

function updateAvatarPopup () {
  avatarPopup.open();
}

//создать попап с предупреждением об удалении фотографии
export const deletePopup = new PopupDelete(deletePopopSelector);
//навесить на него слушатели
deletePopup.setEventListeners();

profileEdit.addEventListener('click', editProfilePopup);
pictureAddButton.addEventListener('click', addPicturePopup);
avatarEdit.addEventListener('click', updateAvatarPopup);
