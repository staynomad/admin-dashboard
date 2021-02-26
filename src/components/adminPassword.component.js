import React, { useState } from 'react';

export const AdminPassword = ({ setToken }) => {
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = 'tempToken'; // change this to a request for generate token
    setToken(token);
  };

  return (
    <div>
      <h3>Password page</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={setPassword}
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
