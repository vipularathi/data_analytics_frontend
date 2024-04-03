import { UserStore } from "./user.store";

class RootStore {
  user;
  constructor() {
    this.user = new UserStore(this);
  }
}

export default RootStore;
