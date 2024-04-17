import { makeAutoObservable } from "mobx";

export class NavbarStore {
  open = true;
  mobileOpen = false;
  foldedOpen = false;
  folded = true;

  constructor(_rootStore) {
    makeAutoObservable(this);
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
