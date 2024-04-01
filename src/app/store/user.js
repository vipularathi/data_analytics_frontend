import { action, makeObservable, observable, runInAction } from "mobx";
import {
  authApi
} from "../api/auth";

class UserStore {
  user = null;
  userRole = null;
  accessToken = "";
  isAuthenticated = false;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      user: false,
      userRole: false,
      isAuthenticated: observable,
      isLoading: observable,
      signIn: action,
    });
  }

  async createUser(credentials) {
    try {
      const { data: respData } = await authApi.signUp(credentials);

      return respData;
    } catch (error) {
      //
    }
  }

  
  /** Sign In */
  async signIn(credentials) {

    try {
      const { data: respData } = await authApi.signIn(credentials);
      
      const userData = respData?.data.user;

      const accessToken = respData.token;

      authApi.setToken(accessToken)

      runInAction(() => {
        this.user = userData.data;
        this.userRole = userData.role;
        this.accessToken = accessToken;
        this.isAuthenticated = true;
      });

      return respData;
    } catch (e) {


      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
      });

      return e
    }
  }

  async signOut() {
    try {
      await authApi.signOut();
      
      authApi.removeToken()

    } catch (e) {
      //
    }
  }
}

/*
 * Initaite the userStore to provide context in Router context
 */
export const userStore = new UserStore();