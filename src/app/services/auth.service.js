import { baseInstance } from "./axios";

class AuthApi {
  #axiosInstance = null;

  authConfig = {
    signInUrl: "auth/sign-in",
    signUpUrl: "auth/sign-up",
    sendOtpUrl: "auth/otp",
    signOutUrl: "auth/logout",
    verifyOtpUrl: "auth/verify-otp",
    verifyTokenUrl: "auth/verify-token",
  };

  constructor(axiosInstance) {
    this.#axiosInstance = axiosInstance;
  }

  /**
   * @returns {string} 
   */
  getToken() {
    return localStorage.getItem('token');
  }


  /**
   * Set Token
   * @param {string} token
   */
  setToken(token) {
    localStorage.setItem('token', token);
    this.#axiosInstance.defaults.headers.common['auth-token'] = token;
  }

  setSession(token) {
    this.#axiosInstance.defaults.headers.common['auth-token'] = token;
  }

  removeToken() {
    localStorage.removeItem('token');
    delete this.#axiosInstance.defaults.headers.common['auth-token'];
  }

  sendOtp(data) {
    return this.#axiosInstance.post(this.authConfig.sendOtpUrl, data)
  }

  /**
   * 
   * @param {*} data 
   * @param {*} config 
   * @returns {Promise<any>}
   */
  verifyOtp(data, config) {
    return this.#axiosInstance.post(
      this.authConfig.verifyOtpUrl,
      data,
      config
    )
  }

  /**
   * @returns {Promise<any>}
  */
  verifyToken() {
    return this.#axiosInstance.get(this.authConfig.verifyTokenUrl);
  }

  /**
   * @returns {Promise<any>}
  */
  signUp(credentails) {
    return this.#axiosInstance.post(this.authConfig.signUpUrl, credentails);
  }

  /**
   * @returns {Promise<any>}
  */
  signIn(credentails) {
    return this.#axiosInstance.post(this.authConfig.signInUrl, credentails);
  }

  /**
   * @returns {Promise<any>}
  */
  signOut() {
    return this.#axiosInstance.post(this.authConfig.signOutUrl)
  }
}



export const authApi = new AuthApi(baseInstance);