import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/nomad.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} alt="" />
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/reservations">Reservations</Link>
      </div>
    </div>
  );
};

export default Navbar;
