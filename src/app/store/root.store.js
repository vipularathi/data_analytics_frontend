import { AuthStore } from "./auth.store";
import { UserStore } from "./user.store";
import { NavbarStore } from "./navbar.store";

class RootStore {
  user;
  auth;
  navbarStore;
  constructor() {
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.navbarStore = new NavbarStore(this);
  }
}

export default RootStore;
