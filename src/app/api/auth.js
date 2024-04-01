
import { baseInstance } from "./axios";

class AuthApi {
  #axiosInstance = null;

  authConfig = {
    tokenStorageKey: "jwt_access_token",
    signInUrl: "auth/sign-in",
    signUpUrl: "auth/sign-up",
    sendOtpUrl: "auth/otp",
    singOutUrl: "auth/logout",
    tokenRefreshUrl: "api/auth/refresh",
    getUserUrl: "auth/profile",
    updateUserUrl: "auth/profile",
  };

  constructor(axiosInstance) {
    this.#axiosInstance = axiosInstance;
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.#axiosInstance.defaults.headers.common['auth-token'] = token;
  }

  removeToken() {
    localStorage.removeItem('token');
    delete this.#axiosInstance.defaults.headers.common['auth-token'];
  }

  sendOtp(data) {
    return this.#axiosInstance.post(this.authConfig.sendOtpUrl, data)
  }

  signUp(credentails) {
    return this.#axiosInstance.post(this.authConfig.signUpUrl, credentails);
  }

  signIn(credentails) {
    return this.#axiosInstance.post(this.authConfig.signInUrl, credentails);
  }

  signOut() {
    return this.#axiosInstance.post(this.authConfig.singOutUrl)
  }
}



export const authApi = new AuthApi(baseInstance);