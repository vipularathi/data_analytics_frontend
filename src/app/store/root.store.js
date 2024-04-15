import { AuthStore } from "./auth.store";
import { UserStore } from "./user.store";

class RootStore {
  user;
  auth;
  constructor() {
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
  }
}

export default RootStore;
