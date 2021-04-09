import React, { useState } from "react";
import axios from "axios";

import logo from "../assets/nomad.svg";

export const AdminPassword = ({ setToken }) => {
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginReq = await axios.post("http://localhost:8080/adminVerify", {
      password: password,
    });
    if (loginReq && loginReq.status === 200) {
      // change this to a request for generate token
      const token = loginReq.data.token;
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return;
    } else {
      alert("Password is incorrect!");
    }
  };

  return (
    <div className="password-page-screen">
      <form className="password-page-container" onSubmit={handleSubmit}>
        <img src={logo} alt="" />
        <h1>Password</h1>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
