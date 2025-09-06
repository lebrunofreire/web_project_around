class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Método genérico para lidar com respostas
  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Erro: ${response.status}`);
  }

  // 1. Buscar informações do usuário
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  // 2. Atualizar perfil do usuário
  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse);
  }

  // 3. Atualizar avatar
  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link })
    }).then(this._handleResponse);
  }

  // 4. Buscar cartões iniciais
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  // 5. Adicionar novo cartão
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse);
  }

  // 6. Excluir cartão
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleResponse);
  }

  // 7. Curtir cartão
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._handleResponse);
  }

  // 8. Remover curtida
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleResponse);
  }
}
