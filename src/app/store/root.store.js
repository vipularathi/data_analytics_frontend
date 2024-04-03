import { userStore } from "./user.store";

class Root {
    user = null;
    constructor() {
        this.user = new userStore(this);
    }
}

export default Root;