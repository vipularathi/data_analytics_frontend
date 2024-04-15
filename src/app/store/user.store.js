import { action, makeObservable, observable } from "mobx";

export class UserStore {
  _rootStore;
  user = null;
  userRole = null;

  constructor(_rootStore) {
    makeObservable(this, {
      _rootStore: false,
      user: observable,
      userRole: observable,
      // actions
      resetUser: action,
    });

    this._rootStore = _rootStore;
  }

  resetUser() {
    this.user = null;
    this.userRole = null;
  }
}
