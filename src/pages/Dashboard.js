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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import Navbar from "../components/Navbar";
import houseKeepingService from "../services/houseKeepingService";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [listingsData, setListingsData] = useState([]);
  //"Users" or "Active Listings"
  const [shownData, setShownData] = useState("Active Listings");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      const {
        data: usersDataObject,
      } = await houseKeepingService.getUsersData();
      const {
        data: listingsDataObject,
      } = await houseKeepingService.getListingsData();

      let usersDataArray = [];
      for (const [key, value] of Object.entries(usersDataObject.payload)) {
        usersDataArray.push({
          date: key,
          Users: value,
        });
      }

      let listingsDataArray = [];
      for (const [key, value] of Object.entries(listingsDataObject.payload)) {
        listingsDataArray.push({
          date: key,
          "Active Listings": value,
        });
      }

      setUsersData(usersDataArray.slice(0).slice(-7));
      setListingsData(listingsDataArray.slice(0).slice(-7));
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
          <h1>{shownData}</h1>
          <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="listings-dropdown-button"
              >
                <p>{shownData}</p>
                {dropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>
              {dropdownOpen && (
                <div className="listings-dropdown-container">
                  <div
                    className="listings-dropdown-option"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    <p>All</p>
                  </div>
                  <div
                    className="reservation-dropdown-option"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    <p>Active</p>
                  </div>
                  <div
                    className="reservation-dropdown-option"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    <p>Expired</p>
                  </div>
                </div>
              )}
            </div>
          </ClickAwayListener>
          <ResponsiveContainer height="90%" width="96%">
            <LineChart data={shownData === "Users" ? usersData : listingsData}>
              <Line type="monotone" dataKey={shownData} stroke="#00b183" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis dataKey={shownData} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
