import React, { useState } from 'react';
import axios from 'axios';

export const AdminPassword = ({ setToken }) => {
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginReq = await axios.post('http://localhost:8080/adminVerify', {
      password: password,
    });
    if (loginReq && loginReq.status === 200) {
      // change this to a request for generate token
      const token = loginReq.data.token;
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return;
    } else {
      alert('Password is incorrect!');
    }
  };

  return (
    <div>
      <h3>Password page</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
