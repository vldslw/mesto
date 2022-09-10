import {
  profileInfo,
  cardsList
} from '../pages/index.js';

export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._token = headers['authorization'];
  }

  async deleteCard(id) {
    const res = await fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${id}`, {
        method: "delete",
        headers: {
          authorization: this._token
        }
    });

    const data = await res.json();
    return data;
  }

  async getUserId() {
    const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
      headers: {
        authorization: this._token
      }
    });

    const data = await res.json();
    const userId = data._id;
    console.log(userId);
    return userId;
  }

  getProfileInfo() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileInfo.setUserInfo(data);
      // profileInfo.setUserId(data._id);
    })
    .catch(() => {
      console.log('Не удалось загрузить информацию профиля');
    })
  }

  async likePicture(id) {
    const res = await fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    });
    try {
      const data = await res.json();
      console.log(data);
      return data;

    } catch {
      console.log('Не удалось лайкнуть карточку');
    }

  }

  async deleteLike(id) {
    const res = await fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    });
    try {
      const data = await res.json();
      console.log(data);
      return data;

    } catch {
      console.log('Не удалось удалить лайк');
    }

  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      cardsList.renderItems(data);
    })
    .catch(() => {
      console.log('Не удалось загрузить карточки')
    })
  }

  async updateProfileInfo(data) {
    const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });

    const profileInfo = await res.json();
    return profileInfo;
  }

  async updateAvatar(url) {
    const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    });

    const avatarInfo = await res.json();
    return avatarInfo;
  }


  async postCard(data) {
    const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
        method: "post",
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          name: data.title,
          link: data.link
        })
    });

    const cardData = await res.json();
    return cardData;
  }

}


