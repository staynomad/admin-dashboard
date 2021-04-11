import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

import Navbar from "../components/Navbar";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

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

  return (
    <div className="reservations-page-screen">
      <Navbar />
      <div className="reservations-container">
        <h1>Reservations</h1>
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
                reservations,
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
      </div>
    </div>
  );
};

export default Reservations;
