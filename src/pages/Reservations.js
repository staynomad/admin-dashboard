import React from "react";
import Navbar from "../components/Navbar";

const Reservations = () => {
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
              <th>Security Desposit</th>
            </tr>
            <tr>
              <td>2/8/2021</td>
              <td>6021db0dc304e32b5d80e49d</td>
              <td>https://visitnomad.com</td>
              <td>$627</td>
              <td>$608.52</td>
              <td>$494</td>
              <td>$114.52</td>
              <td>$250.00</td>
            </tr>
            <tr>
              <td>2/8/2021</td>
              <td>6021db0dc304e32b5d80e49d</td>
              <td>https://visitnomad.com</td>
              <td>$627</td>
              <td>$608.52</td>
              <td>$494</td>
              <td>$114.52</td>
              <td>$250.00</td>
            </tr>
            <tr>
              <td>2/8/2021</td>
              <td>6021db0dc304e32b5d80e49d</td>
              <td>https://visitnomad.com</td>
              <td>$627</td>
              <td>$608.52</td>
              <td>$494</td>
              <td>$114.52</td>
              <td>$250.00</td>
            </tr>
            <tr>
              <td>2/8/2021</td>
              <td>6021db0dc304e32b5d80e49d</td>
              <td>https://visitnomad.com</td>
              <td>$627</td>
              <td>$608.52</td>
              <td>$494</td>
              <td>$114.52</td>
              <td>$250.00</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
