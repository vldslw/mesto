let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup__name');
let popupAbout = popupForm.querySelector('.popup__about');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close-button');

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmitHandler);

function openPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup () {
  popup.classList.remove('popup_opened');
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

closeButton.addEventListener ('click', closePopup);

