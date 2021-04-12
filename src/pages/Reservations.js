import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(null);

  const [paginatedReservations, setPaginatedReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(5);

  useEffect(() => {
    const getReservations = async () => {
      const res = await axios.get("http://localhost:8080/reservation");
      const reservationsArray = res.data.reservations;
      for (let i = 0; i < reservationsArray.length; i++) {
        if (reservationsArray[i].user !== undefined) {
          const res = await axios.get(
            `http://localhost:8080/user/getUserInfo/${reservationsArray[i].user}`
          );
          reservationsArray[i].email = res.data.email;
        }
      }
      setReservations(reservationsArray);
    };
    getReservations();
  }, []);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    const indexOfLastRes = currentPage * reservationsPerPage;
    const indexOfFirstRes = indexOfLastRes - reservationsPerPage;
    setPaginatedReservations(
      _.orderBy(
        reservations,
        [(reservation) => new Date(reservation.createdAt)],
        ["desc"]
      )
        .filter(
          (reservation) =>
            reservation.active ===
            (filterActive === null
              ? reservation.active
              : filterActive === true
              ? true
              : false)
        )
        .slice(indexOfFirstRes, indexOfLastRes)
    );
  }, [reservations, filterActive, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterActive]);

  return (
    <div className="reservations-page-screen">
      <Navbar />
      <div className="reservations-container">
        <div className="reservations-container-header">
          <h1>Reservations</h1>
          <ClickAwayListener onClickAway={() => setFilterOpen(false)}>
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setFilterOpen(!filterOpen)}
                className="reservations-dropdown-button"
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
                <div className="reservations-dropdown-container">
                  <div
                    className="reservation-dropdown-option"
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
        <div className="reservations-table-container">
          <table>
            <tr className="reservations-table-header">
              <th>Date</th>
              <th>Reservation ID</th>
              <th>Listing</th>
              <th>Total</th>
              <th>After Stripe</th>
              <th>Host Payout</th>
              <th>Profit</th>
              <th>Reservation Dates</th>
              <th>User</th>
              <th>Active</th>
            </tr>
            {reservations.length > 0 &&
              _.orderBy(
                paginatedReservations,
                [(reservation) => new Date(reservation.createdAt)],
                ["desc"]
              ).map((reservation) => (
                <tr key={reservation._id}>
                  <td>{moment(reservation.createdAt).calendar()}</td>
                  <td>{reservation._id}</td>
                  <td>
                    <a
                      href={`https://www.visitnomad.com/listing/${reservation.listing}`}
                      target="_blank"
                    >
                      visitnomad.com
                    </a>
                  </td>
                  <td>${reservation.totalPrice}</td>
                  <td>
                    ${reservation.totalPrice - reservation.totalPrice * 0.03}
                  </td>
                  <td>
                    $
                    {(
                      reservation.totalPrice -
                      reservation.totalPrice * 0.03 -
                      reservation.hostFee -
                      reservation.guestFee
                    ).toFixed(2)}
                  </td>
                  <td>
                    $
                    {(
                      reservation.totalPrice -
                      reservation.totalPrice * 0.03 -
                      (reservation.totalPrice -
                        reservation.totalPrice * 0.03 -
                        reservation.hostFee -
                        reservation.guestFee)
                    ).toFixed(2)}
                  </td>
                  <td>{`${moment(reservation.days[0]).format(
                    "MM[/]DD[/]YYYY"
                  )} to ${moment(reservation.days[1]).format(
                    "MM[/]DD[/]YYYY"
                  )}`}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.active ? "Yes" : "No"}</td>
                </tr>
              ))}
          </table>
        </div>
        <div className="reservations-pagination-container">
          <Pagination
            itemsPerPage={reservationsPerPage}
            totalItems={
              reservations.filter(
                (reservation) =>
                  reservation.active ===
                  (filterActive === null
                    ? reservation.active
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

export default Reservations;
