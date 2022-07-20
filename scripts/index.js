const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEdit = document.querySelector('.profile__edit');

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfileAbout = popupProfileForm.querySelector('.popup__input_type_about');
const popupProfileClose = popupProfile.querySelector('.popup__close-button');

const pictureAddButton = document.querySelector('.profile__add');
const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureForm = popupPicture.querySelector('.popup__form');
const popupPictureTitle = popupPictureForm.querySelector('.popup__input_type_title');
const popupPictureLink = popupPictureForm.querySelector('.popup__input_type_link');
const popupPictureClose = popupPicture.querySelector('.popup__close-button');

const popupLargePicture = document.querySelector('.popup_type_largepicture');
const popupLargePictureClose = popupLargePicture.querySelector('.popup__close-button');

const elementTemplate = document.querySelector('#element-template').content.firstElementChild;
const elements = document.querySelector('.elements');

// открыть любой попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// закрыть любой попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

// открыть и заполнить попап данными профиля
function openProfilePopup () {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
  resetErrors(popupProfileForm);
}

// отправить данные профиля
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAbout.textContent = popupProfileAbout.value;
  closePopup(popupProfile);
}

// поставить фотографии лайк
function likePicture (evt) {
  const buttonClick = evt.target;
  buttonClick.classList.toggle('element__like_active');
}

// удалить фотографию
function deletePicture (evt) {
  evt.target.closest('.element').remove();
};

// открыть большую версию фотографии
function openLargePicturePopup (evt) {
  const buttonClick = evt.target;
  openPopup(popupLargePicture);
  popupLargePicture.querySelector('.popup__title_largepicture').textContent = buttonClick.alt;
  popupLargePicture.querySelector('.popup__photo').src = buttonClick.src;
  popupLargePicture.querySelector('.popup__photo').alt = buttonClick.alt;
}

// добавить листенеры для элементов карточки
function setCardEventListeners (element) {
  const likeButton = element.querySelector('.element__like');
  likeButton.addEventListener ('click', likePicture);
  const deleteButton = element.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', deletePicture);
  const openLargeButton = element.querySelector('.element__photo');
  openLargeButton.addEventListener('click', openLargePicturePopup);
}

// создать html элемент для карточки
const createCard = (object) => {
  const newCardElement = elementTemplate.cloneNode(true);
  newCardElement.querySelector('.element__title').textContent = object.name;
  const newCardElementPhoto = newCardElement.querySelector('.element__photo');
  newCardElementPhoto.src = object.link;
  newCardElementPhoto.alt = object.name;
  setCardEventListeners(newCardElement);
  return newCardElement;
};

// добавить набор первоначальных карточек
const addInitialCards = () => {
  initialCards.forEach(addCard);
};

function renderCard (card) {
  elements.prepend(card);
};

// добавить карточку
const addCard = (object) => {
  const card = createCard(object);
  renderCard(card);
};

// запустить функцию добавления первоначальных карточек
addInitialCards();


// открыть попап для добавления фотографии
function openPicturePopup () {
  openPopup(popupPicture);
  popupPictureForm.reset();
  resetErrors(popupPictureForm);
}

// добавить новую фотографию
function submitPictureForm (evt) {
  evt.preventDefault();
  const newCard = {
  };
  newCard.name = popupPictureTitle.value;
  newCard.link = popupPictureLink.value;
  addCard(newCard);
  closePopup(popupPicture);
}

function setPopupEventListeners () {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup)
    }
    });

  });
}

setPopupEventListeners();
popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupProfileClose.addEventListener ('click', () => {closePopup(popupProfile)});
popupPictureForm.addEventListener('submit', submitPictureForm);
pictureAddButton.addEventListener('click', openPicturePopup);
popupPictureClose.addEventListener ('click', () => {closePopup(popupPicture)});
popupLargePictureClose.addEventListener ('click', () => {closePopup(popupLargePicture)});
