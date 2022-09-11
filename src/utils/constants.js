// список названий и ссылок для первоначальных карточек
const abrauImage = new URL('../images/abrau-durso.jpeg', import.meta.url);
const kuroniaImage = new URL('../images/kuronia.jpeg', import.meta.url);
const nikolaImage = new URL('../images/nikola-lenivets.jpeg', import.meta.url);
const paanajarviImage = new URL('../images/paanajarvi.jpeg', import.meta.url);
const vyborgImage = new URL('../images/vyborg.jpeg', import.meta.url);
const zelenogradskImage = new URL('../images/zelenogradsk.jpeg', import.meta.url);

export const initialCards = [
  {
    title: 'Абрау',
    link: abrauImage
  },
  {
    title: 'Куршская коса',
    link: kuroniaImage
  },
  {
    title: 'Никола-Ленивец',
    link: nikolaImage
  },
  {
    title: 'Паанаярви',
    link: paanajarviImage
  },
  {
    title: 'Выборг',
    link: vyborgImage
  },
  {
    title: 'Зеленоградск',
    link: zelenogradskImage
  }
];

export const profileName = '.profile__name';
export const profileAbout = '.profile__about';
export const profileAvatar = '.profile__avatar';
export const profileEdit = document.querySelector('.profile__edit');
export const avatarEdit = document.querySelector('.profile__avatar-edit');
export const avatarImg = document.querySelector('.profile__avatar');

export const popupProfile = '.popup_type_profile';

export const pictureAddButton = document.querySelector('.profile__add');
export const popupPicture = '.popup_type_picture';
export const popupAvatarSelector = '.popup_type_avatar';

export const largePictureSelector = '.popup_type_largepicture';

export const cardTemplateSelector = '#element-template';
export const cardListSection = '.elements';

export const deletePopopSelector = '.popup_type_delete';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_error'
};

export const formValidators = {};

