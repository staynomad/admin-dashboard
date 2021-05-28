import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminPassword from "./pages/AdminPassword";
import Dashboard from "./pages/Dashboard";
import Containers from "./pages/Containers";
import Reservations from "./pages/Reservations";
import Listings from "./pages/Listings";

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

  if (!token) {
    return <AdminPassword setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/containers" exact component={Containers} />
          <Route path="/reservations" exact component={Reservations} />
          <Route path="/listings" exact component={Listings} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
