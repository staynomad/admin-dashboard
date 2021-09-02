import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { app, getLocalStorageTokens } from "./utils/axiosConfig"

//Request interceptor that adds the access and refresh token for all requests that are !get
app.interceptors.request.use((req) => {
  if (req.method !== "get" && req.url !== "/adminVerify") {
    req.headers.Authorization = `Bearer ${getLocalStorageTokens("token")}`
    req.headers.RefreshToken = getLocalStorageTokens("refreshToken");
  }
  return req;
}, (err) => {
  return Promise.reject(err);
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
