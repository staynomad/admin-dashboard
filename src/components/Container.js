import React, { useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import containerService from "../services/containerService";
import { ClickAwayListener } from "@material-ui/core";

const Container = ({ title, containers, setContainers, initialListings }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [listings, setListings] = useState(initialListings);
  const [addListingMode, setAddListingMode] = useState(false);
  const [listingInputValue, setListingInputValue] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const listingInput = useRef(null);

  const handleKeyDown = (e) => {
    e.key === "Enter" &&
      listingInputValue.replace(/\s/g, "").length &&
      handleAddListing();
    if (e.key === "Escape") {
      setAddListingMode(false);
      setListingInputValue("");
    }
  };

  const handleDeleteContainer = async () => {
    await containerService.deleteContainer(title);
    setContainers(containers.filter((container) => container.title !== title));
    setConfirmDelete(false);
  };

  const handleRemoveListing = async (listing) => {
    if (listings.filter((l) => l !== listing).length === 0) {
      setConfirmDelete(true);
    } else {
      await containerService.deleteListing(title, listing);
      setListings(listings.filter((l) => l !== listing));
    }
  };

  const handleAddListingMode = () => {
    setError(false);
    setAddListingMode(!addListingMode);
    setTimeout(() => listingInput.current && listingInput.current.focus(), 50);
  };

  const handleAddListing = async () => {
    setError(false);
    if (listingInputValue.replace(/\s/g, "").length === 0) return;

    if (listings.some((listing) => listing === listingInputValue)) {
      setError(true);
      setErrorMessage("Listing already exists in this container");
      setListingInputValue("");
      setAddListingMode(false);
      return;
    }
    try {
      await containerService.addListing(title, listingInputValue);
      setListings([listingInputValue, ...listings]);
    } catch (e) {
      setError(true);
      setErrorMessage(e.response.data.error);
    }
    setListingInputValue("");
    setAddListingMode(false);
  };

  return (
    <div className="container">
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
      {error && <h2 className="container-error-message">{errorMessage}</h2>}
      <div className="container-listings-container">
        {addListingMode && (
          <ClickAwayListener onClickAway={() => setAddListingMode(false)}>
            <div className="container-add-listing-input-container">
              <input
                type="text"
                className="container-add-listing-input"
                ref={listingInput}
                onChange={(e) => setListingInputValue(e.target.value)}
                value={listingInputValue}
                placeholder="Listing ID"
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <AddCircleIcon
                onClick={handleAddListing}
                className={!listingInputValue.length > 0 ? "inactive" : ""}
              />
            </div>
          </ClickAwayListener>
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
