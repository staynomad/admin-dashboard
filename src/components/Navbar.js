import React from "react";
import logo from "../assets/nomad.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} alt="" />
      <div className="navbar-links">
        <h1>Reservations</h1>
      </div>
    </div>
  );
};

export default Navbar;
