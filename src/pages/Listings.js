import React, { useEffect, useState } from "react";
import { app } from "../utils/axiosConfig";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import _ from "lodash";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      const listingsArray = await (await app.get("/listings")).data.listings;
      for (let i = 0; i < listingsArray.length; i++) {
        if (listingsArray[i].userId !== undefined) {
          const res = await app.get(
            `/user/getUserInfo/${listingsArray[i].userId}`
          );
          listingsArray[i].email = res.data.email;
        }
      }
      setListings(listingsArray);
    };
    getListings();
  }, []);

  return (
    <div className="listings-page-screen">
      <Navbar />
      <div className="listings-container">
        <div className="listings-container-header">
          <h1>Listings</h1>
          <ClickAwayListener onClickAway={() => setFilterOpen(false)}>
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setFilterOpen(!filterOpen)}
                className="listings-dropdown-button"
              >
                <p>{`Filter: ${
                  filterActive === null
                    ? "All"
                    : filterActive === true
                    ? "Active"
                    : "Expired"
                }`}</p>
                {filterOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>
              {filterOpen && (
                <div className="listings-dropdown-container">
                  <div
                    className="listings-dropdown-option"
                    onClick={() => {
                      setFilterOpen(false);
                      setFilterActive(null);
                    }}
                  >
                    <p>All</p>
                  </div>
                  <div
                    className="reservation-dropdown-option"
                    onClick={() => {
                      setFilterOpen(false);
                      setFilterActive(true);
                    }}
                  >
                    <p>Active</p>
                  </div>
                  <div
                    className="reservation-dropdown-option"
                    onClick={() => {
                      setFilterOpen(false);
                      setFilterActive(false);
                    }}
                  >
                    <p>Expired</p>
                  </div>
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
};

export default Listings;
