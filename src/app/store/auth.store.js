import { action, makeObservable, observable, runInAction } from "mobx";
import { authApi } from "../services/auth.service";

export class AuthStore {
  userStore;
  verifyingToken = true;
  showOtp = false;
  requestToken = null;
  accessToken = "";
  isAuthenticated = false;
  isLoading = false;
  showCreatePW = false;

  constructor(_rootStore) {
    makeObservable(this, {
      userStore: false,
      accessToken: false,
      requestToken: false,
      showCreatePW: observable,
      verifyingToken: observable,
      showOtp: observable,
      isAuthenticated: observable,
      isLoading: observable,
      // actions
      createUser: action,
      signIn: action,
      verifyOtp: action,
      signOut: action,
      resetPassword: action,
      setNewPassword: action,
      verifyToken: action,
    });

    this.userStore = _rootStore.user;
  }

  async verifyOtp(data) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const { data: respData } = await authApi.verifyOtp(data, {
        headers: { "request-token": this.requestToken },
      });
      runInAction(() => {
        this.showOtp = false;
        this.isLoading = false;
        this.requestToken = null;
      });
      return respData;
    } catch (error) {
      //
      const errorData = error.response.data;
      runInAction(() => {
        this.isLoading = false;
      });

      throw new Error(errorData.message);
    }
  }

  async createUser(credentials) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const { data: respData } = await authApi.signUp(credentials);

      if (respData.status === "success" && !respData.verified) {
        const { data: otpData } = await authApi.sendOtp({
          email: credentials.email,
          purpose: "email_verify",
        });

        runInAction(() => {
          this.requestToken = otpData.request_token;
          this.isLoading = false;
          this.showOtp = true;
        });
      }
      return respData;
    } catch (error) {
      //
      const errorData = error.response.data;
      runInAction(() => {
        this.isLoading = false;
        this.showOtp = false;
      });

      throw new Error(errorData.message);
    }
  }

  async signIn(credentials) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const { data: respData } = await authApi.signIn(credentials);

      const userData = respData?.data.user;

      const accessToken = respData.token;

      authApi.setToken(accessToken);

      runInAction(() => {
        this.isLoading = false;
        this.accessToken = accessToken;
        this.isAuthenticated = true;
        this.userStore.user = userData.data;
        this.userStore.userRole = userData.role;
      });

      return respData;
    } catch (err) {
      const errorData = err.response.data;
      if ("verified" in errorData && !errorData.verified) {
        runInAction(() => {
          this.isLoading = true;
        });

        try {
          const { data: otpData } = await authApi.sendOtp({
            email: credentials.email,
            purpose: "email_verify",
          });

          runInAction(() => {
            this.requestToken = otpData.request_token;
            this.showOtp = true;
            this.isLoading = false;
          });
        } catch (error) {
          const errorDataOtp = error.response.data;
          runInAction(() => {
            this.isLoading = false;
          });
          throw new Error(errorDataOtp.message);
        }
      }
      runInAction(() => {
        this.isLoading = false;
        this.isAuthenticated = false;
        this.user = null;
      });
      throw new Error(errorData.message);
    }
  }

  async signOut() {
    try {
      await authApi.signOut();

      authApi.removeToken();

      this.userStore.resetUser();

      return undefined;
    } catch (err) {
      //
      const errorData = err.response.data;
      throw new Error(errorData.message);
    }
  }

  async verifyToken() {
    const accessToken = authApi.getToken();

    if (!accessToken) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.verifyingToken = false;
      });

      this.userStore.resetUser();
      throw new Error("Invalid token.");
    }

    authApi.setSession(accessToken);

    try {
      const { data: respData } = await authApi.verifyToken();

      const userData = respData?.data.user;
      runInAction(() => {
        this.verifyingToken = false;
        this.isAuthenticated = true;
        this.accessToken = respData.token;
        this.userStore.user = userData.data;
        this.userStore.userRole = userData.role;
      });

      return userData;
    } catch {
      //
      runInAction(() => {
        this.verifyingToken = false;
        this.isAuthenticated = false;
      });
      this.userStore.resetUser();
      throw new Error("Invalid token.");
    }
  }

  async resetPassword(data) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const { data: respData } = await authApi.sendOtp(data);
      runInAction(() => {
        this.showCreatePW = true;
        this.isLoading = false;
        this.requestToken = respData.request_token;
      });

      return respData;
    } catch (error) {
      //
      const errorData = error.response.data;
      runInAction(() => {
        this.isLoading = false;
      });
      throw new Error(errorData.message);
    }
  }

  async setNewPassword(otp, password) {
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const { data: respData } = await authApi.verifyOtp(
        { otp, password },
        { headers: { "request-token": this.requestToken } },
      );
      runInAction(() => {
        this.isLoading = false;
        this.showCreatePW = false;
        this.requestToken = null;
      });
      return respData;
    } catch (error) {
      //
      const errorData = error.response.data;
      runInAction(() => {
        this.isLoading = false;
      });
      throw new Error(errorData.message);
    }
  }
}
