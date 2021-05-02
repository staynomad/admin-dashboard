import React, { useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import containerService from "../services/containerService";

const Container = ({ title, containers, setContainers, initialListings }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [listings, setListings] = useState(initialListings);
  const [addListingMode, setAddListingMode] = useState(false);

  const listingInput = useRef(null);

  const handleDeleteContainer = async () => {
    await containerService.deleteContainer(title);
    setContainers(containers.filter((container) => container.title !== title));
    setConfirmDelete(false);
  };

  const handleRemoveListing = async (listing) => {
    await containerService.deleteListing(title, listing);
    setListings(listings.filter((l) => l !== listing));
  };

  const handleAddListingMode = () => {
    setAddListingMode(!addListingMode);
    setTimeout(() => listingInput.current && listingInput.current.focus(), 50);
  };

  const handleAddListing = async () => {
    console.log("test");
  };

  return (
    <div key={Math.random()} className="container">
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <div className="confirm-delete-container-modal">
          <h2>Are you sure you want to delete {title}?</h2>
          <div>
            <button
              className="cancel-delete-container-button"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
            <button
              className="confirm-delete-container-button"
              onClick={handleDeleteContainer}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <div className="container-header">
        <h2>{title}</h2>
        <div>
          <AddIcon
            className="add-listing-container-icon"
            onClick={handleAddListingMode}
          />
          <DeleteOutlineIcon
            onClick={() => {
              setConfirmDelete(true);
            }}
            className="delete-container-icon"
          />
        </div>
      </div>
      <div className="container-listings-container">
        {addListingMode && (
          <div className="container-add-listing-input-container">
            <input
              type="text"
              className="container-add-listing-input"
              ref={listingInput}
              placeholder="Listing ID"
            />
            <AddCircleIcon onClick={handleAddListing} />
          </div>
        )}
        {listings.map((listing) => (
          <div className="container-listing" key={listing}>
            <a
              href={`https://www.visitnomad.com/listing/${listing}`}
              target="_blank"
            >
              {listing}
            </a>
            <RemoveIcon onClick={() => handleRemoveListing(listing)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
