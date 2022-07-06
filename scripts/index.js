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

const popupLargepicture = document.querySelector('.popup_type_largepicture');
const popupLargepictureClose = popupLargepicture.querySelector('.popup__close-button');

const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');

// список названий и ссылок для первоначальных карточек
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

// новая карточка
const newCard = {
};

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
function openLargepicturePopup (evt) {
  const buttonClick = evt.target;
  openPopup(popupLargepicture);
  popupLargepicture.querySelector('.popup__title_largepicture').textContent = buttonClick.alt;
  popupLargepicture.querySelector('.popup__photo').src = buttonClick.src;
  popupLargepicture.querySelector('.popup__photo').alt = buttonClick.alt;
}

// добавить листенеры для html элементов
function setEventListeners (htmlElement) {
  const likeButton = htmlElement.querySelector('.element__like');
  likeButton.addEventListener ('click', likePicture);
  const deleteButton = htmlElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', deletePicture);
  const openLargeButton = htmlElement.querySelector('.element__photo');
  openLargeButton.addEventListener('click', openLargepicturePopup);
}

// создать html элемент для карточки
const createCard = (object) => {
  let htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__title').textContent = object.name;
  htmlElement.querySelector('.element__photo').src = object.link;
  htmlElement.querySelector('.element__photo').alt = object.name;
  setEventListeners(htmlElement);
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
  newCard.name = popupPictureTitle.value;
  newCard.link = popupPictureLink.value;
  addCard(newCard);
  closePopup(popupPicture);
}

popupProfileForm.addEventListener('submit', submitProfileForm);
profileEdit.addEventListener('click', openProfilePopup);
popupProfileClose.addEventListener ('click', () => {closePopup(popupProfile)});
popupPictureForm.addEventListener('submit', submitPictureForm);
pictureAdd.addEventListener('click', openPicturePopup);
popupPictureClose.addEventListener ('click', () => {closePopup(popupPicture)});
popupLargepictureClose.addEventListener ('click', () => {closePopup(popupLargepicture)});
