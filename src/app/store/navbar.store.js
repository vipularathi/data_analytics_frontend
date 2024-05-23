import { action, makeObservable, observable } from "mobx";

export class NavbarStore {
  _rootStore;
  open = true;
  mobileOpen = false;
  foldedOpen = false;
  folded = true;

  constructor(_rootStore) {
    makeObservable(this, {
      _rootStore: false,
      open: observable,
      mobileOpen: observable,
      foldedOpen: observable,
      folded: observable,
      navbarToggleFolded: action,
      navbarOpenFolded: action,
      navbarCloseFolded: action,
      navbarToggleMobile: action,
      navbarOpenMobile: action,
      navbarCloseMobile: action,
      navbarClose: action,
      navbarOpen: action,
      navbarToggle: action,
      navbarFolded: action,
    });
    this._rootStore = _rootStore;
  }

  navbarToggleFolded() {
    this.foldedOpen = !this.foldedOpen;
  }
  navbarOpenFolded() {
    this.foldedOpen = true;
  }
  navbarCloseFolded() {
    this.foldedOpen = false;
  }
  navbarToggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }
  navbarOpenMobile() {
    this.mobileOpen = true;
  }
  navbarCloseMobile() {
    this.mobileOpen = false;
  }
  navbarClose() {
    this.open = false;
  }
  navbarOpen() {
    this.open = true;
  }
  navbarToggle() {
    this.open = !this.open;
  }
  navbarFolded() {
    this.folded = !this.folded;
  }
}
