import axios from "axios";

const env = process.env.NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === "production"
      ? "https://api.vhomesgroup.com" // production
      : "http://localhost:8080", // development
});
