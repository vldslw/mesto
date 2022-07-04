let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let profileEdit = document.querySelector('.profile__edit');
let popupProfile = document.querySelector('.popup_type_profile');
let popupProfileForm = popupProfile.querySelector('.popup__form');
let popupProfileName = popupProfileForm.querySelector('.popup__input_type_name');
let popupProfileAbout = popupProfileForm.querySelector('.popup__input_type_about');
let popupProfileClose = popupProfile.querySelector('.popup__close-button');

let pictureAdd = document.querySelector('.profile__add');
let popupPicture = document.querySelector('.popup_type_picture');
let popupPictureClose = popupPicture.querySelector('.popup__close-button');


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

function openPicturePopup () {
  popupPicture.classList.add('popup_opened');
}

function closePicturePopup () {
  popupPicture.classList.remove('popup_opened');
}


popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupProfileClose.addEventListener ('click', closeProfilePopup);
pictureAdd.addEventListener('click', openPicturePopup);
popupPictureClose.addEventListener ('click', closePicturePopup);

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

const renderElements = () => {
  initialCards.forEach(renderElement);
};

const renderElement = (object) => {
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__title').textContent = object['name'];
  htmlElement.querySelector('.element__photo').src = object['link'];
  htmlElement.querySelector('.element__photo').alt = object['name'];

  elements.append(htmlElement);

};

renderElements();


