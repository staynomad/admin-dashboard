import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/nomad.svg";

const Navbar = () => {
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
      </div>
    </div>
  );
};

export default Navbar;
