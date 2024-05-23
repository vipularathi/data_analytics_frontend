import { action, makeObservable, observable } from "mobx";

export class ThemeStore {
  _rootStore;
  mode = "default";

  constructor(_rootStore) {
    makeObservable(this, {
      _rootStore: false,
      mode: observable,
      // action
      toggleMode: action,
    });
    this._rootStore = _rootStore;
    // initial theme mode
    this.mode = localStorage.getItem("themeMode") ?? "default";
    localStorage.setItem("themeMode", this.mode);
  }

  toggleMode() {
    const newMode = this.mode === "default" ? "defaultDark" : "default";
    localStorage.setItem("themeMode", newMode);
    this.mode = newMode;
  }
}
