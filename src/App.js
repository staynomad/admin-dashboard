import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminPassword from "./pages/AdminPassword";
import Dashboard from "./pages/Dashboard";
import Containers from "./pages/Containers";
import Reservations from "./pages/Reservations";
import Listings from "./pages/Listings";
import { getLocalStorageTokens } from "./utils/axiosConfig";
import { validToken } from "./utils/authAdmin"
import "./styles/styles.css";

const useToken = () => {

  const [token, setToken] = useState(getLocalStorageTokens("token"));

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};
const useRefreshToken = () => {

  const [refreshToken, setRefreshToken] = useState(getLocalStorageTokens("refreshToken"));

  const saveRefreshToken = (userToken) => {
    localStorage.setItem("refreshToken", JSON.stringify(userToken));
    setRefreshToken(userToken);
  };

  return {
    setRefreshToken: saveRefreshToken,
    refreshToken,
  };
};


function App() {
  const { setToken } = useToken();
  const { setRefreshToken } = useRefreshToken();
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenActive, setTokenActive] = useState(false);
  const [loading, setLoading] = useState(true);

  //Used to verify if the access token is still valid.
  useEffect(() => {
    validToken().then(status => {
      setTokenActive(status);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <></>
  }

  if (!tokenActive && !loggedIn) {
    return <AdminPassword setToken={setToken} setRefreshToken={setRefreshToken} setLoggedIn={(status) => setLoggedIn(status)} />;
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
