const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEdit = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfileAbout = popupProfileForm.querySelector('.popup__input_type_about');
const popupProfileClose = popupProfile.querySelector('.popup__close-button');

const pictureAdd = document.querySelector('.profile__add');
const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureForm = popupPicture.querySelector('.popup__form');
const popupPictureTitle = popupPictureForm.querySelector('.popup__input_type_title');
const popupPictureLink = popupPictureForm.querySelector('.popup__input_type_link');
const popupPictureClose = popupPicture.querySelector('.popup__close-button');

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

const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');

function openProfilePopup () {
  popupProfile.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
}

function closeProfilePopup () {
  popupProfile.classList.remove('popup_opened');
}

function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;
  closeProfilePopup ();
}

const renderElements = () => {
  initialCards.forEach(renderElement);
};

const renderElement = (object) => {

  debugger;

  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__title').textContent = object['name'];
  htmlElement.querySelector('.element__photo').src = object['link'];
  htmlElement.querySelector('.element__photo').alt = object['name'];

  elements.append(htmlElement);

  debugger;

};

renderElements();


function openPicturePopup () {
  popupPicture.classList.add('popup_opened');
  debugger;
}

function closePicturePopup () {
  popupPicture.classList.remove('popup_opened');
  debugger;
}

function submitPictureForm (evt) {
  debugger;
  evt.preventDefault();

  const htmlPictureElement = elementTemplate.cloneNode(true);
  htmlPictureElement.querySelector('.element__title').textContent = popupPictureTitle.value;
  htmlPictureElement.querySelector('.element__photo').src = popupPictureLink.value;
  htmlPictureElement.querySelector('.element__photo').alt = popupPictureTitle.value;

  elements.prepend(htmlPictureElement);

  closePicturePopup ();
}

popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupProfileClose.addEventListener ('click', closeProfilePopup);
popupPictureForm.addEventListener('submit', submitPictureForm);
pictureAdd.addEventListener('click', openPicturePopup);
popupPictureClose.addEventListener ('click', closePicturePopup);

