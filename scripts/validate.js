//включить валидацию
const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));

  //повесить preventDefault() на все формы и добавить слушатели на все формы
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setFormEventListeners(formElement);
  });

  // поставить слушатель на форму
  function setFormEventListeners (form) {
  form.addEventListener('input', handlerInputForm);
  };

  //запустить валидацию формы и поля ввода
  function handlerInputForm (evt) {
    const form = evt.currentTarget;
    validateForm(form);
    validateInput(evt.target);
  };

};

//валидировать форму
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

//валидировать поле ввода
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

enableValidation({
  formSelector: '.popup__form',
});
