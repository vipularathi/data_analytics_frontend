import { AuthStore } from "./auth.store";
import { UserStore } from "./user.store";
import { Settings } from "./settings.store";
import { NavbarStore } from "./navbar.store";

class RootStore {
  user;
  auth;
  settings;
  navbarStore;
  constructor() {
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.settings = new Settings(this);
    this.navbarStore = new NavbarStore(this);
  }
}

export default RootStore;
