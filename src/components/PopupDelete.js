import Popup from './Popup.js';
import {api} from '../pages/index.js';

export default class PopupDelete extends Popup {
  constructor (selector) {
    super(selector);
    this._submitButton = this._popup.querySelector('.popup__submit-button_type_delete');

  }

  open (id, button) {
    this._cardId = id;
    this._deleteButton = button;
    super.open();
    this._deleteHandler = async () => {
      try {
        console.log(this._cardId);
        await api.deleteCard(this._cardId);
        this._deleteButton.closest('.element').remove();
        this.close();
        this._submitButton.removeEventListener('click', this._deleteHandler);
      } catch {
        console.log('Не удалось удалить карточку');
      }
    };
    this._submitButton.addEventListener('click', this._deleteHandler);
  }

  close () {
    super.close();
    this._submitButton.removeEventListener('click', this._deleteHandler);
  }



  // setDeleteListener(id) {
  //   this._cardId = id;
  //   this._submitButton.addEventListener('click', this._deletePicture);
  // }

  // _deletePicture = async () => {
  //   try {
  //     console.log(this._cardId);
  //     await deleteCard(this._cardId);
  //     // this._deleteButton.closest('.element').remove();
  //     this.close();
  //     this._submitButton.removeEventListener('click', this._deletePicture);
  //   } catch {
  //     console.log('Не удалось удалить карточку');
  //   }


  // }

}
