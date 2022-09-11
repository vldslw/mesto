import '../pages/index.css';
import Api  from '../components/Api.js';
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section  from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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

let userId = '';

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    console.log(initialCards);
    profileInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

//создать попап с предупреждением об удалении фотографии
const confirmationPopup = new PopupWithConfirmation(deletePopopSelector, {
  confirmationHandler: (id, button) => {
    api.deleteCard(id)
    .then(() => {
      button.closest('.element').remove();
      confirmationPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

// //открыть попап для подтверждения удаления картинки
// function confirmationPopupOpener (id, button) {
//   confirmationPopup.open(id, button);
// }



function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick, deletePopopSelector, userId, {
    pictureLikeHandler: (id, element) => {
      api.likePicture(id)
      .then((res) => {
        return res.likes.length;
      })
      .then((data) => {
        element.querySelector('.element__like-count').textContent = data;
      })
      .catch((err) => {
      console.log(err);
      })
    },
    pictureDeleteLikeHandler: (id, element) => {
      api.deleteLike(id)
      .then((res) => {
        return res.likes.length;
      })
      .then((data) => {
        element.querySelector('.element__like-count').textContent = data;
      })
      .catch((err) => {
      console.log(err);
      })
    }

  },
  handleCardDeleteClick);
  const cardElement = card.generateCard();
  return cardElement
}

const handleCardDeleteClick = (id, button) => {
  confirmationPopup.open(id, button);
}


// async (id, element) => {
//   try {
//     const res = await api.likePicture(id);
//     console.log(res);
//     console.log(res.likes.length);
//     element.querySelector('.element__like-count').textContent = res.likes.length;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async (id, element) => {
//   try {
//     const res = await api.deleteLike(id);
//     console.log(res);
//     console.log(res.likes.length);
//     element.querySelector('.element__like-count').textContent = res.likes.length;
//   } catch (err) {
//     console.log(err);
//   }
// }


const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
cardListSection
);

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
  submitForm: async (evt, inputs) => {
    evt.preventDefault();
    popupAddCard.renderLoading(true, 'Создать');
    try {
      // const inputs = popupAddCard._getInputValues();
      const cardData = await api.postCard(inputs);
      cardsList.addItem(createCard(cardData));
      popupAddCard.close();
    } catch (err) {
      console.log(`Не удалось создать карточку. Ошибка: ${err}`);
    } finally {
      popupAddCard.renderLoading(false, 'Создать');
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
  submitForm: async (evt, inputs) => {
    evt.preventDefault();
    profilePopup.renderLoading(true, 'Сохранить');
    try {
      // const profileInputValues = profilePopup._getInputValues();
      const profileData = await api.updateProfileInfo(inputs);
      profileInfo.setUserInfo(profileData);
      profilePopup.close();
    } catch (err) {
      console.log(`Не удалось изменить информацию профиля. Ошибка: ${err}`);
    } finally {
      profilePopup.renderLoading(false, 'Сохранить');
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
  submitForm: async (evt, inputs) => {
    evt.preventDefault();
    avatarPopup.renderLoading(true, 'Сохранить');
    try {
      // const inputs = avatarPopup._getInputValues();
      const avatarData = await api.updateAvatar(inputs.link);
      avatarImg.src = avatarData.avatar;
      avatarPopup.close();
    } catch (err) {
      console.log(`Не удалось обновить аватар. Ошибка: ${err}`);
    } finally {
      avatarPopup.renderLoading(false, 'Сохранить');
    }
  },
  formValidators: formValidators
});

avatarPopup.setEventListeners();

function openUpdateAvatarPopup () {
  avatarPopup.open();
}

//навесить на него слушатели
confirmationPopup.setEventListeners();

profileEdit.addEventListener('click', openEditProfilePopup);
pictureAddButton.addEventListener('click', openAddCardPopup);
avatarEdit.addEventListener('click', openUpdateAvatarPopup);
