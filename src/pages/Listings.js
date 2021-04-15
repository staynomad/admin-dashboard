import React, { useEffect, useState } from "react";
import { app } from "../utils/axiosConfig";
import moment from "moment";

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

  const [paginatedListings, setPaginatedListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage] = useState(20);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filterActive]);

  useEffect(() => {
    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    console.log(indexOfFirstListing);
    console.log(indexOfLastListing);
    setPaginatedListings(
      _.orderBy(listings, [(listing) => new Date(listing.createdAt)], ["desc"])
        .filter(
          (listing) =>
            listing.active ===
            (filterActive === null
              ? listing.active
              : filterActive === true
              ? true
              : false)
        )
        .slice(indexOfFirstListing, indexOfLastListing)
    );
  }, [listings, filterActive, currentPage, listingsPerPage]);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  console.log(paginatedListings);

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
        <div className="listings-table-container">
          <table>
            <tr className="reservations-table-header">
              <th>Created</th>
              <th>Link</th>
              <th>Price</th>
              <th>Host Email</th>
              <th>Active</th>
            </tr>
            {listings.length > 0 &&
              _.orderBy(
                paginatedListings,
                [(listing) => new Date(listing.createdAt)],
                ["desc"]
              ).map((listing) => (
                <tr key={listing._id}>
                  <td>{moment(listing.createdAt).format("MM[/]DD[/]YYYY")}</td>
                  <td>
                    <a
                      href={`https://www.visitnomad.com/listing/${listing._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      visitnomad.com
                    </a>
                  </td>
                  <td>${listing.price}</td>
                  <td>{listing.email}</td>
                  <td>{listing.active ? "Yes" : "No"}</td>
                </tr>
              ))}
          </table>
        </div>
        <div className="listings-pagination-container">
          <Pagination
            itemsPerPage={listingsPerPage}
            totalItems={
              listings.filter(
                (listing) =>
                  listing.active ===
                  (filterActive === null
                    ? listing.active
                    : filterActive === true
                    ? true
                    : false)
              ).length
            }
            paginate={paginate}
            pageNumber={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Listings;
