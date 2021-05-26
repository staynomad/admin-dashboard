import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Navbar from "../components/Navbar";
import houseKeepingService from "../services/houseKeepingService";

const Dashboard = () => {
  const [data, setData] = useState([]);

  // const data = [
  //   {
  //     date: "5/19",
  //     Users: 23,
  //   },
  //   {
  //     date: "5/20",
  //     Users: 25,
  //   },
  //   {
  //     date: "5/21",
  //     Users: 30,
  //   },
  //   {
  //     date: "5/22",
  //     Users: 31,
  //   },
  //   {
  //     date: "5/23",
  //     Users: 35,
  //   },
  //   {
  //     date: "5/24",
  //     Users: 37,
  //   },
  //   {
  //     date: "5/25",
  //     Users: 39,
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
          <ResponsiveContainer height="96%" width="96%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="Users" stroke="#00b183" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis dataKey="Users" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
