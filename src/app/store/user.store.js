import { action, makeObservable, observable, runInAction } from "mobx";
import {
  authApi
} from "../services/auth.service";

export class UserStore {
  _rootStore = null;
  verifyingToken = true;
  showOtp = false;
  requestToken = null;
  user = null;
  userRole = null;
  accessToken = "";
  isAuthenticated = false;
  isLoading = false;
  showCreatePW = false;

  constructor(_rootStore) {
    makeObservable(this, {
      user: false,
      userRole: false,
      accessToken: false,
      requestToken: false,
      showCreatePW: observable,
      verifyingToken: observable,
      showOtp: observable,
      isAuthenticated: observable,
      isLoading: observable,
      createUser: action,
      signIn: action,
      verifyOtp: action,
      signOut: action,
      resetPassword: action,
      setNewPassword: action,
      verifyToken: action,
    })

    this._rootStore = _rootStore;
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
        this.requestToken = null;
      })
      return respData
    } catch (error) {
      //
      runInAction(() => {
        this.showOtp = false;
        this.isLoading = false;
        this.requestToken = null;
      })
    }
  }
  
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
    } catch (err) {

      const errorData = err.response.data

      if (!errorData.verified) {

        runInAction(() => {
          this.isLoading = true
        })

        try {
          const { data: otpData } = await authApi.sendOtp({ email: credentials.email, purpose: 'email_verify' });
  
          runInAction(() => {
            this.requestToken = otpData.request_token;
            this.showOtp = true
            this.isLoading = false
          })
        } catch (error) {
          runInAction(() => {
            this.isLoading = false
          })
        }
      } else {
        runInAction(() => {
          this.isAuthenticated = false;
          this.user = null;
        });
      }
      return err
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
      const { data: respData } = await authApi.verifyToken();

      const userData = respData?.data.user;
  
      const accessToken = respData.token;
      runInAction(() => {
        this.verifyingToken = false;
        this.isAuthenticated = true;
        this.user = userData.data;
        this.userRole = userData.role;
        this.accessToken = accessToken;
      })
    } catch (e) {
      //
      runInAction(() => {
        this.verifyingToken = false;
        this.isAuthenticated = false;
      })
    }
  }


  async resetPassword(data) {
    runInAction(() => {
      this.isLoading = true;
    })
    try {
      const { data: respData } = await authApi.sendOtp(data);
      runInAction(() => {
        this.showCreatePW = true;
        this.isLoading = false;
        this.requestToken = respData.request_token;
      })
    } catch (error) {
      //
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }

  async setNewPassword({ otp, password }) {
    runInAction(() => {
      this.isLoading = true;
    })
    try {
      const { data: respData } = await authApi.verifyOtp({ otp, password }, { headers: { 'request-token': this.requestToken } });
      runInAction(() => {
        this.isLoading = false;
        this.showCreatePW = false;
        this.requestToken = null;
      })
      return respData;
    } catch (error) {
      //
      runInAction(() => {
        this.isLoading = false;
        this.requestToken = null;
      })
    }
  }
}