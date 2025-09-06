export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector); // novo
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement ? this._avatarElement.src : "" // novo
    };
  }

  setUserInfo({ name, job, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }

  setAvatar(avatarUrl) {
    if (this._avatarElement) {
      this._avatarElement.src = avatarUrl;
    }
  }
}
