const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEdit = document.querySelector('.profile__edit');

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfileAbout = popupProfileForm.querySelector('.popup__input_type_about');

const pictureAddButton = document.querySelector('.profile__add');
const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureForm = popupPicture.querySelector('.popup__form');
const popupPictureTitle = popupPictureForm.querySelector('.popup__input_type_title');
const popupPictureLink = popupPictureForm.querySelector('.popup__input_type_link');

const popupLargePicture = document.querySelector('.popup_type_largepicture');

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

// закрыть попап с помощью клавиши Esc
function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
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
function openLargePicturePopup (cardName, cardLink) {
  popupLargePicture.querySelector('.popup__title_largepicture').textContent = cardName;
  popupLargePicture.querySelector('.popup__photo').src = cardLink;
  popupLargePicture.querySelector('.popup__photo').alt = cardName;
  openPopup(popupLargePicture);
}

// добавить листенеры для элементов карточки
function setCardEventListeners (element) {
  const buttonLike = element.querySelector('.element__like');
  buttonLike.addEventListener ('click', likePicture);
  const buttonDelete = element.querySelector('.element__delete-button');
  buttonDelete.addEventListener('click', deletePicture);
  const buttonOpenLarge = element.querySelector('.element__photo');
  buttonOpenLarge.addEventListener('click', () => openLargePicturePopup(buttonOpenLarge.alt, buttonOpenLarge.src));
}

// создать элемент для карточки
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
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
    });

  });
}

setPopupEventListeners();
popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupPictureForm.addEventListener('submit', submitPictureForm);
pictureAddButton.addEventListener('click', openPicturePopup);
