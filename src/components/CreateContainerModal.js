import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import containerService from "../services/containerService";

const CreateContainerModal = (props) => {
  const [titleInput, setTitleInput] = useState("");
  const [listingInput, setListingInput] = useState("");
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddListing = () => {
    setErrorMessage(false);
    if (listings.some((listing) => listing === listingInput)) {
      setError(true);
      setErrorMessage("You have already added this listing");
      return;
    }
    setListings([...listings, listingInput]);
    setListingInput("");
  };

  const handleRemoveListing = (listing) => {
    setError(false);
    const newListings = listings.filter((l) => l !== listing);
    setListings(newListings);
  };

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleAddListing();
  };

  const handleCreateContainer = async () => {
    setError(false);
    if (titleInput === "" || !titleInput.replace(/\s/g, "").length) {
      setError(true);
      setErrorMessage("Please name your container");
      return;
    }
    if (listings.length === 0) {
      setError(true);
      setErrorMessage("Please add at least 1 listing");
      return;
    }

    try {
      const resp = await containerService.createContainer(titleInput, listings);
      props.setContainers([resp.data.container, ...props.containers]);
      props.closeModal();
    } catch (e) {
      setError(true);
      setErrorMessage("A container with this title already exists");
    }
  };

  return (
    <div className="create-container-screen">
      <div className="create-container-container">
        <div className="create-container-header">
          <h2>Create Container</h2>
          <CloseIcon
            className="create-container-close"
            onClick={props.closeModal}
          />
        </div>
        <div className="create-container-title-container">
          <h3>Title</h3>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Name your container"
          />
        </div>
        <div className="create-container-addlisting-container">
          <h3>Add listings</h3>
          <div>
            <input
              type="text"
              value={listingInput}
              onChange={(e) => setListingInput(e.target.value)}
              placeholder="Listing ID"
              onKeyDown={handleKeyDown}
            />
            <AddCircleIcon
              className={!listingInput.length > 0 ? "inactive" : ""}
              onClick={handleAddListing}
            />
          </div>
        </div>
        <div className="create-container-listings-container">
          {listings.map((listing) => (
            <div className="create-container-listing" key={listing}>
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
        <div className="create-container-btn-container">
          {error && <h2>{errorMessage}</h2>}
          <button onClick={handleCreateContainer}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainerModal;
