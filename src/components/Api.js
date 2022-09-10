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
    this._contentType = headers['Content-Type'];
  }

  async deleteCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}`, {
        method: "delete",
        headers: {
          authorization: this._token
        }
    });

    const data = await res.json();
    return data;
  }

  async getUserId() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    });

    const data = await res.json();
    const userId = data._id;
    return userId;
  }

  getProfileInfo() {
    fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Не удалось загрузить информацию профиля. Ошибка: ${err}`);
    })
  }

  async likePicture(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    });
    try {
      const data = await res.json();
      return data;

    } catch (err) {
      console.log(`Не удалось лайкнуть карточку. Ошибка: ${err}`);

    }

  }

  async deleteLike(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    });
    try {
      const data = await res.json();
      return data;

    } catch (err) {
      console.log(`Не удалось удалить лайк. Ошибка: ${err}`);
    }

  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      cardsList.renderItems(data);
    })
    .catch((err) => {
      console.log(`Не удалось загрузить карточки. Ошибка: ${err}`)
    })
  }

  async updateProfileInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
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
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: url
      })
    });

    const avatarInfo = await res.json();
    return avatarInfo;
  }


  async postCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
        method: "post",
        headers: {
          authorization: this._token,
          'Content-Type': this._contentType
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


