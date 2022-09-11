export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._token = headers['authorization'];
    this._contentType = headers['Content-Type'];
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "delete",
        headers: {
          authorization: this._token
        }
    })
    .then(this._checkResStatus);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResStatus);
  }

  likePicture(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResStatus);

  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResStatus);

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResStatus);
  }

  updateProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResStatus);
  }

  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._checkResStatus);

  }


  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "post",
        headers: {
          authorization: this._token,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: data.title,
          link: data.link
        })
    })
    .then(this._checkResStatus);

  }

  _checkResStatus (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}


