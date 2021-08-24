import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/nomad.svg";
import { app } from "../utils/axiosConfig";

const Navbar = () => {

  //Removes tokens from the localstorage and mongoDB
  const deleteTokens = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      await app.post("/adminVerify/logout");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar-container">
      <Link to="/">
        <img src={logo} alt="nomad" />
      </Link>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/containers">Containers</Link>
        <Link to="/listings">Listings</Link>
        <Link to="/reservations">Reservations</Link>
        <a onClick={deleteTokens}>Logout</a>
      </div>
    </div>
  );
};

export default Navbar;
