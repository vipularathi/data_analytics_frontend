import axios from "axios";

// Default configuration links
const authConfig = {
  tokenStorageKey: "jwt_access_token",
  signInUrl: "/auth/sign-in",
  signUpUrl: "/auth/sign-up",
  singOutUrl: "/auth/logout",
  tokenRefreshUrl: "api/auth/refresh",
  getUserUrl: "/auth/profile",
  updateUserUrl: "/auth/profile",
  updateTokenFromHeader: false,
};
/*
 * Axios configuration for the API
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Set Session
 */
export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem(authConfig.tokenStorageKey, accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

export const resetSession = () => {
  localStorage.removeItem(authConfig.tokenStorageKey);
  delete axiosInstance.defaults.headers.common.Authorization;
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
      const response = await axiosInstance.get(authConfig.getUserUrl, {
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
  return axiosInstance.get(authConfig.getUserUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
/**
 * Sign In
 */
export const signIn = (credentails) => {
  return axiosInstance.post(authConfig.signInUrl, credentails);
};
/**
 * Sign Up
 */
export const signUp = (data) => {
  return axiosInstance.post(authConfig.signUpUrl, data);
};
/**
 * Sign Out
 */
export const signOut = (accessToken) => {
  return axiosInstance.post(authConfig.singOutUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
/**
 * Update User
 */
export const updateUser = async (userData) => {
  try {
    return await axiosInstance.put(authConfig.updateUserUrl, userData);
  } catch (error) {
    return error;
  }
};
/**
 * Refresh Token
 */
export const refreshToken = async () => {
  try {
    return await axiosInstance.post(authConfig.tokenRefreshUrl);
  } catch (error) {
    return error;
  }
};
