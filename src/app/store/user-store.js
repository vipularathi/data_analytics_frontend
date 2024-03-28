import { action, makeObservable, observable, runInAction } from "mobx";
import {
  getAccessToken,
  getUser,
  isTokenValid,
  refreshToken,
  resetSession,
  setSession,
  signIn,
  signOut,
  signUp,
  updateUser,
} from "../api/auth-api";

export class UserStore {
  user = null;
  error = null;
  accessToken = "";
  isAuthenticated = false;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      user: observable,
      isAuthenticated: observable,
      isLoading: observable,
      signIn: action,
      signUp: action,
      signOut: action,
      updateUser: action,
      refreshToken: action,
      attemptAutoLogin: action,
      setTempUser: action,
    });
  }

  /** This is for temporary Sign IN and Sign Out. Work for offline purpose */
  setTempUser(name) {
    this.user = name;
    this.isAuthenticated = true;
  }

  resetTempUser() {
    this.user = null;
    this.isAuthenticated = false;
  }

  /** Sign In */
  async signIn(credentials) {
    try {
      const res = await signIn(credentials);
      // TODO: change the path
      const userData = res?.data?.data?.user?.data;
      const accessToken = res?.data?.token;
      setSession(accessToken);
      runInAction(() => {
        this.user = userData;
        this.accessToken = accessToken;
        this.isAuthenticated = true;
      });
      return res;
    } catch (e) {
      console.log(e?.response?.data?.message);
      resetSession();
      runInAction(() => {
        this.error = e;
        this.isAuthenticated = false;
        this.user = null;
      });
    }
  }

  /** Sign Up */
  async signUp(data) {
    this.user = null;
    this.error = null;
    this.accessToken = "";
    this.isAuthenticated = false;
    try {
      const res = await signUp(data);
      // TODO: change the path
      const userData = res?.data?.user;
      const accessToken = res?.data?.access_token;
      setSession(accessToken);
      runInAction(() => {
        this.user = userData;
        this.accessToken = accessToken;
        this.isAuthenticated = true;
      });
    } catch (e) {
      console.log(e);
      resetSession();
      runInAction(() => {
        this.error = e;
        this.isAuthenticated = false;
        this.user = null;
      });
    }
  }

  /** Sign Out */
  async signOut() {
    const accessToken = getAccessToken();
    if (isTokenValid(accessToken)) {
      try {
        const res = await signOut(accessToken);
        resetSession();
        runInAction(() => {
          this.user = null;
          this.accessToken = null;
          this.isAuthenticated = false;
        });
      } catch (e) {
        resetSession();
        runInAction(() => {
          this.error = e;
          this.isAuthenticated = false;
        });
      }
    } else {
      resetSession();
      this.user = null;
      this.accessToken = null;
      this.isAuthenticated = false;
    }
  }

  /** Update User */
  async updateUser() {
    try {
      const res = await updateUser(data);
      // TODO: change the path
      const userData = res?.data;
      runInAction(() => {
        this.user = userData;
      });
    } catch (e) {
      resetSession();
      runInAction(() => {
        this.error = e;
      });
    }
  }

  /** Refresh Token */
  async refreshToken() {
    try {
      const response = await refreshToken();
      const accessToken = response?.headers?.["New-Access-Token"];
      if (accessToken) {
        setSession(accessToken);
      }
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    }
  }

  /** Auto Login
   *
   */
  async attemptAutoLogin() {
    const accessToken = getAccessToken();
    if (isTokenValid(accessToken)) {
      try {
        runInAction(() => {
          this.isLoading = true;
        });
        const response = await getUser(accessToken);
        const userData = response?.data;
        setSession(accessToken);
        runInAction(() => {
          this.isAuthenticated = true;
          this.user = userData;
        });
        return true;
      } catch (e) {}
    } else {
      resetSession();
      return false;
    }
  }
}
