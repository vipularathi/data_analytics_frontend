import { action, makeObservable, observable, runInAction } from "mobx";
import {
  authApi
} from "../api/auth";

class UserStore {
  verifyingToken = true;
  showOtp = false;
  requestToken = null;
  user = null;
  userRole = null;
  accessToken = "";
  isAuthenticated = false;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      user: false,
      userRole: false,
      requestToken: false,
      verifyingToken: observable,
      showOtp: observable,
      isAuthenticated: observable,
      isLoading: observable,
      signIn: action,
    })
  }

  async createUser(credentials) {
    runInAction(() => {
      this.isLoading = true
    })
    try {
      const { data: respData } = await authApi.signUp(credentials);

      if (respData.status === "success" && !respData.verified) {
        const {data: otpData } = await authApi.sendOtp({ email: credentials.email, purpose: 'email_verify' })
        
        runInAction(() => {
          this.requestToken = otpData.request_token;
          this.isLoading = false
          this.showOtp = true
        })
      }
      return respData;
    } catch (error) {
      //
      runInAction(() => {
        this.isLoading = false
        this.showOtp = false
      })
    }
  }

  
  async verifyOtp(data) {
    runInAction(() => {
      this.isLoading = true
    })
    try {
      const { data: respData } = await authApi.verifyOtp(data, { headers: { 'request-token': this.requestToken } });
      runInAction(() => {
        this.showOtp = false;
        this.isLoading = false;
      })
      return respData
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

      const errorData = e.response.data

      if (!errorData.verified) {

        runInAction(() => {
          this.isLoading = true
        })

        const { data: otpData } = await authApi.sendOtp({ email: credentials.email, purpose: 'email_verify' });

        runInAction(() => {
          this.requestToken = otpData.request_token;
          this.showOtp = true
          this.isLoading = false
        })
      } else {
        runInAction(() => {
          this.isAuthenticated = false;
          this.user = null;
        });
      }
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


  async verifyToken() {

    const accessToken = authApi.getToken();

    if (!accessToken) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.verifyingToken = false;
      })
      return;
    }

    authApi.setSession(accessToken);
    try {
      await authApi.verifyToken();
      runInAction(() => {
        this.verifyingToken = false;
        this.isAuthenticated = true;
      })
    } catch (e) {
      //
      runInAction(() => {
        this.verifyingToken = false;
        this.isAuthenticated = false;
      })
    }
  }
}

/*
 * Initaite the userStore to provide context in Router context
 */
export const userStore = new UserStore();