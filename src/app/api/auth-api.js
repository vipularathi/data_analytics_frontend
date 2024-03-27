import axios from "axios";

// Default configuration links
const defaultAuthConfig = {
  tokenStorageKey: "jwt_access_token",
  signInUrl: "api/auth/sign-in",
  signUpUrl: "api/auth/sign-up",
  singOutUrl: "api/auth/sign-out",
  tokenRefreshUrl: "api/auth/refresh",
  getUserUrl: "api/auth/user",
  updateUserUrl: "api/auth/user",
  updateTokenFromHeader: false,
};
/**
 * Set Session
 */
export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem(authConfig.tokenStorageKey, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

export const resetSession = () => {
  localStorage.removeItem(authConfig.tokenStorageKey);
  delete axios.defaults.headers.common.Authorization;
};

/**
 * Get access token from local storage
 */
export const getAccessToken = () => {
  return localStorage.getItem(authConfig.tokenStorageKey);
};

/**
 * Check if the access token is valid
 */
export const isTokenValid = (accessToken) => {
  if (accessToken) {
    try {
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
  return false;
};
/**
 * Check if the access token exist and then it is use for authentification request
 */
export const attemptAutoLogin = async () => {
  const accessToken = getAccessToken();

  if (isTokenValid(accessToken)) {
    try {
      const response = await axios.get(authConfig.getUserUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = response?.data;
      setSession(accessToken);
      return true;
    } catch (error) {
      const axiosError = error;
      resetSession();
      return false;
    }
  } else {
    resetSession();
    return false;
  }
};

/**
 * Get current user with access Token
 */
export const getUser = (accessToken) => {
  return axios.get(authConfig.getUserUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
/**
 * Sign In
 */
export const signIn = (credentails) => {
  return axios.post(defaultAuthConfig.signInUrl, credentails);
};
/**
 * Sign Up
 */
export const signUp = (data) => {
  return axios.post(authConfig.signUpUrl, data);
};
/**
 * Sign Out
 */
export const signOut = () => {
  return axios.post(authConfig.singOutUrl);
  resetSession();
};
/**
 * Update User
 */
export const updateUser = async (userData) => {
  try {
    return await axios.put(authConfig.updateUserUrl, userData);
  } catch (error) {
    return error;
  }
};
/**
 * Refresh Token
 */
export const refreshToken = async () => {
  try {
    return await axios.post(authConfig.tokenRefreshUrl);
  } catch (error) {
    return error;
  }
};
