export default class UserInfo {
  constructor ({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  //здесь пока нет аватара (!)
  getUserInfo () {
    const profileInfo = {};
    profileInfo.name = this._profileName.textContent;
    profileInfo.about = this._profileAbout.textContent;
    return profileInfo;
  }

  setUserInfo (inputValues) {
    if (inputValues.name) {
      this._profileName.textContent = inputValues.name;
    }
    if (inputValues.about) {
      this._profileAbout.textContent = inputValues.about;
    }
    if (inputValues.avatar) {
      this._profileAvatar.src = inputValues.avatar;
    }
  }

}
