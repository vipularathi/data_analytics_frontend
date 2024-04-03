import { UserStore } from "./user.store";

class RootStore {
    user = null;
    constructor() {
        this.user = new UserStore(this);
    }
}

export default RootStore;