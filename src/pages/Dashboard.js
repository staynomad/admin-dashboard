import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import houseKeepingService from "../services/houseKeepingService";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await houseKeepingService.getUsersData();
      setData(res.data.payload);
    };
    getData();
  }, []);

  console.log(data);

  return (
    <div className="dashboard-screen">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-container-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-content"></div>
      </div>
    </div>
  );
};

export default Dashboard;
