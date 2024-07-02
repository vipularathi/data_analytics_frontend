import { AuthStore } from "./auth.store";
import { NavbarStore } from "./navbar.store";
import { SettingsStore } from "./settings.store";
import { ThemeStore } from "./theme.store";
import { UserStore } from "./user.store";

// Add and Initilise every store here
class RootStore {
  user;
  auth;
  navbarStore;
  settings;
  navbar;
  theme;
  constructor() {
    this.settings = new SettingsStore(this);
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.navbar = new NavbarStore(this);
    this.theme = new ThemeStore(this);
  }
}

export default RootStore;
