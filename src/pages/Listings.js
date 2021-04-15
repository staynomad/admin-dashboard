import React, { useEffect } from "react";
import { app } from "../utils/axiosConfig";

import Navbar from "../components/Navbar";

const Listings = () => {
  useEffect(() => {
    const getListings = async () => {
      console.log(await app.get("/listings"));
    };
    getListings();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Listings;
