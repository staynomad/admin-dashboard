import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";

const CreateContainerModal = (props) => {
  const [titleInput, setTitleInput] = useState("");
  const [listingInput, setListingInput] = useState("");
  const [listings, setListings] = useState([1, 2, 3]);

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
          />
        </div>
        <div className="create-container-addlisting-container">
          <h3>Add listings</h3>
          <div>
            <input
              type="text"
              value={listingInput}
              onChange={(e) => setListingInput(e.target.value)}
            />
            <AddCircleIcon
              className={!listingInput.length > 0 ? "inactive" : ""}
            />
          </div>
        </div>
        <div className="create-container-listings-container">
          {listings.map((listing) => (
            <div className="create-container-listing">
              <a href="/">5fe2e36e4b78f1002acdaeaf</a>
              <RemoveIcon />
            </div>
          ))}
        </div>
        <div className="create-container-btn-container">
          <button>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainerModal;
