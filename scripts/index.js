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

