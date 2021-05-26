import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Navbar from "../components/Navbar";
import houseKeepingService from "../services/houseKeepingService";

const Dashboard = () => {
  const [data, setData] = useState([]);

  // const data = [
  //   {
  //     date: "5/19",
  //     users: 23,
  //   },
  //   {
  //     date: "5/20",
  //     users: 25,
  //   },
  //   {
  //     date: "5/21",
  //     users: 30,
  //   },
  //   {
  //     date: "5/22",
  //     users: 31,
  //   },
  //   {
  //     date: "5/23",
  //     users: 35,
  //   },
  //   {
  //     date: "5/24",
  //     users: 37,
  //   },
  //   {
  //     date: "5/25",
  //     users: 39,
  //   },
  // ];

  useEffect(() => {
    const getData = async () => {
      const dataObject = await houseKeepingService.getUsersData();
      let dataArray = [];
      for (const [key, value] of Object.entries(dataObject.data.payload)) {
        dataArray.push({
          date: key,
          Users: value,
        });
      }

      setData(dataArray);
    };
    getData();
  }, []);

  return (
    <div className="dashboard-screen">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-container-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-content">
          <LineChart width={1000} height={400} data={data}>
            <Line type="monotone" dataKey="Users" stroke="#00b183" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis dataKey="Users" />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
