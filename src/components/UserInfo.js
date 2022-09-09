export default class UserInfo {
  constructor ({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    // this._thisUserId = thisUserId;
  }

  //здесь пока нет аватара (!)
  getUserInfo () {
    const profileInfo = {};
    profileInfo.name = this._profileName.textContent;
    profileInfo.about = this._profileAbout.textContent;
    return profileInfo;
  }

  setUserInfo (inputValues) {
    this._profileName.textContent = inputValues.name;
    this._profileAbout.textContent = inputValues.about;
    this._profileAvatar.src = inputValues.avatar;
  }

  // setUserId (id) {
  //   this._thisUserId = id;
  //   return this._thisUserId;
  // }

}
