import React, { useState, useEffect } from "react";
import containerService from "../services/containerService";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [containers, setContainers] = useState([1, 2, 3, 4]);

  return (
    <div className="dashboard-screen">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-container-header">
          <h1>Dashboard</h1>
          <AddCircleIcon />
        </div>
        <div className="dashboard-content">
          {containers.map((container) => (
            <div className="container"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
