import axios from "axios";

const env = process.env.NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === "production"
      ? "https://api.vhomesgroup.com" // production
      : "http://localhost:8080", // development
});

export const getLocalStorageTokens = (tokenType) => {
  switch (tokenType) {
    case "token":
      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      return userToken;
    case "refreshToken":
      const refreshTokenString = localStorage.getItem("refreshToken");
      const refreshToken = JSON.parse(refreshTokenString);
      return refreshToken;
    default:
      return null;
  }
}