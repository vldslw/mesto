const formProfile = document.querySelector('.popup__form_profile');

formProfile.addEventListener('submit', sendForm);
formProfile.addEventListener('input', handlerInputForm);

function sendForm (evt) {
  evt.preventDefault();

  // const form = evt.target;

  // if (form.checkValidity()) {
  //   alert('Форма валидна');
  // } else {
  //   alert('Форма НЕ валидна');
  // };

};

function handlerInputForm (evt) {
  const form = evt.currentTarget;
  validateForm(form);
  validateInput(evt.target);
};

function validateForm (form) {
  const submitButton = form.querySelector('.popup__submit-button');

  if (form.checkValidity()) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.add('popup__submit-button_valid');
    submitButton.classList.remove('popup__submit-button_invalid');
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.remove('popup__submit-button_valid');
    submitButton.classList.add('popup__submit-button_invalid');
  };
};

function validateInput (input) {
  const inputElement = input.parentNode.querySelector(`#${input.id}`);
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  if (errorElement.textContent !== '') {
    inputElement.classList.add('popup__input_error');
  } else {
    inputElement.classList.remove('popup__input_error');
  };
};
