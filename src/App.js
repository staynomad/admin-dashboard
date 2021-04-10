import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminPassword from "./pages/AdminPassword";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";

import "./styles/styles.css";

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};

function App() {
  const { token, setToken } = useToken();

  if (token) {
    // if (!token) {
    return <AdminPassword setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/reservations" exact component={Reservations} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
