import '../pages/index.css';
import Api  from '../components/Api.js';
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section  from '../components/Section.js';
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
  const card = new Card(data, cardTemplateSelector, handleCardClick, popupConfirm, deletePopopSelector, userId);
  const cardElement = card.generateCard();
  return cardElement
}

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
cardListSection
);

api.getProfileInfo();

api.getInitialCards();

// создать попап для большой картинки
const popupWithImage = new PopupWithImage(largePictureSelector);
// навесить на него слушатели
popupWithImage.setEventListeners();

// открыть большую картинку
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// создать попап для добавления фотографии
const popupAddCard = new PopupWithForm(popupPicture, {
  submitForm: async (evt) => {
    evt.preventDefault();
    popupAddCard.renderLoading(true, 'Создать');
    try {
      const inputs = popupAddCard.getInputValues();
      const cardData = await api.postCard(inputs);
      cardsList.addItem(createCard(cardData));
      popupAddCard.close();
      popupAddCard.renderLoading(false, 'Создать');
    } catch (err) {
      console.log(`Не удалось создать карточку. Ошибка: ${err}`);
    }
  },
  formValidators: formValidators
});

// навесить на него слушатели
popupAddCard.setEventListeners();

// открыть попап для добавления фотографии
function openAddCardPopup () {
  popupAddCard.open();
}

// создать класс управления информацией о пользователе
const profileInfo = new UserInfo ({
  profileNameSelector: profileName,
  profileAboutSelector: profileAbout,
  profileAvatarSelector: profileAvatar
  // thisUserId: thisUserId
});

// создать попап для редактирования профиля
const profilePopup = new PopupWithForm(popupProfile, {
  submitForm: async (evt) => {
    evt.preventDefault();
    profilePopup.renderLoading(true, 'Сохранить');
    try {
      const profileInputValues = profilePopup.getInputValues();
      const profileData = await api.updateProfileInfo(profileInputValues);
      profileInfo.setUserInfo(profileData);
      profilePopup.close();
      profilePopup.renderLoading(false, 'Сохранить');
    } catch (err) {
      console.log(`Не удалось изменить информацию профиля. Ошибка: ${err}`);
    }
  },
  formValidators: formValidators
});
// навесить на него слушатели
profilePopup.setEventListeners();

// открыть попап для редактирования профиля
function openEditProfilePopup () {
  //заполнить поля данными из профиля
  const userInfo = profileInfo.getUserInfo();
  profilePopup.setInputValues(userInfo);
  //открыть попап
   profilePopup.open();
}

const avatarPopup = new PopupWithForm(popupAvatarSelector, {
  submitForm: async (evt) => {
    evt.preventDefault();
    avatarPopup.renderLoading(true, 'Сохранить');
    try {
      const inputs = avatarPopup.getInputValues();
      const avatarData = await api.updateAvatar(inputs.link);
      avatarImg.src = avatarData.avatar;
      avatarPopup.close();
      avatarPopup.renderLoading(false, 'Сохранить');
    } catch (err) {
      console.log(`Не удалось обновить аватар. Ошибка: ${err}`);
    }
  },
  formValidators: formValidators
});

avatarPopup.setEventListeners();

function openUpdateAvatarPopup () {
  avatarPopup.open();
}

//создать попап с предупреждением об удалении фотографии
const popupConfirm = new PopupDelete(deletePopopSelector);
//навесить на него слушатели
popupConfirm.setEventListeners();

profileEdit.addEventListener('click', openEditProfilePopup);
pictureAddButton.addEventListener('click', openAddCardPopup);
avatarEdit.addEventListener('click', openUpdateAvatarPopup);
