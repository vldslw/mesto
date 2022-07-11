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

const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');

// открыть любой попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// закрыть любой попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// открыть и заполнить попап данными профиля
function openProfilePopup () {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileAbout.value = profileAbout.textContent;
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

// добавить листенеры для html элементов
function setCardEventListeners (htmlElement) {
  const likeButton = htmlElement.querySelector('.element__like');
  likeButton.addEventListener ('click', likePicture);
  const deleteButton = htmlElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', deletePicture);
  const openLargeButton = htmlElement.querySelector('.element__photo');
  openLargeButton.addEventListener('click', openLargePicturePopup);
}

// создать html элемент для карточки
const createCard = (object) => {
  let htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__title').textContent = object.name;
  htmlElement.querySelector('.element__photo').src = object.link;
  htmlElement.querySelector('.element__photo').alt = object.name;
  setCardEventListeners(htmlElement);
  return htmlElement;

};

// добавить набор первоначальных карточек
const addInitialCards = () => {
  initialCards.forEach(addCard);
};

// добавить карточку
const addCard = (object) => {
  htmlElement = createCard(object);
  elements.prepend(htmlElement);
};

// запустить функцию добавления первоначальных карточек
addInitialCards();


// открыть попап для добавления фотографии
function openPicturePopup () {
  openPopup(popupPicture);
  popupPictureTitle.value = '';
  popupPictureLink.value = '';
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

popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupProfileClose.addEventListener ('click', () => {closePopup(popupProfile)});
popupPictureForm.addEventListener('submit', submitPictureForm);
pictureAddButton.addEventListener('click', openPicturePopup);
popupPictureClose.addEventListener ('click', () => {closePopup(popupPicture)});
popupLargePictureClose.addEventListener ('click', () => {closePopup(popupLargePicture)});
