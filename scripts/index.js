let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup__input_type_name');
let popupAbout = popupForm.querySelector('.popup__input_type_about');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');

function openPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function submitForm (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup ();
}

popupForm.addEventListener('submit', submitForm);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener ('click', closePopup);

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


