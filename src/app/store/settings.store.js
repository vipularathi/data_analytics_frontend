import { makeObservable, observable } from "mobx";

export class Settings {
  layout = "layout1";
  style = "style1";
  mode = "container";

  constructor() {
    makeObservable(this, {
      layout: observable,
      style: observable,
      // actions
    });
  }
}
